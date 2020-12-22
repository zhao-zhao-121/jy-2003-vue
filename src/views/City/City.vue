<template>
    <div>
        <div>城市列表</div>
        <div>
            <van-index-bar :index-list="cityIndex">
                <template v-for="(item, index) in dataList">
                    <van-index-anchor :key="index">{{
                        item.index
                    }}</van-index-anchor>
                    <van-cell
                        @click="setCity(city.cityId, city.name)"
                        :title="city.name"
                        v-for="city in item.data"
                        :key="city.cityId"
                    />
                </template>
            </van-index-bar>
        </div>
    </div>
</template>


<script>

import uri from '@/config/uri';
import Vue from 'vue';
import { IndexBar, IndexAnchor, Cell } from "vant";
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);

export default {
    data() {
        return {
         cityIndex: [],
         charIndex:[],
         dataList:[],


        };
    },
    created(){
        this.$store.commit("isShowFooterNav", false);
        this.getData();
        
    },
    destroyed(){
        this.$store.commit("isShowFooterNav", true);

    },
    methods:{
            setCity(cityId,cityName){
                this.$store.commit('setCity', { cityId, cityName })
                this.$router.go(-1);
            },
            getData() {
      
            this.$http
                .get(uri.getCity )
                .then(ret => {
                  if (ret.status == 0) {
                  for(let i = 65;i<=90;i++){
                      this.charIndex.push(String.fromCharCode(i));
                  }

                    this.charIndex.forEach(el=>{
                        let tmp =ret.data.cities.filter(item=>{
                            return el.toLowerCase()==item.pinyin.substr(0,1);
                        });
                        if (tmp.length > 0) {
                        this.cityIndex.push(el);
                        this.dataList.push({
                            index: el,
                            data: tmp,
                        });
                    }
                    })



                }
  
                });
         
        },

    }
}
</script>