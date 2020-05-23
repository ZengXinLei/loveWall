<template>

    <div :class="article.aName==='匿名'?'nocard':'card'" @click="readArticle">
        <div class="content" :style="'background:'+color ">{{article.aText.length>=50?article.aText.split("").splice(0,50).join("")+"....":article.aText}}</div>
        <div class="information">
            <img class="head_portrait" :src="article.user.uHeadPortrait">
            <p class="name">{{article.aName}}<span style="color: #EC407A">🌹</span><span>{{article.aToWho}}</span></p>
            <p class="time">{{time}}</p>
            <div class="state">
                <Icon class="up" type="md-thumbs-up" :style="'color:'+upColor" @click="changeColor"></Icon>
                <span>{{article.aClick}}</span>
                <Icon class="comments" type="md-chatbubbles" ></Icon>
                <span>{{article.aReview}}</span>
            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'querystring'
    import Global from "@/components/Global";
    export default {
        name: "MyCard",
        props:{
            article:null,

        },
        data:function(){
          return{
              upColor:""
          }
        },
        mounted:function () {

            if(this.$cookies.get("user")===null)
                return null
            for (let i = 0; i < this.article.clicks.length; i++) {

                let id=this.article.clicks[i]["cuserId"]
                id=id*id+5*id+10000
                if(id===this.$cookies.get("user").uId){
                    this.upColor="#30d268"
                }
            }
        },
        methods:{
            changeColor:function () {
                if(this.$cookies.get("user")===null){
                    this.$notify.error("请先登录哦~")
                    return
                }

                axios.post(
                    Global.path+"/like",
                    qs.stringify({
                        aId:this.article.aId
                    })
                ).then(()=>{
                    if(this.upColor==="#30d268"){
                        console.log("取消点赞")
                        //取消点赞
                        this.upColor=""
                        this.article.aClick--
                    }else {
                        //点赞
                        console.log("点赞")
                        this.upColor="#30d268"
                        this.article.aClick++
                    }
                })

            },
            readArticle:function () {
                this.$router.push("/article/"+this.article.aId)
            }
        },
        computed:{
            color:function () {

                return this.article.aName==='匿名'?'#5a5f69':'#5DADE2'
            },
            time:function () {
                let t=new Date().getTime()
                t=t-this.article.aTime
                let day_num=Math.floor(t/(24 * 3600 * 1000))
                if(day_num>=1){
                    if(day_num>30){
                        return new Date(this.article.aTime+ 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ')
                    }
                    return day_num+"天前"

                }
                let hour=Math.floor(t/(3600*1000))
                if(hour>=1){
                    return hour+"小时前"
                }
                let minute=Math.floor(t/(60*1000))

                if(minute>=1){
                    return minute+"分钟前"
                }
                return "刚刚"
            }

        }
    }
</script>

<style scoped>

    .up:hover{
        color: #30d268;
        transition: all .3s;
        transform: scale(1.3);
    }
    /*.el-row .el-col{*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    transform: scale(0.8);*/
    /*}*/
    .state{
        position: absolute;
        display: inline;
        right: 6px;
        bottom: 6px;

    }
    .name {
        position: absolute;
        display: inline;
        padding-left: 4px;
        padding-top: 4px;

    }
    .time{
        position: absolute;
        display: inline;
        color: #515a6e;
        padding-left: 4px;
        padding-top: 35px;
    }
    .head_portrait{
        width: 46px;
        height: 46px;
        border-radius: 50%;

        margin: 7px;
    }
    .information{
        width: 100%;
        height: 60px;
        border-top: 1px dashed white;
        position: relative;
    }
    .content {
        width: 100%;
        height: 100px;
        /*background: #5DADE2;*/
        letter-spacing: 2px;
        padding: 8px;
        /*font-family: "太平洋彼岸";*/
        color: white;
        /*font-weight: bold;*/
    }


    .card ,.nocard{
        width: 100%;
        transition: all 0.3s;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 8px rgba(0, 0, 0, .1)
    }
    .card:hover .state{
        bottom: 6px;
        right: 35px;

    }
    .nocard:hover .state{
        color: white;
        bottom: 6px;
        right: 35px;

    }
    .card:hover{
        box-shadow: 0 2px 25px #5DADE2;
        cursor: pointer;
    }
    .nocard:hover{
        box-shadow: 0 2px 25px #5a5f69;
        cursor: pointer;
    }
    .card:hover .information{
        background: #5DADE2;
        width: 110%;
        /*box-shadow: 0 2px 25px #3498DB;*/
        cursor: pointer;
    }
    .nocard:hover .information{
        background: #5a5f69;
        width: 110%;
        /*box-shadow: 0 2px 25px #3498DB;*/
        cursor: pointer;
    }
    .card:hover .time{
        color: white;
    }
    .card:hover .name{
        color: white;
    }
    .nocard:hover .name{
        color: white;
    }
    .nocard:hover .time{
        color: white;
    }
</style>
