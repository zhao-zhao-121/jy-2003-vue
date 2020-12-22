<template>
    <div>
        <div class="header">
            <div class="goBack" @click="goBack">
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC"
                    alt=""
                />
            </div>
            <div class="title" v-show="show_title">
                {{ film.name }}
               
            </div>
        </div>

        <div class="poster">
            <img v-lazy="film.poster" alt="" />
        </div>

        <div class="main">
            <div class="film-detail">
                <div>
                    <span class="name">{{ film.name }}</span>
                    <span class="item"> {{ filmType }}</span>
                   
                   <span class="grade"><span class="grade1">{{film.grade}}</span>分</span>
                </div>
                <!-- <div>{{ film.category }}</div> -->
                <div class="grey-text">{{ film.category }}</div>
                <!-- <div>{{ film.premiereAt | parsePremierAt }}上映</div> -->
                <div class=" grey-text">{{ film.premiereAt | parsePremierAt }}上映</div>
                <div class=" grey-text">{{ film.nation }} | {{ film.runtime }}分钟</div>
                <!-- <div>{{ film.synopsis }}</div> -->
                <div class=" grey-text hidde" style="height: 38px;">{{ film.synopsis }}</div>
                <div class="toggle"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAMAAADHqI+lAAAAOVBMVEVHcEy9xcW9wMW9wcW////Bwca9wcW9wMW9wMW+wMW+wcW9wcXMzMy+wMa+wce9wMe9wca9wMW9wMWKU/2FAAAAEnRSTlMAH+jGBDa6/vaatcIPdlNSdckJHB8JAAAASUlEQVQIHQXBhwGDMAADMCVksQr4/2MrObYCQNkOZ2oH6DWna2Q9wG9lXLQ984V3Zm/gntlb2zNvgN/KGFkPAL0mtQNA+b4C/AGl4gJfgEWzrAAAAABJRU5ErkJggg==" alt="" class=""></div>
            </div>
            <div class="film-actor">
                <div class="yzry">演职人员</div>
                <Swiper :key="'yzry_' + film.actors.length">
                    <div
                        class="swiper-slide"
                        v-for="(item, index) in film.actors"
                        :key="index"
                    >
                        <img :src="item.avatarAddress" width="85" height="85" />
                        <div>{{item.name}}</div>
                    </div>
                </Swiper>
            </div>
        </div>
    </div>
</template>

<script>
import uri from "@/config/uri";
import Vue from "vue";
import moment from "moment";
import Swiper from "@/components/Swiper";
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
    // loading: "https://2url.cc/1OwrB",
    loading: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608618511816&di=4ee8fe6d73d37ec5ee19d13f2fe3c468&imgtype=0&src=http%3A%2F%2Fp1.ssl.cdn.btime.com%2Ft014bf7b973970cf810.jpg",

});
export default {
        data() {
        return {
           film: { actors: [] },
            show_title: false,
            filmType: "",
            
            
        };
    },
    components: {
        Swiper,
    },


    created() {
        this.$store.commit("isShowFooterNav", false);
        
        this.getData();
    },
    beforeDestroy() {
        this.$store.commit("isShowFooterNav", true);
    },
    methods:{

     getData() {
      
            this.$http
                .get(uri.getFilmInfo + `?filmId=${this.$route.params.filmId}`)
                .then((ret) => {
                  if (ret.status == 0) {
                    this.film = ret.data.film;
                    this.filmType = ret.data.film.filmType.name;
                }
  
                });
         
        },
         goBack() {
            this.$router.go(-1);
        }
        },
          filters: {
        parsePremierAt(val) {
            return moment(val * 1000).format("YYYY-MM-DD");
        },
    },
    
};
</script>
<style lang="scss">
.header {
    position: fixed;
    background-color: hsla(0, 0%, 100%, 0);
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    width: 100vw;
    height: 44px;
    z-index: 1;
}
.goBack {
    height: 30px;
    position: absolute;
    top: 5px;
    left: 5px;
}
.goBack img {
    width: 30px;
}
.title {
    font-size: 17px;
    line-height: 44px;
    width: 100vw;
    text-align: center;
}
.poster {
    width: 100%;
    img {
        width: 100%;
        height: 300px;
    }
}
.main {
    background: #f4f4f4;
    .film-detail {
        background: #ffffff;
        padding-top: 20px;
        padding-left: 15px;
    }
    .film-actor {
        background: #ffffff;
        margin-top: 10px;
        padding-left: 15px;
        .yzry {
            padding-top: 15px;
        }
    }
}
.grade {
    width: calc(100% - 250px);
    text-align: right;
    color: #ffb232;
    float: right;
    font-size: 14px;
    padding-right:10px ;

   
    }
    .grade1 {
    font-size: 18px;
    font-style: italic;
    padding-right:3px ;

    
    }


 .name {
    color: #191a1b;
    font-size: 18px;
    height: 24px;
    line-height: 24px;
    margin-right: 7px;
}

 .item {
    font-size: 10px;
    color: #fff;
    background-color: #d2d6dc;
    height: 16px;
    line-height:20px;
    padding: 0 2px;
    border-radius: 2px;
    display: inline-block;
}
 .grey-text {
    font-size: 13px;
    color: #797d82;
    margin-top: 4px;
}


 .hidde {
    height: 38px!important;
    overflow: hidden;
    margin-top: 12px;
    font-size: 13px;
    color: #797d82;
}
 .toggle img {
    text-align: center;
    display: block;
    width: 20px;
    margin: auto;

    background-color: #fff;
}
</style>
