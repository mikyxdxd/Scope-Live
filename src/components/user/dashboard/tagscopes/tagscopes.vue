<script>
    require('./tagscopes.scss')
    import dataService from '../../../../services/dataservices'
    export default{
       template:require('./tagscopes.html'),
       data(){
            return{
              pageNum:0,
              pageSize:11,
              scopeList:[],
              hasMore:true,
              user:dataService.getUser()
            }
       },
       ready(){

         this.getUserScopes()
       },

       methods:{

         getUserScopes(){

           dataService.getUserScopes(this.pageNum++,this.pageSize).then((res)=>{

             this.scopeList = res.data.data;
              console.log(res.data.data);
             if( res.data.data.length < this.pageSize){
               this.hasMore = false
             }


           });

         },

         deleteScope(scope){
             dataService.deleteScope(scope.id).then((res)=>{
               if(res.data.result == "OK"){
               toastr.success('Your scope has been deleted. ');
               this.pageNum = 0;
               this.getUserScopes();
             }else{
               toastr.error('Your deletion failed. Please try again!');
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
