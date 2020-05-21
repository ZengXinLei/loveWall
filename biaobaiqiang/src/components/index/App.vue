<template>

        <el-row class="wrap" >
            <el-col :span="24">
                <el-container >
                    <el-header class="parent_head" height="250px">
                        <Wave class="wave"></Wave>
                        <!--                    心电图-->
                        <el-row class="ecg">
                            <el-col :span="12">
                                <!--                    左心电图-->
                                <Ecg class="left_ecg"></Ecg>
                            </el-col>
                            <el-col :span="12" :push="12">
                                <!--                    左心电图-->
                                <Ecg class="right_ecg"></Ecg>

                            </el-col>
                        </el-row>
                        <Heart></Heart>
                        <h3 class="loverSPrattle">如果不能住进你心里，都是客死他乡</h3>
                    </el-header>
                    <el-container>
                        <el-header class="son_head">
                            <!--                        导航条-->
                            <Navigationbar></Navigationbar>
                        </el-header>
                        <el-main>
                            <IndexBody></IndexBody>

                        </el-main>
                    </el-container>
                </el-container>
            </el-col>
        </el-row>



</template>

<script>
    import Navigationbar from "@/components/index/Navigationbar";
    import Wave from "@/components/index/Wave";
    import Heart from "@/components/index/Heart";
    import Ecg from "@/components/index/Ecg";
    import IndexBody from "@/components/index/IndexBody";
    // console.log("开始加载")
    // window.onload=function () {
    //     console.log("加载完成")
    // }
    export default {
        name: "App",
        components: {IndexBody, Ecg,Wave,Heart, Navigationbar},

    }
</script>

<style scoped>
    .loverSPrattle{
        width: 100%;
        z-index: 2;
        position: absolute;
        bottom: 10px;
        text-align: center;
        color: #ffffff;
        text-shadow: 0 2px 3px white;
        margin: 0;
    }
    .parent_head {
        position: relative;
        padding: 0;
        /*background-image:linear-gradient(to bottom,#F4A7B9,#FADBD8) ;*/
    }

    .son_head {
        /*position: absolute;*/
        width: 100%;
        /*top:100px;*/

        padding: 0;
    }

    .el-main {
        /*background: #D7BDE2;*/
        height: 800px;
    }

    .load_heart{
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%) scale(1.5);
        animation: load infinite;
    }



    .wrap{
        width: 100%;
    }
    .right_ecg{
        right: 0px;
    }


</style>
