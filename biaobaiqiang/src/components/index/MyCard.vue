<template>

    <div class="card">
        <div class="content">{{article.message}}</div>
        <div class="information">
            <img class="head_portrait" :src="article.headPortrait">
            <p class="name">{{article.author}}</p>
            <p class="time">{{article.releaseTime}}</p>
            <div class="state">
                <Icon class="up" type="md-thumbs-up" ></Icon>
                <span>{{article.thumbUpFor}}</span>
                <Icon class="comments" type="md-chatbubbles" ></Icon>
                <span>{{article.comments}}</span>
            </div>
<!--            <el-row  type="flex" align="middle">-->
<!--                <el-col :span="2" ><img class="head_portrait" src="https://qlogo2.store.qq.com/qzone/1599484837/1599484837/100?1571222671"></el-col>-->
<!--                <el-col :span="22">-->
<!--                    <el-row></el-row>-->
<!--                    <el-row></el-row>-->
<!--                </el-col>-->
<!--            </el-row>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyCard",
        props:{
            article:null
        },
        mounted:function () {
            // console.log(this.article)
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
        background: #5DADE2;
        letter-spacing: 2px;
        padding: 8px;
        font-family: "太平洋彼岸";
        color: white;
        /*font-weight: bold;*/
    }

    @font-face {
        font-family: "爱情故事";
        src:url("../font/lovestory.ttf");

    }
    @font-face {
        font-family: "美丽的邂逅";
        src: url("../font/beauty.ttf");
    }
    @font-face {
        font-family: "太平洋彼岸";
        src: url("../font/tai.ttf");
    }
    .card {
        width: 100%;
        transition: all 0.3s;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 8px rgba(0, 0, 0, .1)
        /*background: #1ABC9C;*/
    }
    .card:hover .state{
        bottom: 6px;
        right: 35px;

    }
    .card:hover{
        box-shadow: 0 2px 25px #5DADE2;
        cursor: pointer;
    }
    .card:hover .information{
        background: #5DADE2;
        width: 110%;
        /*box-shadow: 0 2px 25px #3498DB;*/
        cursor: pointer;
    }
</style>
