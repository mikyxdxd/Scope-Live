<script>
  require('./dashboard.scss')
  export default{
    ready(){
      let qRlt = this.$route.query.p_rlt;
      if(qRlt == 'success' || qRlt =='ft'){
        toastr.options.positionClass =  "toast-top-full-width";
        if(qRlt == 'success') toastr.success('You have successfully upgraded your account!')
        if(qRlt == 'ft') toastr.success('Enjoy your 30-day free trial!')
        toastr.options.positionClass = "toast-top-right";
      }
    },
    template:require('./dashboard.html'),
    components:{
      tagscopes:require('./tagscopes/tagscopes.vue')
    }
  }
</script>
