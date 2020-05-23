<template>
    <div class="wrap">
        <Navigationbar class="_head" :style="'top:'+headHeight+'px'"></Navigationbar>
        <audio autoplay loop>
            <source src="../song/p1.mp3" >
        </audio>
        <div class="wall">
            <div class="left" :style="'width:'+leftLength+';background:'+leftbackgound">

                <template v-if="leftLength==='70%'">
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


        <div v-if="drawer"
             style="position: absolute;right: 0px;top: 0px;width: 20rem;height: 100%;box-shadow: 0 3px 5px #D7DBDD">


            <el-container style="background:#717D7E;width:100%;height:100% ">
                <el-header style="padding-left: 8px;border-bottom: white 1px solid">
                    <h2 style="margin-top: 20px;text-align: left;color:white;float: left">爱就大胆说</h2>
                    <!--                    <el-icon id="icon1" class="el-icon-close" style="color: #C3244C;transform: scale(2);float: right;margin-top: 30px;color: white"></el-icon>-->
                </el-header>
                <el-main style="padding-left: 8px;">
                    <el-input placeholder="昵称(不填为匿名)" v-model="article['aName']"></el-input>
                    <el-input placeholder="意中人" style="margin-top: 10px" v-model="article['aToWho']"></el-input>
                    <Edit style="margin-top: 20px" @input="getValue"></Edit>
                    <el-button type="success" size="mini" style="margin-top: 20px" @click="submit">确认</el-button>
                    <el-button type="warning" size="mini" style="margin-top: 20px" @click="drawer=false">关闭</el-button>
                </el-main>
            </el-container>
        </div>

<!--        <div style="position: absolute;width: 20rem;height: 30rem;bottom: 0px">-->
<!--            <el-row id="text" v-for="(tip,index) in tips" :key="index">-->
<!--                <el-col :span="24">-->
<!--                    <div class="tip">-->
<!--                        <span>{{tip.name}}</span><span>❤</span><span>{{tip.who}}</span><span>{{tip.content}}</span><span>❤❤  </span>-->
<!--                    </div>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--        </div>-->

    </div>
</template>

<script>

    import Navigationbar from "@/components/index/Navigationbar";
    import Edit from "@/components/edit/Edit";

    import axios from 'axios'
    import Global from "@/components/Global";
    // eslint-disable-next-line no-unused-vars
    import qs from "querystring"
    export default {
        name: "Index",
        components: {Edit, Navigationbar},
        data: function () {
            return {
                headHeight: 0,
                leftLength: "20%",
                leftbackgound: "white",
                drawer: false,
                tips: [],
                article:{

                }



            }
        },
        mounted: function () {
            window.addEventListener("mousemove", this.mousemove)
            setTimeout(() => {
                this.headHeight = -90
            }, 1000)


            //初始化消息内容
            let arr = []
            for (let i = 0; i < 10; i++) {
                arr.push({
                    name: "曾鑫磊",
                    who: "没人"+i,
                    content: "心中无爱"
                })
            }
            this.tips = arr

            // setInterval(()=>{
            //     this.tips.splice(0,1)
            // },1000)
        },
        methods: {
            mousemove: function f(e) {
                if (this.headerHeight === 0 && e.clientY <= 60) {
                    return
                }
                if (e.clientY <= 20) {
                    this.headHeight = 0
                    return;
                }
                // console.log("执行到此"+e.clientY+","+this.headerHeight)
                if (e.clientY > 60 && this.headHeight === 0) {
                    // console.log("隐藏")
                    setTimeout(() => {
                        this.headHeight = -90
                    }, 500)
                }
            },
            changeStyle: function () {
                this.leftLength = '70%'
                this.leftbackgound = "#E9EAF3"
            },
            getValue:function (h,t) {

                this.article["aHtml"]=h
                this.article["aText"]=t
            },
            submit:function () {
                let article=this.article
                let namePattern=/^[\u4e00-\u9fa5]{2,5}$/
                if(article["aName"]!==undefined&&article["aName"]!==""){
                    if(!namePattern.test(article["aName"])){
                        this.$notify.error({
                            title:"错误",
                            message:"昵称只能为2到5个汉字",
                            position:"top-left"
                        })
                        return
                    }
                }
                if(article["aToWho"]===undefined){

                        this.$notify.error({
                            title:"错误",
                            message:"意中人不能为空",
                            position:"top-left"
                        })
                        return
                }else {
                    if(!namePattern.test(article["aToWho"])){
                        this.$notify.error({
                            title:"错误",
                            message:"只能为2到5个汉字",
                            position:"top-left"
                        })
                        return
                    }
                }

                if(article["aText"]===undefined){
                    this.$notify.error({
                        title:"错误",
                        message:"内容不能为空",
                        position:"top-left"
                    })
                    return;
                }else if(article["aText"].length>4800){
                    this.$notify.error({
                        title:"错误",
                        message:"内容超过4800",
                        position:"top-left"
                    })
                    return;
                }
                console.log(article)
                axios.post(
                    Global.path+"/insertArticle",
                    article,
                    {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                    }
                ).then(()=>{
                    this.$notify({
                        message:"已表白",
                        type :"success"
                    })
                    this.$router.push("/")
                })
            }
        }
    }
</script>

<style scoped>

    #text {
        padding: 0;
        height: 30px;
        margin-top: 15px;
        margin-left: 10px;
        transition: 1s all;
    }

    .tip {
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
        background: #AF7AC5;
        border-radius: 5rem;
        color: white;

        display: inline;
        position: absolute;
    }

    .tip > span {
        margin-left: 6px;
    }

    .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
    }

    .text > h1, .text > h4 {
        text-align: center;
    }

    .text > span {
        font-size: 30px;
        transition: all 2s;
        animation: toRight .8s infinite;
        opacity: 0.8;
    }

    @keyframes toRight {
        0% {
            margin-left: 0px;
            opacity: 0.8;
        }
        100% {
            margin-left: 50px;
            opacity: 0.3;
        }
    }

    .left {
        z-index: 2;
        position: absolute;
        left: 0px;
        /*width:20%;*/
        height: 100%;
        /*background: white;*/
    }

    .right {

        position: absolute;
        right: 0px;
        width: 80%;
        height: 100%;
        background: #C3244C;
    }

    .wall {

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: auto;
        width: 100%;
        max-width: 300px;
        height: 500px;
        box-shadow: 0 1rem 5rem rgba(0, 0, 0, 0.3);
    }

    .wrap {

        position: relative;
        height: 700px;
    }

    ._head {
        width: 100%;
        height: 60px;
        position: fixed;
        transition: .5s all;
    }
</style>
