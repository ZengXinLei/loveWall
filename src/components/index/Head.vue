<template>
    <div class="head">
        <div :style="headImg"></div>
        <div class="menu">
            <div class="menu-item" ><router-link to="/profile" style="color: #515A6E" >修改资料</router-link></div>
            <div class="menu-item" @click="out">退出登录</div>

        </div>

    </div>

</template>
<script>
    import axios from "axios";
    import Global from "@/components/Global";
    import Router from "@/components/Router";
    export default {
        name: "Head",

        props: ["user"],
        data:function(){
            return{
                display:false,
                imageUrl:""
            }
        },
        mounted: function () {
        },
        methods: {
            out: function () {

                axios.get(Global.path+"/out").then(() => {
                    this.$message({
                        message: "已退出登录",
                        type: "success"
                    })
                    // this.$store.commit("out")
                    // this.$router.options.routes.splice(-2,1)
                    // this.$router.addRoutes(this.$router.options.routes)
                    // console.log(this.$router)

                    this.$cookies.remove("user")
                    this.$cookies.remove("isLogin")
                    Router.addRouter(this)
                    this.$emit("out", {})
                    this.$router.push("/")
                })
            },




        },
        computed:{
            headImg:function () {

                // console.log(this.user.uHeadPortrait)
                return "background-size:100% 100%;background:url('"+this.user.uHeadPortrait+"') no-repeat;"
            }
        }
    }
</script>

<style scoped>
    .head {
        position: relative;
        width: 60px;
        height: 60px;
        /*background: red;*/
    }

    .head:hover .menu {
        display: block;
    }

    .head > div:nth-child(1) {
        cursor: pointer;
        /*position: absolute;*/
        border-radius: 50%;
        width: 100%;
        height: 100%;
        /*background:url("../img/book.png") no-repeat;*/
        /*background-size: 100% 100%;*/
        transition: all .3s;
    }

    .head > div:nth-child(1):hover {
        transform: scale(1.1);
    }

    .menu {
        display: none;
        width: 60px;
        transition: all .2s;
        background: #D6EAF8;
        border-radius: 3px;
        box-shadow: 0 2px 5px #CCD1D1;
    }

    .menu-item {
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        font-size: 12px;
        font-weight: bold;


    }

    .menu-item:hover {
        transition: all .3s;
        transform: scale(1.1);
        background: #ABEBC6;
        color: #F4A7B9;
    }


</style>
