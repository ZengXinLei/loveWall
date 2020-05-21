<template>
    <div class="head">
        <div><router-link to="/login">登录</router-link></div>
        <div><router-link to="/sign">注册</router-link></div>
    </div>
</template>

<script>
    export default {
        name: "LoginHead"
    }
</script>

<style scoped>
    .head{
        position: relative;
        width: 80px;
        height: 60px;
        /*background: red;*/
    }
    .head>div{
        float: left;
        width: 40px;
        line-height: 60px;
        text-align: center;


    }
    .head>div>a{
        color: #D5D8DC;
        font-weight: bold;
        transition: all .3s;
    }
    .head>div>a:hover{
        color: rgb(244, 167, 185);
        transform: scale(1.1);
    }
</style>
