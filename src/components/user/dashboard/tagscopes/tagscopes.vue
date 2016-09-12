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
              user:dataService.getUser(),
              presentIcon: require('../../../../assets/present_icon.png'),
              upgrade: require('../../../../assets/upgrade.png')
            }
       },
       ready(){

         this.getUserScopes()
       },

       methods:{

         setFormat(scope,format){

           scope.$$layout = format
         },

         showEmbedingContent(e){

           $(e.currentTarget).find('.embeding-content').fadeIn();
         },
         hideEmbedingContent(e){

           $(e.currentTarget).parent().fadeOut(()=>{});
         },
         getUserScopes(){

           dataService.getUserScopes(this.pageNum++,this.pageSize).then((res)=>{

             for(let i in res.data.data){

               res.data.data[i].$$embedLink = window.location.origin + '/embed/';
               res.data.data[i].$$layout = 'default';
             }
             this.scopeList = res.data.data;
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
             for(let i in res.data.data){

               res.data.data[i].$$embedLink = window.location.origin + '/embed/';
               res.data.data[i].$$layout = 'default';

             }
             if( res.data.data.length < this.pageSize){
                this.hasMore = false
             }
             this.scopeList = this.scopeList.concat(res.data.data);
           })
         }
       }
    }
</script>
