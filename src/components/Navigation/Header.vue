<template>
<div>
   <van-tabs v-model="activeName" @click="onClick">
  <van-tab title="正在上映 " ></van-tab>
  <van-tab title="即将上映 "></van-tab>
</van-tabs>
</div>
</template>

<script>
import Vue from 'vue';
import { Tab, Tabs ,Toast} from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Toast);

export default {
  data() {
    return {
      activeName: '0',
            url: ["/films/nowplaying", "/films/ComingSoon"],

    };
  },
  methods:{
    onClick:function(index) {
            this.$router.push(this.url[index]);
            // console.log(index);

    }
  }
  
};

</script>