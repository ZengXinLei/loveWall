<template>
    <div class="head">
        <div :style="'background:url('+this.user.uHeadPortrait+') no-repeat;background-size:100% 100%;'" @click="toProfile"></div>
    </div>

</template>
<script>

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

        computed:{
            headImg:function () {

                // console.log(this.user.uHeadPortrait)
                return "background-size:100% 100%;background:url('"+this.user.uHeadPortrait+"') no-repeat;"
            }
        },
        methods:{
            toProfile:function () {
                this.$router.push("/profile")
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

    .head > div {
        cursor: pointer;
        /*position: absolute;*/
        border-radius: 50%;
        width: 100%;
        height: 100%;
        /*background:url("../img/book.png") no-repeat;*/
        /*background-size: 100% 100%;*/
        transition: all .3s;
    }

    .head > div:hover {
        transform: scale(1.1);
    }

</style>
