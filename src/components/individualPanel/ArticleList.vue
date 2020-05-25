<template>
    <div>
        <div style="height: 60px;border-bottom: 1px white dashed;padding: 20px 10px">
            <h3 style="">表白之路</h3>
        </div>


        <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-immediate="false">
            <li  class="item" v-for="(article,index) in articles" :key="index" @click="goArticle(article)">
                <div style="position: relative">
                    <div >
                        <h3 style="float: left">{{article["aName"]}}</h3>
                        <h5 style="float: left">🌹</h5>
                        <h3 style="float: left">{{article["aToWho"]}}</h3>
                        <i v-if="canremove" @click.stop="remove(article)" class="el-icon-delete" style="float: right"></i>
                    </div>
                    <br>
                    <div style="position: absolute;left: 0;top: 30px">
                        <span>{{article.aTime}}</span>
                    </div>
                </div>
            </li>
            <p v-if="!loading">没有更多了</p>
        </ul>

    </div>
</template>

<script>
    import axios from "axios";
    import Global from "@/components/Global";
    import qs from 'querystring'
    import Time from "@/js/Time";

    export default {
        name: "ArticleList",
        props: ['u'],
        data: function () {
            return {
                articles: [],
                start:0,
                offset:10,
                loading:true,
                disable:false,
                canremove:true
            }
        },
        mounted: function () {
            let user=this.$cookies.get("user")
            if(user===null){
                this.canremove=false
            }
            else {
                if(user.uId!==this.u.uId){
                    this.canremove=false
                }
            }
            axios.post(
                Global.path + "/getArticlesByUserId",
                qs.stringify({
                    uId: this.u.uId,
                    start: this.start,
                    offset: this.offset
                })
            ).then((res) => {
                this.articles = res.data
                for (let i = 0; i < res.data.length; i++) {
                    this.articles[i].aTime = Time.getTime(res.data[i].aTime)
                }
                this.start+=this.offset
            })
        },
        methods: {
            remove: function (e) {
                e.aTime=0
                axios.post(
                    Global.path + "/deleteArticle",
                    e,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                ).then(()=>{
                    for (let i = 0; i < this.articles.length; i++) {
                        if(this.articles[i].aId===e.aId){
                            this.articles.splice(i,1)
                        }
                    }

                })
            },
            goArticle:function (e) {
                this.$router.push("/article/"+e.aId)

            },
            load:function () {
                if(this.disable)
                    return
                axios.post(
                    Global.path + "/getArticlesByUserId",
                    qs.stringify({
                        uId: this.u.uId,
                        start: this.start,
                        offset: this.offset
                    })
                ).then((res) => {

                    if(res.data.length===0)
                    {
                        this.loading=false
                        this.disable=true
                        return
                    }

                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].aTime = Time.getTime(res.data[i].aTime)
                        this.articles.push(res.data[i])
                    }
                    this.start+=this.offset
                })

            }
        },
        computed: {
            time: function () {
                return Time.getTime()
            }
        }
    }
</script>

<style scoped>
    ul > li {
        list-style: none;
        height: 83px;
        padding: 10px;
    }

    .item{
        cursor: pointer;
        transition: .5s all;
        border-bottom: 1px solid grey;
    }
    .item:hover{
        transform: scale(1.01);
        background: #F2F3F4;
    }

    .el-icon-delete {
        transition: .5s all;
    }
</style>
