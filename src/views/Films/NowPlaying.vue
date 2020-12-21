<template>
    <div id="container">
        <van-pull-refresh
            v-model="isLoading2"
            success-text="刷新成功"
            @refresh="onRefresh"
        >
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
                    <div style="fontSize:14px">
                        观众评分
                        <span style="color:#ffb232;fontSize:16px">{{
                            item.grade
                        }}</span>
                    </div>
                    <div style="fontSize:14px">主演：{{ item.actors | parserActors }} 
                        <div
                                class="nowPlayingFilm-buy"
                                style="float: right;"
                            >
                                购票
                            </div>
                            </div>
                    <div style="fontSize:14px">{{ item.nation }} | {{ item.runtime }}分钟</div>
                </div>
            </template>
        </van-card>
        </van-pull-refresh>
    </div>
</template>

<script>
import uri from "@/config/uri";
import Vue from "vue";
import { Loading, Card ,PullRefresh} from "vant";
Vue.use(Loading);
Vue.use(Card);
Vue.use(PullRefresh);

export default {
    data() {
        return {
            list: [],
            pageNum: 1,
            isLoading: true,
            isLoading2: true,
        };
    },
    
    created() {
        this.getData();
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
    methods: {
        getData(cb = null) {
            this.$http
                .get(uri.getNowPlaying + `?pageNum=${this.pageNum}`)
                .then((ret) => {
                    if (this.pageNum <= Math.ceil(ret.data.total / 10)) {
                        this.list = [...ret.data.films, ...this.list];
                        this.pageNum++;
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
        onRefresh() {
            this.getData(() => {
                this.isLoading2 = false;
            });
        },
    },
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

.van-card__thumb {
    margin-right: 0px;
    width: 80px;
}
.nowPlayingFilm-buy {
    line-height: 25px;
    height: 25px;
    width: 50px;
    border: 1px solid;
    color: #ff5f16;
    font-size: 13px;
    text-align: center;
    border-radius: 2px;
    position: relative;
}
</style>