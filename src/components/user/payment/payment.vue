<script>
  require('./payment.scss');
  import dataSerivces from '../../../services/dataservices'
  export default{
    ready(){
      this.currentPlan = this.plans.advanced
    },
    data(){
      return{
        phone:require('../../../assets/phone_icon.png'),
        processingPayment:false,
        payPalSettings:{
          paypal:{business:'paul.tan-facilitator@pantoscopemedia.com',
                  currency_code:'CAD',
            service_url:'https://www.sandbox.paypal.com/cgi-bin/webscr'
          }
        },
        user:dataSerivces.getUser(),
        notifyUrl : "https://api.scopephotos.com/v1/ipn", // + $scope.orderId;
        returnUrl :  window.location.protocol + '//'+ window.location.host + "/appcontent/dashboard?p_rlt=success",
        cancelReturnUrl : window.location.protocol + '//'+ window.location.host + "/appcontent/payment",
        plans:{
          basic:{
            name:'Basic Plan',
            price:'14.95',
            productId:25,
          },
          advanced:{
            name:'Advanced Plan',
            price:'19.95',
            productId:26
          }
        },
        currentPlan:null,
        order:null
      }
    },
    methods:{
      switchPlan(plan){
        switch(plan){
          case 'basic':
            this.currentPlan = this.plans.basic;
            break;
          case 'advanced':
            this.currentPlan = this.plans.advanced;
            break;
        }
      },
      generatePayment(){
        if (!this.processingPayment) {
          this.processingPayment = true;
          dataSerivces.placeOrder({
            total: this.currentPlan.price,
            orderItems: [{

              productId: this.currentPlan.productId,
              quantity: 1,
              amount: this.currentPlan.price,
              total: this.currentPlan.price
            }]
          }).then((res)=>{

            if(res){
              this.order = res.data;
              this.$nextTick(()=>{$('#paypal_form').submit();})
            }

          }
        )
          ;
        }
      }
    },
    template:require('./payment.html')
  }
</script>
