<template>
    <div id="addScope-bg" v-show="show" @click="show = false">
      <div id="addScope-container"  @click="preventClick($event)">

        <form id="create-form" v-on:submit.prevent="submitForm(hashtag, captionname, description)">
          <div id="addScope-body">

            <div id="addScope-header">Create Scope</div>

            <div id="form-input">
              <div id="hashtag">
                <input type="text"  placeholder="Hashtag" v-model="hashtag">
              </div>

              <div id="caption">
                <input type="text" placeholder="Tag Name" v-model="captionname">
              </div>

              <div id="description">
                <textarea  placeholder="Scope description" rows="3" cols="50"  v-model="description"></textarea>
              </div>

              <div id="submit-but">
                <input type="submit" value="Submit"></input>
              </div>

            </div>

            <div id="addScope-suc" v-show="showSuc">
              You have Successfully Created a Scope. Redirect to Scope page in <span id="seconds">{{seconds}}</span> seconds
            </div>

            <div id="addScope-fail" v-show="showFail">
              Create Scope Failed. Please try again.
            </div>

            <div id="addScope-dup" v-show="showDup">
              Scope name is duplicated. Please try another name.
            </div>

          </div>



        </form>



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
                description: "",
                scopeId: "",
                showSuc: false,
                showFail: false,
                showDup: false,
                seconds: 5
            }
        },
        methods: {
          preventClick: function(e){
            e.stopPropagation();
          },
          submitForm: function(hashtag, captionname,  description){
            var self = this
            console.log(hashtag, captionname,  description);
            dataService.createScope(hashtag,captionname, description).then((res)=>{
              if(res.status == 201){
                  if(res.data.result == "OK"){
                    self.scopeId = res.data.id;
                    self.showFail = false;
                    self.showDup = false;
                    self.showSuc = true;
                    self.countDown();
                  }else if(res.data.result == "SCOPE_NAME_DUPLICATE"){
                    self.showFail = false;
                    self.showDup = true;
                  }
              }else{
                console.log("FAILED");
                self.showDup = false;
                self.showFail = true;
              }
            });
          },

          countDown(){
            var self = this;
            let foo = setInterval(function () {
              console.log(self.seconds);
              self.seconds--;
              if(self.seconds == 0){
                clearInterval(foo);
                self.$route.router.go({ name: 'scope', params: { scopeId: self.scopeId}});
                self.show = false;
                self.showSuc = false;
                self.seconds = 5;
              }
            }, 1000)
          }

        },

        components:{

        },
        props: ['show']
    }
</script>
