<template>
    <el-container style="height: 620px;">
        <el-header>

            <h3 class="title">个人资料</h3>
        </el-header>
        <el-main>

            <el-container >
                <el-aside width="110">
                    <el-avatar :size="100" :src="u['uHeadPortrait']"></el-avatar>
                    <br>
                    <el-button v-if="Permissions===1" type="warning" size="small" style="margin-left: 11px;" @click="isChangeImg=true">修改头像</el-button>
                </el-aside>
                <el-main style="height: 600px">
                    <div>
                        <span>ID:{{u.uId}}</span>
                        <a style="float: right">表白之路></a>
                    </div>

                    <div style="margin-top: 15px">
<!--                        <span style="margin-right: 6px">关注 {{u.uAttention}}</span>-->
<!--                        <span style="margin-right: 6px">|</span>-->
<!--                        <span style="margin-right: 6px">粉丝 {{u.uFans}}</span>-->
                    </div>
                    <div style="margin-top: 10px">
                        <el-button size="mini" type="danger" @click="qrCode=true">捐赠</el-button>
                        <span style="margin-left: 10px" >* 无论多少，都是心意！</span>
                    </div>



                    <div style="height: 400px;margin-top: 5px;border-top: #e0e0e0 1px dashed">
                        <!--                    资料展示面板-->
                        <template v-if="!isChangePanel">
                            <div style="margin-top: 10px">
                                <span>昵称: </span>
                                <span>{{u.uName}}</span>
                                <el-button v-if="Permissions===1" type="success" size="mini" round style="float: right" @click="isChangePanel=true">修改资料</el-button>
                            </div>
                            <ul class="wrap_li">

                                <li><span>性别:</span>{{u.uSex==="无"?"":u.uSex}}<span></span></li>
                                <li><span>破壳日:</span><span>{{u.uBirth==="0"?"":u.uBirth}}</span></li>
                                <li><span>信仰:</span><span>{{u.uFaith==="无"?"":u.uFaith}}</span></li>
                                <li><span>女神:</span><span>{{u.uLover==="无"?"":u.uLover}}</span></li>
                                <li><span>允许他人查看我:<span>{{u.uPublic?"是":"否"}}</span></span></li>
                            </ul>
                        </template>
                        <template v-else>
                            <ul class="wrap_li">
                                <li><span>昵称:</span><el-input  v-model="user.uName"></el-input><span >{{user.uName.length}}/10</span> </li>
                                <li><span>性别:</span><el-radio label="男" v-model="user.uSex">男</el-radio><el-radio label="女" v-model="user.uSex">女</el-radio></li>
                                <li><span>破壳:</span><el-date-picker v-model="user.uBirth" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                                                                    value-format="yyyy-MM-dd"></el-date-picker></li>
                                <li><span>信仰:</span><el-input v-model="user.uFaith"></el-input><span >{{user.uName.uFaith}}/30</span></li>
                                <li><span>女神:</span><el-input v-model="user.uLover"></el-input><span >{{user.uName.uLover}}/5</span></li>
                                <li><el-switch
                                        v-model="isPublic"
                                        active-text="允许他人访问"
                                        inactive-text="拒绝他人访问">
                                </el-switch></li>
                                <el-row  style="margin-top: 40px">
                                    <el-col :span="4" :offset="1" >
                                        <el-button type="info" @click="isChangePanel=false">取消</el-button>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-button type="danger" @click="affirm">确认</el-button>
                                    </el-col>

                                </el-row>
                            </ul>
                        </template>
                    </div>
                </el-main>
            </el-container>
        </el-main>
        <el-dialog width="350px" :center="true" :visible.sync="qrCode">
            <img width="300px" height="400px" src="https://s1.ax1x.com/2020/05/25/t9C0Z8.png">
        </el-dialog>
        <el-dialog :center="true" :visible.sync="isChangeImg">
            <el-input v-model="url" placeholder="头像链接如:https://s2.ax1x.com/2019/12/06/QY0hQ0.png"></el-input>
            <span slot="footer" class="dialog-footer">

                <el-button type="primary" @click="subImg">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>

