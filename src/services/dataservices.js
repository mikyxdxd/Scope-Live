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
    this.instagramAccessToken = localStorage._insAccToken;
  }

  getScopeGeneral(scopeId, pageNo, pageSize, timeStamp, userType){

    return axios.get(this.httpServerUrl  + '/search/scopes/' + scopeId + '/images?page=' + pageNo + '&size=' + pageSize + '&timestamp=' + timeStamp);
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

}

let dataService = new DataService();
module.exports = dataService;


