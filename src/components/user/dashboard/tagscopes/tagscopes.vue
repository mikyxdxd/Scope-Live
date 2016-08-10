<script>
    require('./tagscopes.scss')
    import dataService from '../../../../services/dataservices'
    export default{
       template:require('./tagscopes.html'),
       data(){
            return{
              pageNum:1,
              pageSize:11,
              scopeList:[],
              hasMore:true
            }
       },
       ready(){

         this.getUserScopes()
       },

       methods:{

         getUserScopes(){

           dataService.getUserScopes(this.pageNum++,this.pageSize).then((res)=>{

             this.scopeList = res.data.data;
             if( res.data.data.length < this.pageSize){
               this.hasMore = false
             }


           });

         },

         loadMoreScope(){

           dataService.getUserScopes(this.pageNum++,this.pageSize).then((res)=>{
             if( res.data.data.length < this.pageSize){
                this.hasMore = false
             }
             this.scopeList = this.scopeList.concat(res.data.data);
           })
         }
       }
    }
</script>
