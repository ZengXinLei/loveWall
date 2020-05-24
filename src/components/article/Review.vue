<template>
    <div class="wrap">
        <el-container>
            <el-aside width="50px">
                <img style="max-width: 40px; height: 40px;margin: 10px;float: left" :src="review['user']['uHeadPortrait']"/>
            </el-aside>
            <el-container>
                <el-header style="padding: 20px 10px">
                    <div >
                        <h5>#{{floor+1}}</h5>
                        <h4 style="float: left">{{review["user"]["uName"]}}</h4>
                        <i  style="float: right" class="el-icon-delete"></i>
                    </div>

                </el-header>
                <el-main style="padding: 0 30px 0 0;">
<!--                    <div style="padding: 0 20px;background: #F4F4B0;border: #EDEDED 1px solid">-->
<!--                        <router-link to="/">水</router-link><span style="color: #EC7063">的原文:</span>-->
<!--                        <div style="padding: 10px">内容</div>-->
<!--                    </div>-->
                    <div style="padding: 20px 30px;border-bottom: #EDEDED solid 1px;">{{review.rText}}</div>
                </el-main>
                <el-footer height="40px">
                    <h5 style="color: grey;float: left;margin-top: 5px">{{time}}</h5>
                    <div style="padding: 5px;float: right">

<!--                        <el-button size="mini">回复</el-button>-->
                    </div>
                </el-footer>
            </el-container>
        </el-container>
<!--        <ReviewInput style="margin-top: 5px"></ReviewInput>-->
    </div>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import Time from "@/js/Time";
    // import ReviewInput from "@/components/article/ReviewInput";
    export default {
        name: "Review",
        components: {},
        props:{
            review:{},
            floor:null
        },
        mounted:function () {

            console.log(this.review)
        },
        computed:{
            time:function f() {
                return Time.getTime(this.review.rTime)
            }
        }
    }
</script>

<style scoped>

    .wrap{
        max-width: 700px;
        /*height: 300px;*/
        background: white;
        margin:20px auto;
    }
    .el-icon-delete{
        cursor: pointer;
        transition: .5s all;
    }
    .el-icon-delete:hover{
        transform: scale(1.2);
    }
</style>
