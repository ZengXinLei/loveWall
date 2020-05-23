<template>
<!--    <Editor :init="init"></Editor>-->
    <div>
        <textarea class="edit"></textarea>
    </div>
</template>

<script>
    import tinymce from 'tinymce/tinymce'
    import 'tinymce/themes/silver'
    import 'tinymce/icons/default'
    // 引入你需要的插件
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/contextmenu'
    import 'tinymce/plugins/wordcount'
    import 'tinymce/plugins/colorpicker'
    import 'tinymce/plugins/textcolor'
    export default {
        name: "Edit",
        // components:{Editor},
        data(){
            return{
                text:""
            }
        },
        mounted(){
            // const _this = this
            tinymce.init({
                selector:".edit",
                language_url: process.env.BASE_URL+'tinymce/zh_CN.js',// 语言包的路径
                language: 'zh_CN',//语言
                skin_url: process.env.BASE_URL+'tinymce/skins/ui/oxide',// skin路径
                plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
                toolbar:
                    'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                browser_spellcheck: true, // 拼写检查
                height:400,
                branding: false, // 去水印
                // init_instance_callback: editor => {
                //     // console.log(editor)
                //     editor.on(
                //         'input change undo redo', () => {
                //             this.$emit('input', editor.getContent())
                //             console.log(this.value)
                //
                //         })
                // }
                setup: (editor) => {

                    // 抛出 'input' 事件钩子，同步value数据
                    editor.on(
                        'input change undo redo', () => {
                            this.$emit('input', editor.getContent(),editor.getContent({format:'text'}))
                        }
                    )
                }

            })

        },
        methods:{
            change:function () {

                console.log("e")
            }
        }
    }
</script>

<style scoped>

</style>
