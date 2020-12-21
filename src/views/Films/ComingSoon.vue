<template>
    <div class="wrapper" :style="{ height: height + 'px' }">
        <div>

        <van-loading size="24px" type="spinner" vertical v-show="isLoading"
            >加载中...</van-loading
        >
        <van-card v-for="item in list" :key="item.filmId"  @click="gotoDetail(item.filmId)">
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
                   <div style="height:14px;line-height:14px"></div>
                   
                    <div style="fontSize:13px;margin-top: 4px;">主演：{{ item.actors | parserActors }}
                         <div
                                class="comingSoonFilm-buy"
                                style="float: right;"
                            >
                                预购
                            </div>
                    </div>
                    <div style="fontSize:13px">上映日期：{{datehe(item.premiereAt)}}</div>
                </div>
            </template>
        </van-card>
        </div>
    </div>
</template>

<script>
// 导入地址
import uri from "@/config/uri";
import Vue from "vue";
import { Loading, Card } from "vant";
import BScroll from "better-scroll";

Vue.use(Loading);
Vue.use(Card);
export default {
    data() {
        return {
            list: [],
            pageNum: 1,
            isLoading: true,
            bs: null,
            height: 0,
            y: 0,
            
        };
    },
    created() {
              this.getData();

    },
    mounted(){
        this.height = document.documentElement.clientHeight-94;
    },
    updated(){
        this.bs = new BScroll('.wrapper',{
            click:true,
            startY:this.y,
            pullUpLoad:true
        });
        this.bs.on("pullingUp", () => {
            this.getData();
            this.y = this.bs.y;
            this.bs.finishPullUp();
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
    },
     getData(cb = null) {
            this.$http
                .get(uri.getComingSoon + `?pageNum=${this.pageNum}`)
                .then((ret) => {
                    if (this.pageNum <= Math.ceil(ret.data.total / 10)) {
                        this.pageNum++;
                        this.list = [...this.list, ...ret.data.films];
                    }
                    if (cb == null) {
                        this.isLoading = false;
                    } else {
                        cb();
                    }
                });
        },
        gotoDetail(filmId) {
            this.$router.push("/film/" + filmId);
        },

    }
};
</script>

<style lang="scss" scoped>
img {
    width: 90%;
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
.van-card__thumb {
    margin-right: 0px;
    width: 80px;
}
</style>
