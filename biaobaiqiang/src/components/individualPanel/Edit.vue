<template>
    <div class="wrap">
        <Navigationbar class="_head" :style="'top:'+headHeight+'px'"></Navigationbar>

        <div class="wall">
            <div class="left" :style="'width:'+leftLength+';background:'+leftbackgound">

                <template  v-if="leftLength==='70%'">
                    <div style="position: absolute;top:50%;transform: translateY(-50%);text-align: center;line-height: 50px">
                        <p>我知道有一天</p>

                        <p>他会在一个万众嘱目的情况下出现</p>

                        <p>身披金甲圣衣</p>

                        <p>脚踏七彩云来娶我</p>
                        <el-button size="mini" type="success" @click="drawer=true">表白</el-button>

                    </div>
                </template>


            </div>
            <div class="right" @click="changeStyle">
                <div class="text">
                    <span>></span>
                    <h1>i3i4表白墙</h1>
                    <br>
                    <h4>小主，你的心声，我来倾听~</h4>
                    <span>></span>
                </div>
            </div>
        </div>
        <el-drawer :visible.sync="drawer" direction="rtl" :with-header="false">
            <el-container style="background:#717D7E;width:100%;height:100% ">
                <el-header style="padding-left: 8px;border-bottom: white 1px solid">
                    <h2 style="margin-top: 20px;text-align: left">爱就大胆说</h2>
                </el-header >
                <el-main style="padding-left: 8px;">
                    <el-input placeholder="昵称(不填为匿名)"></el-input>
                    <el-input placeholder="意中人" style="margin-top: 10px"></el-input>
                    <div>
                        <Editor id="edit" style="margin-top: 20px;width:100%;height: 400px" :init="editorInit">

                    </Editor>
                    </div>
                </el-main>
            </el-container>

        </el-drawer>
    </div>
</template>

<script>
    import tinymce from 'tinymce/tinymce'
    import 'tinymce/themes/silver/theme'
    import Editor from '@tinymce/tinymce-vue'
    import Navigationbar from "@/components/index/Navigationbar";
    export default {
        name: "Attention",
        components: {Navigationbar,Editor},
        data:function(){
            return{
                headHeight:0,
                leftLength:"20%",
                leftbackgound:"white",
                drawer:true,
                editorInit: {
                    language_url: '/static/tinymce/zh_CN.js',
                    language: 'zh_CN',
                    skin_url: '/static/tinymce/skins/lightgray',
                    height: 300
                }

            }
        },
        mounted:function () {
            window.addEventListener("mousemove",this.mousemove)
            tinymce.init({

            })
            setTimeout(()=>{
                this.headHeight=-90
            },1000)
        },
        methods:{
            mousemove:function f(e) {
                if (this.headerHeight===0&&e.clientY<=60){
                    return
                }
                if(e.clientY<=20){
                    this.headHeight=0
                    return;
                }
                // console.log("执行到此"+e.clientY+","+this.headerHeight)
                if(e.clientY>60&&this.headHeight===0){
                    // console.log("隐藏")
                    setTimeout(()=>{
                        this.headHeight=-90
                    },500)
                }
            },
            changeStyle:function () {
                this.leftLength='70%'
                this.leftbackgound="#E9EAF3"
            }
        }
    }
</script>

<style scoped>
    .text{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: white;
    }
    .text>h1,.text>h4{
        text-align: center;
    }
    .text>span{
        font-size: 30px;
        transition: all 2s;
        animation: toRight .8s infinite;
        opacity: 0.8;
    }

    @keyframes toRight {
        0%{
            margin-left: 0px;
            opacity: 0.8;
        }
        100%{
            margin-left: 50px;
            opacity: 0.3;
        }
    }
    .left{
        z-index: 2;
        position: absolute;
        left: 0px;
        /*width:20%;*/
        height: 100%;
        /*background: white;*/
    }
    .right{

        position: absolute;
        right: 0px;
        width:80%;
        height: 100%;
        background: #C3244C;
    }

    .wall{

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        margin: auto;
        width: 100%;
        max-width: 300px;
        height: 500px;
        box-shadow: 0 1rem 5rem rgba(0, 0, 0, 0.3);
    }
  .wrap{

      position: relative;
      height: 700px;
  }

    ._head{
        width: 100%;
        height: 60px;
        position: fixed;
        transition: .5s all;
    }
</style>
