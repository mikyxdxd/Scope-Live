<script>
    require('./tagscopes.scss')
    import dataService from '../../../../services/dataservices'
    export default{
       template:require('./tagscopes.html'),
       data(){
            return{
              pageNum:1,
              scopeList:[]
            }
       },
       ready(){

         this.getUserScopes()
       },

       methods:{

         getUserScopes(){

           dataService.getUserScopes(this.pageNum,11).then((res)=>{this.scopeList = res.data.data});

         }
       }
    }
</script>
