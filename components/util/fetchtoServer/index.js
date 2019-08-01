import BackgroundTimer from 'react-native-background-timer';

export default class Ftos{
    constructor(){
        this.url = "http://13.209.48.73:3000/";
        this.posDatas = [];
        this.Timer = null;
    }
    
    fetchhelper = function(urls, payloads){
        return fetch(urls,{
            method: "POST",
            body: JSON.stringify(payloads)
        });
    }

    loginRequest = function(payloads){
        console.log('access loginRequest');
        return this.fetchhelper(`${this.url}login`,payloads).then((data) => data.text());
    }

    joinRequest = function(payloads){
        console.log('access joinRequest');
        return this.fetchhelper(`${this.url}sign_up`,payloads).then((data) => data.text());
    }

    groupMakeRequest = function(payloads){
        console.log('access groupMakeRequest');
        return this.fetchhelper(`${this.url}create_group`,payloads).then((data) => data.text());
    }

    groupListRequest = function(payloads){
        console.log('access groupListRequest');
        return this.fetchhelper(`${this.url}group_list`,payloads).then((data) => data.json());
    }

    getCurposition = function(payloads){
        this.posDatas = []
        this.Timer = BackgroundTimer.setInterval(this.getPos,5000);
    }

    stopgetCurposition = function(payloads){
        BackgroundTimer.clearInterval(this.Timer);
        return this.posDatas;
    }

    getPos = () =>{
        console.log(this.posDatas);
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position);
                var check = { location : { latitude : position.coords.latitude, longitude: position.coords.longitude, timestamp: position.timestamp}}
                this.posDatas.push(check)
                console.log(this.posDatas);
              },error => console.log(error),
              {enableHighAccuracy: false, timeout: 30000, maximumAge: 6000}
        );
    }

    writePostRequest = () =>{
        console.log('access writePostRequest');
        return this.fetchhelper(`${this.url}group_list`,payloads).then((data) => data.json());
    }

    getPostListRequest = function(){
        console.log('access getPostListRequest');
        return this.fetchhelper(`${this.url}group_list`,{}).then((data) => data.json());
    }

    writePostRequest = function(payloads){
        console.log('access writePostRequest');
        return this.fetchhelper(`${this.url}post_post`,payloads).then((data)=>data.text());
    }
    
    


}