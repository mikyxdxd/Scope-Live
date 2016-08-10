<template>
    <list :datalist.sync="dataList"></list>
    <div id="loadMore" v-on:click="appendDataList()">Load More</div>
</template>

<script>
  import dataService from '../../services/dataservices'
  import Isotope from 'isotope-layout'
  require('./search.scss')
    export default{
        ready: function(){
          this.timeStamp = Date.now();
          this.tag = this.$route.params.tag;
          dataService.getImageViaTag(this.pageNo, this.pageSize, this.timeStamp, this.tag).then((res)=>{
            this.pageNo++;
            this.updateDataList(res.data.data);
          });

        },
        data(){
            return{
              dataList: [],
              pageSize: 20,
              pageNo: 0

            }
        },
        params:['tag', 'dataList'],
        components:{
            'card':require('./card/card.vue'),
            'list': require('./photoList/list')
        },

        methods: {
          updateDataList: function(data){
            if(this.dataList.length == 0){
              console.log("enter")
              this.dataList = data;
            }else{
              console.log("concact datalist");
              this.dataList = this.dataList.concat(data);
            }
            console.log(this.dataList);
          },

          appendDataList: function(){
            dataService.getImageViaTag(this.pageNo, this.pageSize, this.timeStamp, this.tag).then((res)=>{
              this.pageNo++;
              this.updateDataList(res.data.data);
            });
          }
        }
    }
</script>
