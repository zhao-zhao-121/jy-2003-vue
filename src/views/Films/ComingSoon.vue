<template>
    <div id="container">
        <van-loading size="24px" type="spinner" vertical v-show="isLoading"
            >加载中...</van-loading
        >
        <van-card v-for="item in list" :key="item.filmId">
            <template #title>
                <span style="fontSize:16px;color:#191a1b"
                    >{{ item.name }} <span class="item">{{item.filmType.name}}</span></span
                >
            </template>
            <template #thumb>
                <img :src="item.poster" />
            </template>
            <template #desc>
                <div>
                   <div style="height:14px;line-height:14px"> <div
                                class="comingSoonFilm-buy"
                                style="float: right;"
                            >
                                预购
                            </div></div>
                   
                    <div style="fontSize:13px;margin-top: 4px;">主演：{{ item.actors | parserActors }}
                        
                    </div>
                    <div style="fontSize:13px">上映日期：{{datehe(item.premiereAt)}}</div>
                </div>
            </template>
        </van-card>
    </div>
</template>

<script>
// 导入地址
import uri from "@/config/uri";
import Vue from "vue";
import { Loading, Card } from "vant";
Vue.use(Loading);
Vue.use(Card);
export default {
    data() {
        return {
            list: [],
            pageNum: 1,
            isLoading: true,
            
        };
    },
    created() {
        this.$http.get(uri.getComingSoon).then((ret) => {
            console.log(ret.data.films);
            this.list = ret.data.films;
         
            this.isLoading = false;
        });
    },
    filters: {
        parserActors(actors) {
            if (actors) {
                let str = "";
                actors.forEach((el) => {
                    str += el.name + " ";
                });
                return str.substr(0, 15) + "...";
            } else {
                return "暂无主演";
            }
        },
    },
    methods:{
        datehe:function(tiem){
        let time = new Date(tiem*1000);
        let m = time.getMonth()+1;
        let d = time.getDate();
        let w = time.getDay();
        switch(w){
            case 1:
                w = "一"
                break;
            case 2:
                w = "二"
                break;
            case 3:
                w = "三"
                break;
            case 4:
                w = "四"
                break;
            case 5:
                w = "五"
                break;
            case 6:
                w = "六"
                break;
            case 7:
                w = "七"
                break;
        }
        // console.log(w)
        return "星期"+ w + " " + m +"月" + d + "日"
    }

    }
};
</script>

<style lang="scss" scoped>
img {
    width: 66px;
    height: 90px;
    border-radius: 0;
}
.item {
    font-size: 9px;
    color: #fff;
    background-color: #d2d6dc;
    height: 14px;
    line-height: 14px;
    padding: 0 2px;
    border-radius: 2px;
}

.comingSoonFilm-buy {
    line-height: 25px;
    height: 25px;
    width: 48px;
    border: 1px solid;
    color: #ffb232;
    font-size: 13px;
    text-align: center;
    border-radius: 2px;
    position: relative;
}
</style>
