<template>
    <div class="wrap">
        <Navigationbar class="_head" :style="'top:'+headHeight+'px'"></Navigationbar>
        <div class="wall"></div>
    </div>
</template>

<script>
    import Navigationbar from "@/components/index/Navigationbar";
    export default {
        name: "Attention",
        components: {Navigationbar},
        data:function(){
            return{
                headHeight:0
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
            }
        }
    }
</script>

<style scoped>

    .wall{
        /*font-size: 62.5%;*/
        /*box-sizing: border-box;*/
        /*padding: 0;*/
        /*margin: 0;*/
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 20rem;
        height: 30rem;
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
