<template>


    <div class="wrap" >

        <el-drawer
                :visible.sync="drawable"
                direction="ltr"
                :with-header="false"
                size="60%"
                :modal="false"

        >

            <div style="margin-left: 5px;border-top: 10px solid rgb(244, 167, 185);border-bottom: 10px solid rgb(244, 167, 185);height: 100%">
                <el-menu class="nav"   active-text-color="#F4A7B9"
                         :default-active="page" >
                    <el-menu-item index="1" @click="click"><i class="el-icon-discount"></i> 首页</el-menu-item>
                    <el-menu-item index="2" @click="click"><span style="margin-left: 5px">❤</span><span style="margin-left:13px">表白</span></el-menu-item>
                    <el-menu-item index="3" >无</el-menu-item>
                    <el-menu-item index="4" >无</el-menu-item>

<!--                    <el-menu-item v-if="user!==null" index="6" >退出登录</el-menu-item>-->
                </el-menu>
                <div style="position: absolute;bottom: 20px;transform: translateX(-50%);left: 50%">

                    <template v-if="user===null">

                        <LoginHead  class="login_wrap"></LoginHead>
                    </template>
                    <template v-else>
                        <el-button @click="out">退出登录</el-button>
                    </template>
                </div>
            </div>

        </el-drawer>
            <el-button @click="drawable=true" style="height: 100%;background: none;border:none"><i  class="el-icon-menu" style="transform: scale(1.8);"></i> </el-button>

            <div style="float: right;margin-right: 1rem">
                <template v-if="user!==null">

                    <Head :user="user" class="head_wrap" @out="out"></Head>
                </template>

            </div>



    </div>
    <!--    </el-row>-->
</template>

<script>
    import Head from "@/components/index/Head";
    import LoginHead from "@/components/index/LoginHead";
    import axios from "axios";
    import Global from "@/components/Global";

    /**
     * @module Navigationbar
     */
    export default {
        name: "Navigationbar",
        components: {LoginHead, Head},
        prop: ["index"],
        data: function () {
            return {
                user:this.$cookies.get("user"),
                page:"1",
                drawable:false
            }
        },

        /**
         * 导航栏加载的时候，添加页面滚动监听
         */
        mounted:function() {

            let path=window.location.href.split("/").splice(-1)[0]
            let arr=["","edit"]
            for (let i = 0; i < arr.length; i++) {

                if(path===arr[i])
                {
                    this.page=i+1+""
                    break
                }
            }

            if(this.page==="1"){
                window.addEventListener("scroll", this.scroll)
            }


        },
        /**
         * 导航栏组件的方法
         */
        methods: {
            click: function (event) {
                if(event.index==="1"){
                    this.$router.push("/")
                }
                else if (event.index==="2"){
                    this.$router.push("/edit")
                }

            },
            /**
             * 滚动条判断
             */
            scroll: function () {
                let scrolltop = document.documentElement.scrollTop
                if (scrolltop >= 311) {

                    this.$el.style.position = "fixed"
                    this.$el.style.top = "0px"


                } else {
                    this.$el.style.position = "relative"
                }


            },
            /**
             * 退出登录
             */
            out:function () {
                axios.get(Global.path+"/out").then(() => {
                    this.$message({
                        message: "已退出登录",
                        type: "success"
                    })
                })
                this.user=null
                this.$cookies.remove("user")
                this.$cookies.remove("isLogin")

            }

        }


    }
</script>

<style scoped>



    .el-icon-menu{
        color:white;
    }
    .el-icon-menu:hover{
        color: #fb8489;
    }
    .el-button:hover{
        color: #fb8489;
    }
    .wrap {
        z-index: 3;
        width: 100%;
        height: 60px;
        background: url("https://s1.ax1x.com/2020/05/25/t9Cczn.png") no-repeat;
        background-size: 100%;
        box-shadow: 0 4px 30px rgb(176, 147, 120);
        transition: all .5s;
    }



</style>
