<script>
  import dataService from '../../services/dataservices'
  require('./presenting.scss')
  export default{
    template:require('./presenting.html'),
    ready: function(){
      $('#header').hide();
      if(this.$route.path.indexOf('embed')>=0){
          this.op = 'embed';
          switch(this.$route.query.layout){
            case 'compact':
              this.layout = 'compact'
              break;
            case 'float_3':
              this.layout = 'float_3'
              break;
            case 'single':
              this.layout = 'single'
              break;
            default:{
              this.layout = 'default'
            }
          }

      }
      else{this.op='present'; $('html').css('overflow-y','hidden');}

      this.timeStamp = Date.now();
      this.scopeId = this.$route.params.scopeId;
      this.appendDataList();
      this.user= dataService.getUser();
//      this.setUpdateInterval();
    },

    beforeDestroy:function(){
      if(this.updateInterval != null){
        clearInterval(this.updateInterval);
      }
    },

    destroyed:function(){
      $('html').css('overflow-y','auto');
      $('#header').show();
    },

    data(){
      return{
        imageList: [],
        pageSize: 30,
        pageNo: 0,
        scope:null,
        newImageList:[],
        updateInterval:null,
        layout:'default',
        showSetting:false,
        imagepresentinterval:10,
        op:null
      }
    },

    components:{
//      'list': require('../../searchPage/photoList/list.vue'),
      presentheader :require('./presentheader/presentheader.vue'),
      sidecontrol:require('./sidecontrol/sidecontrol.vue'),
      compact:require('./presenttemplate/compact/compact.vue'),
      regular:require('./presenttemplate/regular/regular.vue'),
      single:require('./presenttemplate/single/single.vue'),
      float_3:require('./presenttemplate/float_3/float_3.vue')
    },
    methods: {
      updateDataList: function(data){
        if(this.imageList.length == 0){
          this.imageList = data;
        }else{
          if(this.imageList.length < this.pageSize) this.hasMore = false
          this.imageList = this.imageList.concat(data);
        }
      },
      setUpateInterval:function(){
        this.updateInterval = setInterval(()=>{
          dataService.getImageViaScope(0, 15, Date.now(), this.scopeId).then((res)=>{
            for(let i in res.data.data){
              let push = true;
              for(let j in this.imageList){
                if(res.data.data[i].id == this.imageList[j].id ){
                  push = false;
                }
              }
              for(let k in this.newImageList){
                if(res.data.data[i].id == this.newImageList[k].id ){
                    push = false;
                  }
              }
              if(push){
                this.newImageList.unshift(res.data.data[i]);
              }
            }
          });
        },5000)

      },
      appendDataList: function(){
        var self = this;
        dataService.getImageViaScope(this.pageNo++, this.pageSize, Date.now(), this.scopeId).then((res)=>{
          if(res.data.scope && !this.scope) this.scope = res.data.scope
          this.updateDataList(res.data.data);
          if(self.op == 'present')
          this.setUpateInterval();
        });
      }
    }
  }
</script>
