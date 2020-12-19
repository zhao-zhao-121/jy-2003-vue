<template>
  <div id="app">
    <router-view/>
    
    <Footer></Footer>
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
    }

</script>
<style lang="scss">
  
    
</style>
