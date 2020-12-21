<template>
  <div id="app">
    <router-view/>
    
    <Footer v-show="$store.state.isShowFooter"></Footer>
  </div>
</template>
<script>

    import Footer from "@/components/Navigation/Footer";
    // import Header from "@/components/Navigation/Header";


    export default {
      components: {
        Footer,
        // Header
    },
    data(){
      return{
        isShowFooter :false,
      };
    }
    }

</script>
<style lang="scss">
  
    
</style>
