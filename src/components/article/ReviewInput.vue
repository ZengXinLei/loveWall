<template>
    <div class="_wrap">
        <el-input
                type="textarea"
                placeholder="来说点什么吧"
                v-model="text"
                maxlength="1000"

                show-word-limit

        >
        </el-input>
        <el-button type="mini" style="margin-top: 5px;" @click="input">发表</el-button>
    </div>
</template>

<script>
    export default {
        name: "ReviewInput",
        data:function () {
            return{
                text:""
            }
        },
        methods:{
            input:function () {
                this.$emit("getReview",this.text)
            }
        }
    }
</script>

<style scoped>
    ._wrap {
        background: white;

        width: 100%;
        max-width: 700px;
        /*height: 60px;*/
        margin: 20px auto;
        padding: 10px 5px;
    }
</style>
