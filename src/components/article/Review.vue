<template>
    <div class="wrap">
        <el-container>
            <el-aside width="50px">
                <img style="max-width: 40px;margin: 10px;float: left" src="https://s1.ax1x.com/2020/05/19/YIKHwn.jpg"/>
            </el-aside>
            <el-container>
                <el-header style="padding: 20px 10px">
                    <div >
                        <h4 style="float: left">姓名</h4>
                        <h5 style="float: right;color: grey">时间</h5>
                    </div>

                </el-header>
                <el-main style="padding: 0 30px 0 0;">
                    <div style="padding: 0 20px;background: #F4F4B0;border: #EDEDED 1px solid">
                        <router-link to="/">水</router-link><span style="color: #EC7063">的原文:</span>
                        <div style="padding: 10px">内容</div>
                    </div>
                    <div style="padding: 20px 30px;border-bottom: #EDEDED solid 1px;">内容</div>
                </el-main>
                <el-footer height="40px">
                    <div style="padding: 5px;float: right">
                        <el-button size="mini">回复</el-button>
                    </div>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Review"
    }
</script>

<style scoped>

    .wrap{
        max-width: 700px;
        /*height: 300px;*/
        background: white;
        margin:20px auto;
    }
</style>
