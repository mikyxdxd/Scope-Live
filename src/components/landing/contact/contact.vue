<script>
  require('./contact.scss')
    export default{
      template:require('./contact.html'),
        data(){
            return{
              name: '',
              email: '',
              message: ''
            }
        },
        methods:{
          submitForm: function(userName, email, message){
            this.$http.post('/email',
              {
                user: userName,
                email: email,
                message: message,
                option: "NONE"
              }).then((response) => {
               if(response.body.err){
                  //error
                  toastr.error("Your message sent failed. Please try aging.");
               }else{
                  //message sent
                  toastr.success("Thanks for contacting us. We will contact you as soon as possible.");
               }
            }, (response)=>{
                 //failed
                 toastr.error("Your message sent failed. Please try aging.");
            });
          }
        },
        components:{

        }
    }
</script>
