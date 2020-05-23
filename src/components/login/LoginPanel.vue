<template>
    <div v-if="this.$cookies.get('user')==null">
                            <span style="margin-top: -115px;">
                            <p class="form">
                                <input type="text" placeholder="用户名" v-model="uName">
                            </p>
                            <div class="tip" style="color: red">{{userTip}}</div>
                                <p class="form"><input type="password" id="passwd" placeholder="密码" v-model="uPassword"></p>
                            <div class="tip" style="color: red">{{passwordTip}}</div>
                            <input type="button" value="登录" class="btn" style="margin-right: 20px;" @click="submit">


                            <router-link class="toindex" to="/">返回首页? </router-link><router-link class="tosign" to="/signIn">去注册</router-link>
                            </span>
    </div>
</template>

<script>
    import axios from "axios";
    import qs from "querystring";
    import Global from "@/components/Global";

    export default {
        name: "LoginPanel",
        /**
         * data
         * @prop uName {String} 用户名或者电话号码
         * @property uPassword {String} 密码
         * @property userTip {String}  用户名提示
         * @property passwordTip {String} 密码提示
         */
        data: function () {
            return{
                uName: "",
                uPassword: "",
                userTip: "",
                passwordTip: ""
            }
        },methods: {
            submit: function () {
                this.userTip = ""
                this.passwordTip = ""
                if (this.uName.length === 0) {
                    this.userTip = "用户名不能为空"
                    return
                }
                if (this.uPassword.length === 0) {
                    this.passwordTip = "密码不能为空"
                    return
                }
                axios.post(
                    Global.path+"/loginCheck",
                    qs.stringify({
                        uName: this.uName,
                        uPassword: this.uPassword
                    })
                ).then((res) => {
                    let user = res.data
                    if (user === "") {
                        this.userTip = "账号或密码输入错误"
                    } else {
                        this.$cookies.set("user",user)
                        this.$router.push("/")
                    }

                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .tip {
        text-align: left;
        margin-bottom: 40px;
    }

    @font-face {
        font-family: 'neo';
        src: url("../font/neo.ttf");
    }

    input:focus {
        outline: none;
    }

    #title {
        color: white;
    }

    .form input {
        width: 300px;
        height: 30px;
        font-size: 18px;
        background: none;
        border: none;
        border-bottom: 1px solid #fff;
        color: #fff;
        margin-bottom: 0px;
    }
    .form input[class="code"]{
        width: 220px ;
    }

    .form input::placeholder {
        color: rgba(255, 255, 255, 0.8);
        font-size: 18px;
        font-family: "neo";
    }

    .confirm {
        height: 0;
        overflow: hidden;
        transition: .25s;
    }

    .btn {
        width: 140px;
        height: 40px;
        border: 1px solid #fff;
        background: none;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
        margin-top: 25px;
        font-family: "neo";
        transition: .25s;
    }

    .btn:hover {
        background: rgba(255, 255, 255, .25);
    }

    #login_wrap {
        width: 980px;
        min-height: 500px;
        border-radius: 10px;
        font-family: "neo";
        overflow: hidden;
        /*box-shadow: 0px 0px 120px rgba(0, 0, 0, 0.25);*/
        position: fixed;
        top: 50%;
        right: 50%;
        margin-top: -250px;
        margin-right: -490px;
    }

    #login {
        width: 50%;
        height: 100%;
        min-height: 500px;
        background: linear-gradient(to left, rgba(142, 68, 173, 0.5), rgba(165, 105, 189, 0.5));
        position: relative;
        float: right;
    }

    #status > i {
        letter-spacing: 20px;
    }

    #login #status {
        width: 90px;
        height: 35px;
        margin: 25px auto;
        color: #fff;
        font-size: 30px;
        font-weight: 600;
        position: relative;
        overflow: hidden;
    }

    #login #status i {
        font-style: normal;
        position: absolute;
        transition: .5s
    }

    #login span {
        text-align: center;
        position: absolute;
        left: 50%;
        margin-left: -150px;
        top: 52%;
        margin-top: -180px;
    }

    /*#login span a {*/
    /*    text-decoration: none;*/
    /*    color: #fff;*/
    /*    display: block;*/
    /*    margin-top: 80px;*/
    /*    font-size: 18px;*/
    /*}*/
    #toindex {
        text-decoration: none;
        color: #fff;
        display: block;
        margin-top: 80px;
        font-size: 18px;
    }

    #tosign {
        color: #fff;
        color: #fff;
    }

    #bg {
        position: fixed;
        background: url("../img/blackbord.jpg");
        height: 100%;
        width: 100%;
    }

    /*绘图*/
    #login_img {
        width: 50%;
        min-height: 500px;
        background: linear-gradient(45deg, #221334, #6c3049);
        opacity: 0.5;
        float: left;
        position: relative;
    }

    #login_img span {
        position: absolute;
        display: block;
    }

    .circle {
        left: 50%;
        transform: translateX(-50%);
    }

    #login_img .circle {
        /*width: 200px;*/
        /*height: 200px;*/
        /*border-radius: 50%;*/
        /*background: linear-gradient(45deg, #df5555, #ef907a);*/
        top: 70px;
        left: 50%;
        margin-left: -100px;
        /*overflow: hidden;*/
    }

    #login_img .circle span {
        width: 150px;
        height: 40px;
        border-radius: 50px;
        position: absolute;
    }

    #login_img .circle span:nth-child(1) {
        top: 30px;
        left: -38px;
        background: #c55c59;
    }

    #login_img .circle span:nth-child(2) {
        bottom: 20px;
        right: -35px;
        background: #934555;
    }

    #login_img .star span {
        background: radial-gradient(#fff 10%, #fff 20%, rgba(72, 34, 64, 0));
        border-radius: 50%;
        box-shadow: 0 0 7px #fff;
    }

    #login_img .star span:nth-child(1) {
        width: 15px;
        height: 15px;
        top: 50px;
        left: 30px;
    }

    #login_img .star span:nth-child(2) {
        width: 10px;
        height: 10px;
        left: 360px;
        top: 80px;
    }

    #login_img .star span:nth-child(3) {
        width: 5px;
        height: 5px;
        top: 400px;
        left: 80px;
    }

    #login_img .star span:nth-child(4) {
        width: 8px;
        height: 8px;
        top: 240px;
        left: 60px;
    }

    #login_img .star span:nth-child(5) {
        width: 4px;
        height: 4px;
        top: 20px;
        left: 200px;
    }

    #login_img .star span:nth-child(6) {
        width: 4px;
        height: 4px;
        top: 460px;
        left: 410px;
    }

    #login_img .star span:nth-child(7) {
        width: 6px;
        height: 6px;
        top: 250px;
        left: 350px;
    }

    #login_img .fly_star span {
        width: 90px;
        height: 3px;
        background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0.67), rgba(255, 255, 255, 0));
        background: -o-linear-gradient(left, rgba(255, 255, 255, 0.67), rgba(255, 255, 255, 0));
        background: linear-gradient(to right, rgba(255, 255, 255, 0.67), rgba(255, 255, 255, 0));
        transform: rotate(-45deg);
    }

    #login_img .fly_star span:nth-child(1) {
        top: 60px;
        left: 80px;
    }

    #login_img .fly_star span:nth-child(2) {
        top: 210px;
        left: 332px;
        opacity: 0.6;
    }

    #login_img p {
        text-align: center;
        /*color: #af4b55;*/
        font-weight: 600;
        margin-top: 246px;
        font-size: 25px;
    }

    #login_img p i {
        font-style: normal;
        margin-right: 45px;
    }

    #login_img p i:nth-last-child(1) {
        margin-right: 0;
    }

    /*提示*/
    #hint {
        width: 100%;
        line-height: 70px;
        background: linear-gradient(-90deg, #9b494d, #bf5853);
        text-align: center;
        font-size: 25px;
        color: #fff;
        box-shadow: 0 0 20px #733544;
        display: none;
        opacity: 0;
        transition: .5s;
        position: absolute;
        top: 0;
        z-index: 999;
    }

    /* 响应式 */
    @media screen and (max-width: 1000px ) {
        #login_img {
            display: none;
        }

        #login_wrap {
            width: 490px;
            margin-right: -245px;
        }

        #login {
            width: 100%;

        }
    }

    @media screen and (max-width: 560px ) {
        #login_wrap {
            width: 330px;
            margin-right: -165px;
        }

        #login span {
            margin-left: -125px;
        }

        .form input {
            width: 250px;
        }
        .form input[class="code"] {
            width: 168px ;
        }
        .btn {
            width: 113px;
        }
    }

    @media screen and (max-width: 345px ) {
        #login_wrap {
            width: 290px;
            margin-right: -145px;
        }
    }
</style>
