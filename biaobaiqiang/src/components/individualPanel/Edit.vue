<template>
    <div class="wrap">
        <Navigationbar class="_head" :style="'top:'+headHeight+'px'"></Navigationbar>

        <div class="wall">
            <div class="left" :style="'width:'+leftLength+'background:'+leftbackgound"></div>
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
    </div>
</template>

<script>
    import Navigationbar from "@/components/index/Navigationbar";
    export default {
        name: "Attention",
        components: {Navigationbar},
        data:function(){
            return{
                headHeight:0,
                leftLength:"20%",
                leftbackgound:"white"
            }
        },
        mounted:function () {
            window.addEventListener("mousemove",this.mousemove)
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
        transition: all .8s;
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
