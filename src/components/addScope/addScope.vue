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
              <!--<div id="caption">-->
                <!--<input type="text" placeholder="Scope Name" v-model="captionname" required>-->
              <!--</div>-->

              <div id="caption">
              <label>Scope Name</label>
              <input type="text" v-model="captionname" required>
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

              <!---->
              <!--<div id="submit-but">-->
                <!--<input type="submit" value="Submit"></input>-->
              <!--</div>-->

            </div>

            <!--<div id="addScope-suc" v-show="showSuc">-->
              <!--You have Successfully Created a Scope. Redirect to Scope page in <span id="seconds">{{seconds}}</span> seconds-->
            <!--</div>-->

            <!--<div id="addScope-fail" v-show="showFail">-->
              <!--Create Scope Failed. Please try again.-->
            <!--</div>-->

            <!--<div id="addScope-dup" v-show="showDup">-->
              <!--Scope name is duplicated. Please try another name.-->
            <!--</div>-->

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
                scopeId: "",
                showSuc: false,
                showFail: false,
                showDup: false,
                seconds: 5
            }
        },
        watch:{
          'show':function(ov,v){
            if(v == false){
              this.tagList = [];
              this.captionname = this.hashtag = this.description = '';
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
          preventClick: function(e){
            e.stopPropagation();
          },
          submitForm: function() {

            console.log(this.captionname, this.description);

            if (!this.captionname.trim().length || !this.tagList.length) {

              !this.captionname.trim().length && toastr.error('Scope Must Have A Valid Caption');
              !this.tagList.length && toastr.error('Scope Must Have At Least One Tag');


            } else {


              var self = this;
              dataService.createScope('#' + this.tagList.join('#'), this.captionname, this.description).then((res)=>{
                if(res.status == 201
            )
              {
                if (res.data.result == "OK") {

                  toastr.success('Your Scope Has Been Created');
                  self.$route.router.go({path: `/s/${res.data.id}`});
                  this.show = false;

//                    self.scopeId = res.data.id;
//                    self.showFail = false;
//                    self.showDup = false;
//                    self.showSuc = true
//                    self.captionname = self.hashtag = self.description = '';
//                    self.$route.router.go({ name: 'scopeSetting', params: { scopeId: self.scopeId}});
//


                } else if (res.data.result == "SCOPE_NAME_DUPLICATE") {

                  toastr.error('Scope Name is Duplicated');
//                    self.showFail = false;
//                    self.showDup = true;


                }
              }
            else
              {

//                self.showDup = false;
//                self.showFail = true;
                toastr.error('Unknwn Error,Please Try Later');

              }
            })
              ;


            }

          }

//          countDown(){
//            var self = this;
//            let foo = setInterval(function () {
//              console.log(self.seconds);
//              self.seconds--;
//              if(self.seconds == 0){
//                clearInterval(foo);
//                self.$route.router.go({ name: 'scopeSetting', params: { scopeId: self.scopeId}});
//                self.show = false;
//                self.showSuc = false;
//                self.seconds = 5;
//              }
//            }, 1000)
//          }

        },

        components:{

        },
        props: ['show']
    }
</script>
