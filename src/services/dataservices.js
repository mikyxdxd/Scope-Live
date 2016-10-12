'use strict'
import axios from 'axios';
const PAY_LEVEL = {
  0:'FRE',
  1:'BSC',
  2:'ADV'
}

class DataService {

  constructor() {

    this.serverUrl = 'https://api.scopephotos.com/v1';
    this.httpServerUrl = 'https://api.scopephotos.com/v1';
    this._authorizationToken = 'Basic c2V5bW91ci13ZWI6YVJiYXoyOWR2aUIlITpxLTBwMTV0';
    this._guessAuthorizationToken = 'Basic c2V5bW91ci13ZWI6YVJiYXoyOWR2aUIlITpxLTBwMTV0';
    axios.defaults.headers.common['Authorization'] = this._authorizationToken;
    axios.defaults.headers.post['Content-Type'] = 'text/json';
    // this._scopetoken = localStorage._scopetoken;
    this.userToken = localStorage._scopetoken;
    this.user = null;
    this.userType = null;
    if (this.userToken && this.userToken.length > 0) {
      this.getUserProfile();
    } else {
      this.userType = 'visitor';
    }
  }

  getUserProfile(cb) {
    axios({
      method: 'GET', url: this.httpServerUrl + '/users/me', headers: {
        'Authorization': this.userToken
      }
    }).then((res)=>{
      this.fetchUserOrder().then((payment_res)=>{
        if(payment_res.data.data.length != null ){
          if(!payment_res.data.data[0]){
            this.placeOrder({
              total: 0,
              orderItems: [{
                productId: 24,
                quantity: 1,
                amount: 0,
                total: 0
              }]
            }).then((payRes)=>{
              if(payRes.data.status == 'CREATED'){
                this.user = res.data;
                this.userType = 'user';
                this.user.payLevel = PAY_LEVEL[0];
                if(cb) cb();
              }
            })

          }else {
            this.user = res.data;
            this.userType = 'user';
            switch (payment_res.data.data[0].orderItems[0].productId) {
              case 26:
                this.user.payLevel = PAY_LEVEL[2];
                break;
              case 25:
                this.user.payLevel = PAY_LEVEL[1];
                break;
              case 24:
                this.user.payLevel = PAY_LEVEL[0];
                break;
            }

            if(cb) cb();
          }

        }

      })
    }).catch((err)=>{
      delete localStorage._scopetoken;
      this.userToken = null;
      this.userType = 'visitor';
    })
  }

  getUser() {
    return this.user;
  }

  getUserType() {

    return this.userType;
  }

  getInstagramUserInfo(access_token, cb){
    $.getJSON( `https://api.instagram.com/v1/users/self/?access_token=${access_token}&callback=?`, cb);
  }

  getScopeGeneral(scopeId, pageNo, pageSize, timeStamp, userType) {

    return axios.get(this.httpServerUrl + '/search/scopes/' + scopeId + '/images?page=' + pageNo + '&size=' + pageSize + '&timestamp=' + timeStamp);
  }


