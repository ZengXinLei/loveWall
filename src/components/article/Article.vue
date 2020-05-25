<template>
    <div >
        <div v-if="canRead" class="wrap_content" >
            <Navigationbar></Navigationbar>
            <div class="n1">
                <el-container>
                    <el-header style="border-bottom: 1px solid rgb(227, 227, 227)">
                        <img @click="goUser" class="head_img" style="border-radius: 50%;width: 50px;height:50px;margin-top: 5px;float: left"  :src="article['user']['uHeadPortrait']">
                        <div style="float: left;margin: 10px">
                            <h2 style="float: left;">🌹</h2>
                            <h4 style="float: left;margin-top: 5px;margin-left: 10px">{{article["aToWho"]}}</h4>
                            <h5 style="float: left;margin: 10px 20px;color: grey">{{time}}</h5>
                        </div>
                    </el-header>
                    <el-main v-html="article['aHtml']" style="border-bottom: 1px solid rgb(227, 227, 227)">
                    </el-main>
                    <el-footer height="30px">
                        <div class="state" style="margin-top: 5px;">
                            <Icon class="up" type="md-thumbs-up" :style="'color:'+upColor" @click="changeColor"></Icon>
                            <span>{{article.aClick}}</span>
                            <Icon class="comments" type="md-chatbubbles" style="margin-left: 20px;"></Icon>
                            <span>{{article.aReview}}</span>
                            <el-button style="float: right;height: 20px;line-height: 8px" size="mini" @click="showReviewInput" >评论</el-button>
                        </div>
                    </el-footer>
                </el-container>



            </div>
            <ReviewInput v-if="canReview" v-on:getReview="getReviewandSend"></ReviewInput>
            <Review v-for="(r,index) in article['reviews']" :key="index" :review="r" :floor="index" @deleteReview="removeReview"></Review>
        </div>

    </div>

</template>

<script>
    import Navigationbar from "@/components/index/Navigationbar";
    import axios from "axios"
    import qs from 'querystring'
    import Global from "@/components/Global";
    import ReviewInput from "@/components/article/ReviewInput";
    import Review from "@/components/article/Review";
    import Time from "@/js/Time";
    export default {
        name: "Article",
        components: {Review, ReviewInput, Navigationbar},
        data:function(){
          return{
              canRead:false,
              article:{},
              upColor:"",
              review:{},
              canReview:false
          }
        },
        mounted:function () {
            let path=window.location.href.split("/").splice(-1)[0]
            axios.post(
                Global.path+"/getArticleById",
                qs.stringify({
                    aId:path
                })
            ).then((res)=>{
                    if(res.data!==""){
                        this.canRead=true

                    }
                    else {
                        this.$router.push("/error")
                        return
                    }
                    this.article=res.data


                    if(this.$cookies.get("user")===null)
                        return null
                    for (let i = 0; i < this.article.clicks.length; i++) {

                        let id=this.article.clicks[i]["cuserId"]
                        id=id*id+5*id+10000
                        if(id===this.$cookies.get("user").uId){
                            this.upColor="#30d268"
                        }
                    }

                })




        },
        computed:{
            time:function () {
                return Time.getTime(this.article.aTime)
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
                        //取消点赞
                        this.upColor=""
                        this.article.aClick--
                    }else {
                        //点赞
                        this.upColor="#30d268"
                        this.article.aClick++
                    }
                })

            },
            //发送评论
            getReviewandSend:function (text) {
                if(text===""||text===null){
                    this.$notify.error({
                        message:"内容不能为空~"
                    })
                    return
                }
                this.review["rText"]=text
                this.review["rTime"]=new Date().getTime()
                this.review["rArticleId"]=this.article["aId"]
                axios.post(
                    Global.path+"/review",
                    this.review,
                    {
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    }
                ).then((res)=>{
                    this.article["reviews"].push(res.data)
                    // console.log(res.data)
                    this.canReview=false
                    this.$notify({
                        message:"评论成功!",
                        type:"success"
                    })
                    this.article.aReview+=1
                })


            },
            showReviewInput:function () {
                if(this.$cookies.get("user")===null){
                    this.$notify.error({
                        message:"请先登录哦~"
                    })
                    return
                }
                this.canReview=!this.canReview
            },
            //删除评论
            removeReview:function (index,rId) {
                axios.post(
                    Global.path+"/deleteReview",
                    qs.stringify({
                        rId:rId
                    })
                ).then(()=>{
                    this.article.reviews.splice(index,1)
                    this.article.aReview-=1
                })


            },
            goUser:function () {

                axios.post(
                    Global.path+"/isUserById",
                    qs.stringify({
                        uId:this.article.user.uId
                    })
                ).then((res)=>{
                    if(res.data===""){
                        this.$notify.error({
                            message:"该用户设置了隐私权限"
                        })
                    }else {
                        this.$router.push("/profile/"+this.article.user.uId)
                    }
                })

            }
        }
    }
</script>

<style scoped>

    .head_img{
        cursor: pointer;
        transition: .5s all;
    }
    .head_img:hover{
        transform: scale(1.1);
    }
    .wrap_content {
        position: absolute;
        width: 100%;
        min-height: 100%;

        background:#eeeeee;
    }

    .n1{
        max-width: 700px;
        /*height: 300px;*/
        margin: auto;
        margin-top: 20px;
        background:white;
    }

    .up:hover{
        cursor: pointer;
        color: #30d268;
        transition: all .3s;
        transform: scale(1.1);
    }
</style>
