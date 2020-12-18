<template>
    <div id="aaa">
        <Header></Header>
        <div>
            
        电影模块下的即将上映</div>
        <ul>
            <li>{{aa}}</li>
            <li >{{ab}}</li>
            <li>{{ac}}</li>
            <li>{{ad}}</li>
        </ul>
    </div>
</template>

<script>

import uri from "@/config/uri";
import Header from "@/components/Navigation/Header";

export default { 
   
    data(){
            return{
                aa:'',
                ab:'',
                ac:'',
                ad:'',
            }
        },
        
  
    async created() {
        let ret = await this.$http.get(uri.getComingSoon);
        // console.log(ret.data.films[0]);
        this.aa=ret.data.films[0].filmId
        this.ab=ret.data.films[0].name
        
        this.ac=ret.data.films[0].poster
        this.ad=ret.data.films[0].actors


       
    },
     components: {
        // Footer,
        Header
    },
};
</script>