<template>


    <div class="wrap" >
<!--        <el-col :span="22">-->
<!--            <el-menu class="nav" mode="horizontal" :collapse-transition="true" active-text-color="#F4A7B9"-->
<!--                     :default-active="page">-->
<!--                <el-menu-item index="1" @click="click">首页</el-menu-item>-->
<!--                <el-menu-item index="2" @click="click">表白</el-menu-item>-->
<!--                <el-menu-item index="3" >无</el-menu-item>-->
<!--                <el-menu-item index="4" >无</el-menu-item>-->
<!--            </el-menu>-->
<!--        </el-col>-->

        <el-drawer
                :visible.sync="drawable"
                direction="ltr"
                :with-header="false"
        >
                    <el-col :span="22">
                        <el-menu class="nav"   active-text-color="#F4A7B9"
                                 :default-active="page">
                            <el-menu-item index="1" @click="click">首页</el-menu-item>
                            <el-menu-item index="2" @click="click">表白</el-menu-item>
                            <el-menu-item index="3" >无</el-menu-item>
                            <el-menu-item index="4" >无</el-menu-item>
                        </el-menu>
                    </el-col>
        </el-drawer>
            <el-button @click="drawable=true" style="height: 100%;background: none;border:none"><i  class="el-icon-menu" style="transform: scale(1.8);"></i> </el-button>

            <div style="float: right;margin-right: 1rem">
                <template v-if="user!==null">

                    <Head :user="user" class="head_wrap" @out="out"></Head>
                </template>
                <template v-else>

                    <LoginHead  class="login_wrap"></LoginHead>
                </template>
            </div>



    </div>
    <!--    </el-row>-->
</template>

<script>
    import Head from "@/components/index/Head";
    import LoginHead from "@/components/index/LoginHead";

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
            console.log(path+"路径")
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
                this.user=this.$cookies.get("user")
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
        background: url("../img/nav.png") no-repeat;
        background-size: 100%;
        box-shadow: 0 4px 30px rgb(176, 147, 120);
        transition: all .5s;
    }



</style>
