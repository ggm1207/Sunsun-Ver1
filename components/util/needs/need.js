
function tS2time(timestamp){
    return new Date(timestamp).toString()
}

function getCurTime(){
    return + new Date()
}

function ts2mmss(timestamp){
    return new Date(timestamp).toString().slice(16,21)
}

function addIndex2Image(payload){
    var selected = payload.selected;
    var sTime = payload.sTime;
    var eTime = payload.eTime;
    var posDatas = payload.posDatas;
    var imagedatas = []
    for (let i = 0; i < selected.length; i++){
        selected[i].timestamp = selected[i].timestamp * 1000;
        console.log(sTime,selected[i].timestamp,eTime);
        console.log(sTime <= selected[i].timestamp, selected[i].timestamp <= eTime);
        if (sTime <= selected[i].timestamp && selected[i].timestamp <= eTime){
            // console.log(sTime,selected[i].timestamp, eTime);
            let index = Math.floor((selected[i].timestamp - sTime - 5000)/5000,1);
            // selected[i]['index'] = index;
            imagedatas.push({uri: selected[i].uri, location : posDatas[index].location})
            // sTime + 5 부터 좌표 찍힘
        }
        console.log(i);
    }
    console.log(imagedatas);
    return imagedatas;
}

export default { getCurTime, tS2time, addIndex2Image, ts2mmss };