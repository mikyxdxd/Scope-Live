<template>
    <div id="container">
        <div>this is template body</div>
    </div>
</template>

<script>
    export default{
        ready: function(){
          this.tag = this.$route.params.tag;
          console.log(this.tag);
        },
        data(){
            return{

            }
        },
        params:['tag'],
        components:{
            'card':require('../card/card.vue'),
        }
    }
</script>
