<template>
    <div style="height:44px">
        <div :class="{topheader: show}">
           <van-tabs v-model="activeName" @click="onClick"> 
                <van-tab title="正在热映"></van-tab>
                <van-tab title="即将上映"></van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";

Vue.use(Tab);
Vue.use(Tabs);

export default {
  data() {
    return {
            show: true,
      activeName: "0",
      url: ["/films/nowplaying", "/films/comingsoon"],
    };
  },
  created() {
    this.activeName = this.url.indexOf(this.$route.path);
    // console.log(this.$route.path);
  },
   mounted() {
        window.addEventListener("scroll", () => {
            let top = document.documentElement.scrollTop;
            if (top > 100) {
                this.show = true;
                console.log(1);
            } else {
                this.show = false;
            }
        });
    },
  methods: {
    onClick: function (index) {
      this.$router.push(this.url[index]);
    },
  },
};
</script>
<style lang="scss" scoped>
// 吸顶的样式
.topheader {
    position: fixed;
    z-index: 999;
    width: 100%;
    top: 0;
}
</style>