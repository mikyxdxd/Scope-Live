<template>
    <div id="addScope-bg">
      <div id="addScope-container">

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
                description: ""
            }
        },
        methods: {
          submitForm: function(hashtag, captionname,  description){
            console.log(hashtag, captionname,  description);
            dataService.createScope(hashtag,captionname, description).then((res)=>{
              console.log(res);
            });
          }
        },
        components:{

        }
    }
</script>
