<template>
    <div id="addScope-bg" v-if="show" @click="show = false">
      <div id="addScope-container"  @click="preventClick($event)">

        <div id="create-form">
          <div id="addScope-body">

            <div id="addScope-header">Create Scope</div>

            <div id="form-input">
              <div id="hashtag">

                <label>Scope Tag</label>
                <div id="add_tag_btn">
                  <button type="button" @click="addTag()"><i class="fa fa-plus" aria-hidden="true"></i></button>
                </div>
                <input type="text" v-model="newTag" placeholder="Insert A New Tag">
                <div id="tag_list"><div class="one_tag" v-for="tag in tagList">
                  <div class="chip">
                    {{tag}}
                    <i class="close material-icons" @click="tagList.splice(tagList.indexOf(tag),1)">close</i>
                  </div></div></div>

              </div>

              <div id="caption">
              <label>Scope Name</label>
              <input type="text" v-model="captionname" required>
              </div>

              <div class="switch">
                <label>
                  Off
                  <input type="checkbox">
                  <span class="lever"></span>
                  On
                </label>
              </div>

              <div id="location">
                  <label for="textarea1">Scope Location</label>
                  <input type="text" v-model="address" required>
                  <div id="add_tag_btn">
                    <button type="button" @click="addLoc()"><i class="fa fa-plus" aria-hidden="true"></i></button>
                  </div>
                  <map :address.sync="address" :lat.sync="lat" :lng.sync="lng"></map>
              </div>

              <div id="description">
                <div class="input-field col s12">
                  <textarea id="textarea1" class="materialize-textarea" length="120" v-model="description"></textarea>
                  <label for="textarea1">Scope Description</label>
                </div>
                <!--<textarea  placeholder="Scope description" rows="3" cols="50"  v-model="description"></textarea>-->
              </div>

              <div id="submit-but">
                <button class="waves-effect waves-light btn cancel" type="button" @click="show = false">Cancel</button><button class="waves-effect waves-light btn" @click="submitForm()">Create</button>
                </div>

            </div>


          </div>

        </div>



      </div>
    </div>
</template>

<script>
    require('./addScope.scss')
    import dataService from '../../services/dataservices'
    export default{
        data(){
            return{
                captionname: "",
                hashtag: "",
                newTag:"",
                tagList:[],
                description: "",
                address: "",
                lat: "",
                lng: "",
                scopeId: "",
                showSuc: false,
                showFail: false,
                showDup: false,
            }
        },
        watch:{
          'show':function(ov,v){
            if(v == false){
              this.tagList = [];
              this.captionname = this.hashtag = this.description = this.address = '';
            }
          }
        },
        methods: {

          addTag:function(e){

            if(this.tagList.indexOf((this.newTag)) < 0){

              this.tagList.push(this.newTag);
              console.log( this.tagList)
              this.newTag = '';

            }
          },

          addLoc:function(e){
            this.$broadcast('update-address', this.address);
          },
          preventClick: function(e){
            e.stopPropagation();
          },
          submitForm: function() {

            console.log(this.captionname, this.description);
            let location = null;
            console.log(this.address, this.lat, this.lng);
            if(this.address == ""){
              location = null;
            }else{
              location = {
                'address': this.address,
                'latitude': this.lat,
                'longitude': this.lng
              }
            }
            if (!this.captionname.trim().length || !this.tagList.length) {

              !this.captionname.trim().length && toastr.error('Scope Must Have A Valid Caption');
              !this.tagList.length && toastr.error('Scope Must Have At Least One Tag');


            } else {
              var self = this;
              dataService.createScope('#' + this.tagList.join('#'), this.captionname, this.description, location).then((res)=> {
                if(res.status == 201)
              {
                if (res.data.result == "OK") {

                  toastr.success('Your Scope Has Been Created');
                  self.$route.router.go({path: `/s/${res.data.id}`});
                  this.show = false;
                } else if (res.data.result == "SCOPE_NAME_DUPLICATE") {
                  toastr.error('Scope Name is Duplicated');
                }
              }else
              {
                toastr.error('Unknwn Error,Please Try Later');
              }
            });
          }
         }
        },

        components:{
          map: require('../gMap/map.vue')
        },
        props: ['show']
    }
</script>
