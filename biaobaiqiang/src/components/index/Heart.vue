<template>
    <el-row type="flex" justify="center" align="middle">
        <div class="box">
            <div class="left"></div>
            <div class="right"></div>
        </div>
    </el-row>
</template>

<script>
    export default {
        name: "Heart"
    }
</script>

<style scoped>
    .box{
        position: relative;
        top:6vh;
        /*left: 50%;*/
        width: 30vh;
        height: 30vh;

        transform: scale(0.5);
        animation: move .5s infinite alternate
        ease-out;
        /*动画名称 运动时间 运动次数infinite表示无限次 alternate往返效果相同*/
    }

    @keyframes move {
        100%{
            transform: scale(0.6);/*变大1.2倍*/
        }
    }
     .left,  .right{
        width: 15vh;
        height: 24vh;
        background-color: white;
        border-radius: 7.5vh 7.5vh 0 0;
        /*float: left;*/
        position: absolute;/*相对大div定位*/
        /*left: 153px;*/
        box-shadow: 0 0 4vh white;/*设置阴影效果，其值分别表示水平偏移量，竖直偏移量，阴影大小，颜色*/
    }
    .left{
        transform: rotate(46deg) ;
        right: 4vh;

    }
     .right{
        transform: rotate(-46deg);
        /*margin-left: -21.3vh;*/

         left: 4vh;
    }
    p{
        font-size: 5vh;
        text-align: center;
        color: red;
    }





</style>