  logIn(username, password) {
    return axios({
      method: 'POST', url: this.httpServerUrl + '/login',
      headers: {

        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: $.param(
        {
          'grant_type': 'password',
          'username': username,
          'password': password
        }
      )
    })

  }


  register(name, email, password) {
  return axios({
    method: 'POST',
    url: this.httpServerUrl + '/signuplogin2',
    data: {
      'name': name,
      'email': email,
      'password': password
    }
  })

  }

  setUserToken(token) {

    this.userToken = token;
    // this.userType = 'user';
    // this._getUserProfile();

  }

  // setUser(user){
  //   if(this.userType == 'visitor') {
  //     this.user = user;
  //     this.userType = 'user';
  //     this._getUserProfile();
  //   }
  // }

  // getUserProfile() {
  //   return axios({
  //     method: 'GET', url: this.httpServerUrl + '/users/me', headers: {
  //       'Authorization': this.userToken
  //     }
  //   })
  // }

  getUserScopes(pageNum, pageSize) {

    return axios({
      method: 'GET', url: this.httpServerUrl + `/scope?page=${pageNum}&size=${pageSize}`, headers: {
        'Authorization': this.userToken
      }
    })

    return axios.get(this.httpServerUrl + `/scope?page=${pageNum}&size=${pageSize}`)
  }

  getSingleImage(id) {

    return axios.get(this.httpServerUrl + `/search/images/${id}`)
  }

  getImageViaTag(pageNo, pageSize, timeStamp, imageTag) {

    return axios.get(this.httpServerUrl + '/search/images?&size=' + pageSize + '&tag=' + encodeURI(encodeURI(imageTag)) + '&timestamp=' + timeStamp + '&page=' + pageNo);
  }

  createScope(hashtag, caption, description, location, sourceType) {
    return axios({
      method: 'POST', url: this.httpServerUrl + '/scope',
      headers: {
        'Authorization': this.userToken
      },
      data:{
          'caption': caption,
          'tag': hashtag,
          'description': description,
          'location': location,
          "shareType":"PUBLIC",
          "sourceType": sourceType,
          "showType": "NORMAL",
          "scopeRole":"OWN",
          "radius": 50
        }
    })
  }

  updateScope(scopeId, newScope){
    return axios({
      method: 'PUT', url: this.httpServerUrl + `/scope/${scopeId}`,
      headers:{
        'Authorization': this.userToken
      },
      data: newScope

    })
  }



  reScope(scopeId, mediaId) {

    return axios({
      method: 'POST', url: this.httpServerUrl + `/scope/${scopeId}/images`,
      headers: {

        'Authorization': this.userToken
      },
      data: {
        id: mediaId
      }
    })
  }

  deleteImage(mediaId) {
    return axios({
      method: 'DELETE',
      headers: {
        'Authorization': this.userToken
      },
      url: this.httpServerUrl + `/image/${mediaId}`
    });
  }

  deleteScope(scopeId){
    return axios({
      method: 'DELETE',
      headers: {
        'Authorization': this.userToken
      },
      url: this.httpServerUrl + `/scope/${scopeId}`
    })
  }

  getImageViaScope(pageNo, pageSize, timeStamp, scopeId) {

    if(this.userType == 'user'){
      return axios({
        method: 'GET', url:this.httpServerUrl + '/scope/' + scopeId + '/images?page=' + pageNo + '&size=' + pageSize + '&timestamp=' + timeStamp, headers: {
          'Authorization': this.userToken
        }
      })
    }else{
      return axios({
        method: 'GET', url:this.httpServerUrl + '/search/scopes/' + scopeId + '/images?page=' + pageNo + '&size=' + pageSize + '&timestamp=' + timeStamp, headers: {
          'Authorization': this._authorizationToken
        }
      })

    }



    // return axios(this.httpServerUrl + '/search/scopes/' + scopeId + '/images?page=' + pageNo + '&size=' + pageSize + '&timestamp=' + timeStamp);
  }

  getImageViaLocation(pageNo, pageSize, timeStamp, radius, longitude, latitude) {

    return axios.get(this.httpServerUrl + '/search/images?&size=' + pageSize + '&loc_lat=' + latitude + '&loc_lon=' + longitude + '&radius=' + radius + '&timestamp=' + timeStamp + '&page=' + pageNo)

  }

  getScopeVidTag(pageNo, pageSize, timeStamp, scopeTag) {

    return axios.get(this.httpServerUrl + '/search/scopes?&size=' + pageSize + '&name=' + encodeURI(encodeURI(scopeTag)) + '&timestamp=' + timeStamp + '&page=' + pageNo);
  }

  getScopeInfo(scopeId) {

    return axios({
      method: 'GET', url: this.httpServerUrl + `/scope/${scopeId}`, headers: {
        'Authorization': this.userToken
      }
    })

  }

  retriveSkuProduct(sku) {

    return axios({
      method: 'GET', url: this.httpServerUrl + `/products/sku`, headers: {
        'Authorization': this.userToken
      }
    })
  }

  placeOrder(order) {
    return axios({
      method: 'POST', url: this.httpServerUrl + '/orders',
      headers: {
        'Authorization': this.userToken
      },
      data:order
    })
  }
  fetchUserOrder(){
    return axios({
      method: 'GET', url: this.httpServerUrl + `/orders?page=0&size=100&skus=100,101,102`, headers: {
        'Authorization': this.userToken
      }
    })
  }
}

let dataService = new DataService();
module.exports = dataService;


