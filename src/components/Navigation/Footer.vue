<template>
    <div>
        <van-tabbar v-model="active" @change="changeTab">
            <van-tabbar-item><van-icon
                    class="iconfont icon-dianying"
                    slot="icon"
                    size="1.1rem"
                /><span>电影</span></van-tabbar-item
            >
            <van-tabbar-item
                ><van-icon
                    class="iconfont icon-yingyuan"
                    slot="icon"
                    size="1.1rem"
                /><span>影院</span></van-tabbar-item
            ><van-tabbar-item
                ><van-icon
                    class="iconfont icon-yixianshi_huaban"
                    slot="icon"
                    size="1.1rem"
                /><span>我的</span></van-tabbar-item
            >
        </van-tabbar>
    </div>
</template>

<script>
import "@/assets/icon/iconfont.css";
import Vue from "vue";
import { Tabbar, TabbarItem, Icon } from "vant";

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
export default {
    data() {
        return {
            active: 0,
            url: ["/films/nowplaying", "/cinemas", "/center"],
        };
    },
    created() {
        if(this.$route.path=='/films/comingsoon'){
            this.active=0;
        }else{
        
        this.active = this.url.indexOf(this.$route.path);}
    },
    methods: {
        changeTab(index) {
            this.$router.push(this.url[index]);
        },
    },
};
</script>