</template>

<script>
    import Global from "@/components/Global";
    import axios from 'axios'
    // eslint-disable-next-line no-unused-vars
    import qs from "querystring"
    export default {
        name: "Info",
        component: {},
        props:["u"],
        data:function () {
            return{
                src:"https://s1.ax1x.com/2020/05/19/YIKHwn.jpg",
                qrCode:false,
                isChangePanel:false,
                isChangeImg:false,
                url:"",
                Permissions:0,
                isPublic:false,
                user:{
                    uName:"",
                    uSex:"",
                    uBirth:"",
                    uFaith:"",
                    uLover:""
                }
            }
        },

        mounted:function(){

            this.isPublic=this.u.uPublic
            let user=this.$cookies.get("user")

            if(user!==null){


                if(user.uId===this.u.uId){
                    this.isPublic=this.u.uPublic
                    this.Permissions=1
                }
            }
        },
        methods:{
            affirm:function () {
                let user={

                }
                if( this.user.uName.length!==0&&(this.user.uName.length>10||this.user.uName.length<3)){
                    this.$notify.error({
                        title:"错误",
                        message:"小主，昵称别乱写哦~~"
                    })
                    return
                }


                if(this.user.uFaith.length>30){
                    this.$notify.error({
                        title:"错误",
                        message:"小主的信仰太大了~"
                    })
                    return
                }
                if (this.user.uLover.length!==0&&(this.user.uLover.length>5||this.user.uLover.length<3)){
                    this.$notify.error({
                        title:"错误",
                        message:"我国没这样的名字哦~~"
                    })
                    return
                }
                if(this.user.uName!==""){
                    user["uName"]=this.user.uName
                }
                if(this.user.uSex!==""){
                    user["uSex"]=this.user.uSex
                }
                if(this.user.uBirth!==""){
                    user["uBirth"]=this.user.uBirth

                }
                if(this.user.uFaith!==""){
                    user["uFaith"]=this.user.uFaith
                }
                if(this.user.uLover!==""){
                    user["uLover"]=this.user.uLover
                }
                user["uPublic"]=this.isPublic?1:0
                axios.post(
                    Global.path+"/updataInfo",
                    user

                ).then((res)=>{

                    if(res.data===""){
                        this.$notify.error({
                            title:"错误",
                            message:"昵称已存在"
                        })
                    }else {
                        this.$message.success("更改成功")
                        this.$cookies.set("user",res.data,"1d")

                        this.$emit("update",res.data)
                        this.isChangePanel=false
                    }
                })

            },
            subImg:function () {
                if(this.url.length===0){
                    this.$message.error("请填写链接后再提交")
                    return
                }
                else if(this.url.length>1000){
                    this.$message.error("链接太长")
                    return
                }

                axios.post(
                    Global.path+"/uploadHeadImg",
                    qs.stringify({
                        url:this.url
                    })
                ).then((res)=>{
                    if(res.data==="")
                        return
                    this.u=res.data
                    this.$cookies.set("user",res.data,"1d")

                })
                this.isChangeImg=false

            }
        }

    }
</script>

<style scoped>
    .title{

        color: #3d3d3d;
        line-height: 60px;
        border-bottom: 1px #7F8C8D dashed;
    }
    .el-main{
        overflow: hidden;
    }
    .el-container{
        /*width: 100%;*/
        height: 300px;
    }
    .wrap_li>li{
        list-style: none;
        margin-top: 10px;
    }
    .wrap_li>li>.el-input{
        margin-left: 5px;
        max-width: 200px;
    }
    .wrap_li>li>.el-radio{
        margin-left: 5px;
    }
    .wrap_li>li>span{
        max-width: 20px;
        text-align: right;
    }
</style>
