import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import ViewUI from 'view-design';
import Resource from "vue-resource/src/resource";
import 'view-design/dist/styles/iview.css';
import Main from "@/components/index/Main";
import VueRouter from "vue-router";
import Vuex from "vuex"
import axios from 'axios'
import Global from "@/components/Global";
import VueCookies from 'vue-cookies'
import qs from "querystring";
import Router from "@/components/Router";
Vue.use(VueCookies)
Vue.use(Vuex)
Vue.use(Resource)
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(ViewUI)

let routes = []
console.log("%c github 地址： %chttps://github.com/ZengXinLei/loveWall", "color:red","color:#009688;font-weight:bold")
console.log("%c 因为要做毕设， %c所以先搁浅一段时间", "color:red","color:#009688;font-weight:bold")
console.log("%c 交流群 %c 894742938 %c 卑微的站长", "color:red","","color:orange;font-weight:bold")
console.log("%c ", "background: url('https://s1.ax1x.com/2020/05/25/t9ZPN6.png') no-repeat center;background-size:100% 100%;padding-left:80px;padding-bottom: 80px;")

const router = new VueRouter({
    mode: "history",
    routes
})

new Vue({
    el: '#app',
    router,
    render: h => h(Main),
    mounted: function () {

        // 防止刷新后路由和全局user没了

        // console.log(this.$cookies.get("user"))
        //如果本地cookie有数据，并且没有登录状态
        //重新登录
        axios.get(Global.path+"/isLogin").then((res)=>{
            if(res.data===""&&this.$cookies.get("user")!==null){
                let user=this.$cookies.get("user")
                axios.post(
                    Global.path+"/loginCheck",
                    qs.stringify({
                        uName: user.uName,
                        uPassword: user.uPassword
                    })
                ).then((res)=>{
                    if(res.data===""){
                        this.$cookies.remove("user")
                        this.$cookies.remove("isLogin",)
                    }
                    else {
                        this.$cookies.set("user",res.data,"1d")
                    }
                })
            }
        })




        Router.addRouter(this)

    }
});

