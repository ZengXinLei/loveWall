<template>

    <el-row  type="flex" justify="center" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0)">
        <el-col :span="22">
            <el-row :gutter="50" >
                    <el-col :key="index" :span="8" v-for="(article,index) in articles"><MyCard :article="article"></MyCard></el-col>
           </el-row>
        </el-col>
    </el-row>
</template>

<script>
    import MyCard from "@/components/index/MyCard";
    import axios from "axios";
    import Global from "@/components/Global";
    import qs from 'querystring'
    export default {
        name: "IndexBody",
        data:function(){
            return ({
                articles:[],
                loading:true,
                start:0,
                offset:30
            })
        },
        components: {MyCard},
        mounted:function () {

            axios.post(
                Global.path+"/getArticles",
                    qs.stringify({
                        start:this.start,
                        offset:this.offset
                    })
            ).then((res)=> {
                console.log("开始")
                for (let i = 0; i < res.data.length; i++) {
                    console.log(i)
                    this.articles.push(res.data[i])
                }
                this.start+=res.data.length
                this.offset=10
                // this.articles=res.data
                this.loading=false

            })
        },
        methods:{
            load:function () {

                axios.post(
                    Global.path+"/getArticles",
                    qs.stringify({
                        start:this.start,
                        offset:this.offset
                    })
                ).then((res)=> {
                    for (let i = 0; i < res.data.length; i++) {
                        console.log(i)
                        this.articles.push(res.data[i])
                    }
                    this.start+=res.data.length
                })
            }
        }

    }
</script>

<style scoped>
.el-col{
    /*width: 100%;*/
    min-width: 300px;
    margin-top: 20px;
}
@media screen and (max-width: 656px){
    .el-col{
        width: 100%;
        /*min-width: 300px;*/
        margin-top: 20px;
    }
}
</style>
