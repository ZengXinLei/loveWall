<template>

        <el-row  type="flex" justify="center" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0)">
            <el-col :span="22">
                <el-row style="overflow: auto" :gutter="50" >
                        <el-col :key="index" :span="8" v-for="(article,index) in articles"><MyCard :article="article"></MyCard></el-col>
               </el-row>
            </el-col>
        </el-row>

</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import MyCard from "@/components/index/MyCard";
    import axios from "axios";
    import Global from "@/components/Global";
    import qs from 'querystring'

    export default {
        name: "IndexBody",
        data: function () {
            return ({
                articles: [],
                loading: true,
                start: 0,
                offset: 30,
                disable:true
            })
        },
        components: {MyCard},
        mounted: function () {

            axios.post(
                Global.path + "/getArticles",
                qs.stringify({
                    start: this.start,
                    offset: this.offset
                })
            ).then((res) => {
                // console.log("开始")
                for (let i = 0; i < res.data.length; i++) {
                    // console.log(i)
                    this.articles.push(res.data[i])
                }
                this.start += res.data.length
                this.offset = 10
                // this.articles=res.data
                this.loading = false

            })




            window.onscroll=()=> {
                if(!this.disable)
                    return
                let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                //滚动条滚动距离
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                //窗口可视范围高度
                let clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight,document.body.clientHeight);

                if(clientHeight + scrollTop >= scrollHeight){
                    this.load()
                }
            }
        },
        methods: {
            load: function () {
                axios.post(
                    Global.path + "/getArticles",
                    qs.stringify({
                        start: this.start,
                        offset: this.offset
                    })
                ).then((res) => {
                    if(res.data.length===0){
                        this.disable=false
                        return
                    }
                    for (let i = 0; i < res.data.length; i++) {

                        this.articles.push(res.data[i])
                    }
                    this.start += res.data.length
                })
            }
        }

    }
</script>

<style scoped>
    li {
        list-style: none;
    }

    /*.card {*/
    /*    max-width: 260px;*/
    /*    float: left;*/
    /*    margin-left:11rem;*/
    /*    margin-top: 3rem;*/
    /*}*/

    .el-col {
        /*width: 100%;*/
        min-width: 300px;
        margin-top: 20px;
    }

    @media screen and (max-width: 900px) {
        .el-col {
            width: 100% !important;
            /*min-width: 300px;*/
            margin-top: 20px;
        }
    }
</style>
