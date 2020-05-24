<template>

    <div>
        <div v-if="isError">
            <el-container class="top_wrap">
                <el-header>
                    <Navigationbar ></Navigationbar>
                </el-header>
                <el-main >

                    <el-tabs tab-position="left">
                        <el-tab-pane label="个人资料"><Info :u1="u"></Info></el-tab-pane>

                        <el-tab-pane label="我的表白之路"><ArticleList :u="u"></ArticleList></el-tab-pane>
                    </el-tabs>

                </el-main>
            </el-container>
        </div>

    </div>
</template>

<script>
    import Navigationbar from "@/components/index/Navigationbar";
    import Info from "@/components/individualPanel/Info";
    import ArticleList from "@/components/individualPanel/ArticleList";
    import axios from "axios";
    import qs from 'querystring'
    import Global from "@/components/Global";
    export default {
        name: "profile",
        components: { ArticleList, Info, Navigationbar},
        data:function(){
            return{
                isError:false,
                u:{}
            }
        },
        mounted:function () {
            let uId=window.location.href.split("/").splice(-1)[0]
            axios.post(
                Global.path+"/isUserById",
                qs.stringify({
                    uId:uId
                })
            ).then((res)=>{
                if(res.data!==""){

                    this.isError=true
                    this.u=res.data
                }
                else {
                    this.$router.push("/error")
                }
            })
        }
    }
</script>

<style scoped>
    .top_wrap{
        position: absolute;

        width: 100%;
        height: 100%;
        background: url("../img/blackbord.jpg") no-repeat;
        background-size: 100% 100%;
    }
    .el-tab-pane{
        /*min-width: 1000px;*/
    }
    .el-header{
        padding: 0;
    }
    .el-main{
        padding-left: 0;


    }
    .el-tabs{
        margin: auto;
        width: 1000px;

        background:rgba(251, 252, 252,0.5);
        border-radius: 10px;
        box-shadow: 0 3px 10px #AEB6BF;
    }
    @media screen and (max-width: 1000px ){
        .el-tabs{
            width: 90%;
        }
    }
</style>
