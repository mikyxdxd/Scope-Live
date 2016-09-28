<template>
    <div id="searchpage">
      <searchheader></searchheader>
      <!--<div id="search_ctr" v-if="userType != 'visitor'"><button @click="showAddScope = true">Create a #{{$route.params.tag.split(' ').join('#')}} Scope</button></div>-->
      <noresult :shownoreuslt="!dataList.length && !showLoading"></noresult>
      <list :datalist.sync="dataList"></list>
      <div id="loadMore" v-show="dataList.length>0 && hasMore && !showLoading"><button class="waves-effect waves-light btn" @click="appendDataList()">Load More</button></div>
      <loading :show.sync="showLoading"><loading>

     </div>
</template>

<script>
  import dataService from '../../services/dataservices'
  require('./search.scss')
    export default{

        ready: function(){
          this.userType = dataService.getUserType();
          this.timeStamp = Date.now();
          dataService.getImageViaTag(this.pageNo, this.pageSize, this.timeStamp, this.$route.params.tag).then((res)=>{
            this.showLoading = false;
            this.pageNo++;
            this.updateDataList(res.data.data);
          });


        },
        data(){
            return{
              dataList: [],
              pageSize: 20,
              pageNo: 0,
              hasMore:true,
              showLoading: true,
              showAddScope:false,
              tag: this.$route.params.tag,
              defaultTag:this.$route.params.tag.split(' '),
              userType: ''
            }
        },
        params:['tag','dataList'],
        components:{
            'list': require('./photoList/list'),
            'searchheader':require('./searchheader/searchheader.vue'),
            'loading': require('../loading/loading.vue'),
            'addscope':require('../addScope/addScope.vue'),
            'noresult':require('../noresult/noresult.vue')

        },

        methods: {
          updateDataList: function(data){
            if(this.dataList.length == 0){
              this.dataList = data;
            }else{
              if(this.dataList.length < this.pageSize) this.hasMore = false
              this.dataList = this.dataList.concat(data);
            }
          },
          appendDataList: function(){
            this.showLoading = true;
            dataService.getImageViaTag(this.pageNo, this.pageSize, this.timeStamp, this.tag).then((res)=>{
              //this.showLoading = false;
              this.pageNo++;
              this.updateDataList(res.data.data);
            });
          }
        },
        events: {
          'no-showLoading': function(){
            this.showLoading = false;
          }
        },
        route:{
          canReuse: false
        }
    }
</script>
