<template>
  <div id="app">
    <Header></Header>
    <Footer></Footer>
    <router-view/>
  </div>
</template>
<script>

    import Footer from "@/components/Navigation/Footer";
    import Header from "@/components/Navigation/Header";


    export default {
      components: {
        Footer,
        Header
    },
    }

</script>
<style lang="scss">
  
    
</style>
