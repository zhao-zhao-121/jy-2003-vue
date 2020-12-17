<template>
    <div>
        电影模块
        <router-view></router-view>
         <button @click="hhh()">点击去正在热映页面</button>
        <button @click="zzz()">点击去即将上映页面</button>
    </div>
</template>
<script>
export default {
    methods:{
        hhh:function(){
      this.$router.push({
        path:'/films/nowplaying',
      
      })
            

    },
     zzz:function(){
      this.$router.push({
        path:'/films/comingsoon',
       
      })
    },
    }
}
</script>