'use strict'
import axios from 'axios';

class DataService{

  constructor(){

    this.serverUrl = 'https://api.scopephotos.com/v1';
    this.httpServerUrl = 'https://api.scopephotos.com/v1';
    this._authorizationToken = 'Basic c2V5bW91ci13ZWI6YVJiYXoyOWR2aUIlITpxLTBwMTV0';
    this._guessAuthorizationToken = 'Basic c2V5bW91ci13ZWI6YVJiYXoyOWR2aUIlITpxLTBwMTV0';
    axios.defaults.headers.common['Authorization'] = this._authorizationToken;
    axios.defaults.headers.post['Content-Type'] = 'text/json';
    // this._scopetoken = localStorage._scopetoken;
    this.userToken = localStorage._scopetoken;
    this.user = null;
    if(this.userToken && this.userToken.length > 0){
      this._getUserProfile();
    }
  }

  _getUserProfile(){
    axios({method:'GET',url:this.httpServerUrl + '/users/me', headers:{
      'Authorization':this.userToken
    }}).then((res)=>{
      this.user = res.data;
  })
  }

  getUser(){
    return this.user;
  }

  getScopeGeneral(scopeId, pageNo, pageSize, timeStamp, userType){

    return axios.get(this.httpServerUrl  + '/search/scopes/' + scopeId + '/images?page=' + pageNo + '&size=' + pageSize + '&timestamp=' + timeStamp);
  }

  logIn(username,password){
    return axios({method:'POST',url:this.httpServerUrl + '/login',
      headers:{

        'Content-Type':'application/x-www-form-urlencoded'
      },
      data:$.param(
        {
          'grant_type': 'password',
          'username': username,
          'password': password
        }
      )
    })

  }

  setUserToken(token){

    this.userToken = token;

  }

  getUserProfile(){

    return axios({method:'GET',url:this.httpServerUrl + '/users/me', headers:{
      'Authorization':this.userToken
    }})
  }

  getUserScopes(pageNum,pageSize){

    return axios({method:'GET',url:this.httpServerUrl + `/scope?page=${pageNum}&size=${pageSize}`, headers:{
      'Authorization':this.userToken
    }})

    return axios.get(this.httpServerUrl + `/scope?page=${pageNum}&size=${pageSize}`)
  }

  getSingleImage(id){

    return axios.get(this.httpServerUrl + `/search/images/${id}`)
  }

  getImageViaTag(pageNo, pageSize, timeStamp, imageTag){

    return axios.get(this.httpServerUrl + '/search/images?&size=' + pageSize + '&tag=' + encodeURI(encodeURI(imageTag)) + '&timestamp=' + timeStamp + '&page=' + pageNo);
  }

  getImageViaScope(pageNo, pageSize, timeStamp, scopeId){


    return axios.get(this.httpServerUrl + '/search/scopes/' + scopeId + '/images?page=' + pageNo + '&size=' + pageSize + '&timestamp=' + timeStamp);
  }

  getImageViaLocation(pageNo, pageSize, timeStamp, radius, longitude, latitude){

    return axios.get(this.httpServerUrl + '/search/images?&size=' + pageSize + '&loc_lat=' + latitude + '&loc_lon=' + longitude + '&radius=' + radius + '&timestamp=' + timeStamp + '&page=' + pageNo)

  }

  getScopeVidTag(pageNo, pageSize, timeStamp, scopeTag){

    return axios.get(this.httpServerUrl + '/search/scopes?&size=' + pageSize + '&name=' + encodeURI(encodeURI(scopeTag)) + '&timestamp=' + timeStamp + '&page=' + pageNo);
  }

  getScopeInfo(scopeId){

    return axios({method:'GET',url:this.httpServerUrl + `/scope/${scopeId}`, headers:{
      'Authorization':this.userToken
    }})

  }

}

let dataService = new DataService();
module.exports = dataService;


