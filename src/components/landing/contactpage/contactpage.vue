<script>
  require('./contactpage.scss')
    export default{
      template:require('./contactpage.html'),
        data(){
            return{
              name: '',
              email: '',
              message: ''
            }
        },
        components:{

          contact:require('../contact/contact.vue')
        }
    }
</script>
