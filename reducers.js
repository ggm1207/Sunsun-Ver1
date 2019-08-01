// Import
import NavigationService from './NavigationService.js';
import need from './components/util/needs/need.js';
const delay = (ms) => new Promise(res => setTimeout(res, ms))

// Actions // switch 에서 사용할 variable 생성

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const CHANGE_TEXT = 'CHANGE_TEXT';
const JOIN_SUCCESS = 'JOIN_SUCCESS';
const JOIN_FAIL = 'JOIN_FAIL';
const JOIN_REQUEST = 'JOIN_REQUEST';

const START_RECBTN = 'START_RECBTN';
const STOP_RECBTN = 'STOP_RECBTN';
const PUSH_RECBTN = 'PUSH_RECBTN';
const IN_GROUP = 'IN_GROUP';

const MOVE_TO_GROUP = 'MOVE_TO_GROUP';
const GROUPLIST_ADD = 'GROUPLIST_ADD';
const GROUP_PUSH = 'GROUP_PUSH';
const GROUP_MAKE_REQUEST = 'GROUP_MAKE_REQUEST';
const PUSH_GROUPADD_BUTTON = 'PUSH_GROUPADD_BUTTON';
const DELETE_GROUPADD_DIALOG = 'DELETE_GROUPADD_DIALOG';

const ADD_GROUP2GROUPLIST = 'ADD_GROUP2GOUPLIST';
const ADD_INDEX_2_IMAGE = 'ADD_INDEX_2_IMAGE';
const GET_SELECTED_IMAGE = 'GET_SELECTED_IMAGE';
const PUSH_SELECTED_BUTTON = 'PUSH_SELECTED_BUTTON';
const COMPLETE_POSTING = 'COMPLETE_POSTING';
const MISSION_COMPLETE = 'MISSION_COMPLETE';
const CHECK_GROUP_IN_GROUPLIST = 'CHECK_GROUP_IN_GROUPLIST';
// Actions Creators
// function programing 모든게 다 function!

export function missionComplete(){
    return {
        type : MISSION_COMPLETE
    }
}

export function addGroup2GroupList(payload){
    return {
        type: ADD_GROUP2GROUPLIST,
        payload: payload
    }
}

export function checkGroupInGroupList(){
    return {
        type : CHECK_GROUP_IN_GROUPLIST
    }
}

export function completePosting(payload, id, gIndexList){
    return {
        type : COMPLETE_POSTING,
        payload : payload,
        u_id : id,
        gIndexList : gIndexList,
    }
}

export function addIndex2Image(payload, posDatas, sTime, eTime){
    return {
        type : ADD_INDEX_2_IMAGE,
        payload : payload,
        posDatas: posDatas,
        sTime : sTime,
        eTime : eTime,
    }
}

export function pushSelectedButton(){
    return {
        type : PUSH_SELECTED_BUTTON
    }
}

export function getSelectedImage(payload){
    return {
        type : GET_SELECTED_IMAGE,
        payload : payload
    }
}

export function checkInGroups(){
    return {
        type : IN_GROUP
    }
}

export function startRecButton(){
    return {
        type : START_RECBTN
    }
}

export function stopRecButton(){
    return {
        type : STOP_RECBTN
    }
}

export function pushRecButton(payload){
    return {
        type : PUSH_RECBTN,
        payload: payload,
    }
}

export function moveToGroup(payload){
    return {
        type : MOVE_TO_GROUP,
        payload : payload
    }
}

export function groupPush(){
    return {
        type : GROUP_PUSH
    }
}

export function groupMakeRequest(payload){
    return {
        type : GROUP_MAKE_REQUEST,
        payload : payload
    }
}

export function deleteGroupAddDialog(){
    return{
        type : DELETE_GROUPADD_DIALOG
    }
}

export function pushGroupAddButton(){
    return{
        type : PUSH_GROUPADD_BUTTON
    }
}

export function loginRequest(payload){
    return{
        type : LOGIN_REQUEST,
        payload : payload
    }
}
export function joinSuccess(){
    return{
        type : JOIN_SUCCESS
    }
}
export function joinFail(){
    return{
        type : JOIN_FAIL
    }
}
export function joinRequest(payload){
    console.log(payload);
    return{
        type : JOIN_REQUEST,
        payload : payload
    }
}
export function changeText(payload){
    return{
        type : CHANGE_TEXT,
        payload : payload
    }
}

// Reducer // 리덕스의 장점은 INITIAL STATE 이라는 것을 만들 수 있다.
// Reducer 는 function 일 뿐이야. 언제나 리듀서는 state을 갖게된다.
// state을 안주면, 디폴트로 initial state으로 시작

const initialState = {
    userData : {
        photo : require('./assets/defaultprofile.png'),
        u_id : 'ggm',
        pw : '123',
        name : '',
        age : '',
        email : '',
        area : '',
        line : '0',
        km : '0',
        exp : 390,
    },
    groupData : {
        groupId : '',
        groupName : 'Group List',
        groupLine : '0',
        groupKm : '0',
    },
    // G_ID, G_NAME,
    groupList : [],
    timeLineList : [
        {
            index : '1',
            posDatas : [
                { latitude: 37.868609, longitude: 127.736812 },
                { latitude: 37.866738, longitude: 127.738242 },
                { latitude: 37.867741, longitude: 127.740188 },
                { latitude: 37.869215, longitude: 127.742412 },
                { latitude: 37.870328, longitude: 127.744020 },
                { latitude: 37.872632, longitude: 127.744795 },
                { latitude: 37.872224, longitude: 127.746463 },
                { latitude: 37.871707, longitude: 127.747316 },
                { latitude: 37.870453, longitude: 127.748766 }
            ],
            YYMMDD : '2019.06.10',
            sTime : '13:50',
            eTime : '14:00',
            imagedatas : [],
            title : '선선 테스트 중~',
            description : '6월 10일 캡스톤 최종 보고서 제출!',
            name : '구건모',
        }, 
        {
            index : '2',
            posDatas : [
                { latitude: 37.868609, longitude: 127.736812 },
                { latitude: 37.866738, longitude: 127.738242 },
                { latitude: 37.867741, longitude: 127.740188 },
                { latitude: 37.869215, longitude: 127.742412 },
                { latitude: 37.870328, longitude: 127.744020 },
                { latitude: 37.872632, longitude: 127.744795 },
                { latitude: 37.872224, longitude: 127.746463 },
                { latitude: 37.871707, longitude: 127.747316 },
                { latitude: 37.870453, longitude: 127.748766 }
            ],
            YYMMDD : '2019.06.10',
            sTime : '13:40',
            eTime : '13:50',
            imagedatas : [], // uri , latitude, longitude
            title : '선선 테스트 중~',
            description : '6월 10일 캡스톤 최종 보고서 제출!',
            name : '구건모',
        },
    ],
    postData : {
        posDatas : [
            {location : { latitude: 37.866738, longitude: 127.738242 }},
            {location : { latitude: 37.868609, longitude: 127.736812 }},
            {location : { latitude: 37.867741, longitude: 127.740188 }},
            {location : { latitude: 37.869215, longitude: 127.742412 }},
            {location : { latitude: 37.870328, longitude: 127.744020 }},
            {location : { latitude: 37.872632, longitude: 127.744795 }},
            {location : { latitude: 37.872224, longitude: 127.746463 }},
            {location : { latitude: 37.871707, longitude: 127.747316 }},
            {location : { latitude: 37.870453, longitude: 127.748766 }}
        ],
        YYMMDD : '',
        sTime : '',
        eTime : '',
        imagedatas : [],
        title : '',
        description : '',
    },
    text1 : '',
    text2 : '',
    inGroup : false,
    recBtn : false,
    mpopupVisible : false,
    selectphotos : true,
    groupAddVisible : false,
    checkGroupVisible : false,
    isLogined : false,
}

function reducer(state = initialState, action) { // action을 보낼 때 마다 리덕스는 자동으로 리듀서를 실행할거야. 디폴트로
    switch (action.type) {
        case CHANGE_TEXT:
            return applyChangeText(state, action.payload);
        case IN_GROUP:
            return applyInGroup(state);
        case STOP_RECBTN:
            return applyStopRecBtn(state, action.payload);
        case START_RECBTN:
            return applyStartRecBtn(state);
        case GET_SELECTED_IMAGE:
            return applyGetSelectedImage(state, action.payload);
        case PUSH_SELECTED_BUTTON:
            return applyPushSelectedButton(state);
        case JOIN_FAIL:
            return applyJoinFail(state);
        case PUSH_GROUPADD_BUTTON:
            return applyPushGroupAddButton(state);
        case DELETE_GROUPADD_DIALOG:
            return applyDeleteGroupAddDialog(state);
        case GROUP_PUSH:
            return applyGroupPush(state, action.payload);
        case GROUPLIST_ADD:
            return applyGroupListAdd(state, action.payload);
        case MOVE_TO_GROUP:
            return applyMoveToGroup(state, action.payload);
        case CHECK_GROUP_IN_GROUPLIST:
            return applyCheckGroupInGroupList(state);
        case ADD_GROUP2GROUPLIST:
            return applyAddGroup2GroupList(state,action.payload);
        case MISSION_COMPLETE:
            return applyMissionComplete(state);
        default:
            return state;
    }
}

function applyMissionComplete(state){
    return {
        ...state,
        checkGroupVisible : false,
    }
}

function applyAddGroup2GroupList(state, payload){
    var index = state.groupList.indexOf(payload);
    const newGroupList = JSON.parse(JSON.stringify(state.groupList));
    newGroupList[index].selected = !newGroupList[index].selected;
    return {
        ...state,
        groupList : newGroupList
    }
}

function applyCheckGroupInGroupList(state){
    return {
        ...state,
        mpopupVisible : false,
        checkGroupVisible : true,
    }
}

// Reducer Functions
function applyPushSelectedButton(state){
    return {
        ...state,
        selectphotos : false,
    }
}
function applyGetSelectedImage(state, payload){
    // height, uri, width, timestamp, index
    console.log(payload)
    return {
        ...state,
        postData : {
            ...state.postData,
            imagedatas : payload
        }
    }
}


function applyInGroup(state){
    console.log('applyInGroup starting');
    NavigationService.navigate('GROUPLIST',{})
    return {
        ...state,
        inGroup : false,
        groupData : {
            ...state.groupData,
            groupName : 'Group List'
        }
    }
}
function applyStartRecBtn(state){
    var time = need.getCurTime()
    var data = need.tS2time(time).slice(0,15)
    return {
        ...state,
        recBtn : true,
        postData : {
            ...state.postData,
            posDatas : [],
            sTime : time,
            YYMMDD : data
        }
    }
}

function applyStopRecBtn(state, posDatas){
    var time = need.getCurTime()
    // timestamp
    return {
        ...state,
        recBtn : false,
        mpopupVisible : true,
        postData : {
            ...state.postData,
            posDatas : posDatas,
            eTime : time
        }
    }
}

function applyMoveToGroup(state, payload){
    NavigationService.navigate('GROUPROOM',{})
    return {
        ...state,
        inGroup : true,
        groupData : {
            ...state.groupData,
            groupId : payload.G_ID,
            groupName : payload.G_NAME
        }
    }
}

function applyGroupListAdd(state, payload){
    var data = state.groupList.concat(payload);
    data.map(item =>(
        item['selected'] = false
    ))
    console.log(data);
    return {
        ...state,
        groupList : data,
    }
}

function applyGroupPush(state, payload){
    var tt = need.ts2mmss(need.getCurTime())
    var data = [{
        G_IMAGE : require('./assets/drawable-xxhdpi/logo_symbol.png'),
        G_ID : payload,
        G_NAME : state.text1,
        G_TEXT : '',
        G_USERNUM : 1,
        G_TIME : tt // timestamp
    }].concat(state.groupList)
    return{
        ...state,
        groupList : data,
        groupAddVisible : false,
    }
}

function applyPushGroupAddButton(state){
    return{
        ...state,
        groupAddVisible : true,
    }
}

function applyDeleteGroupAddDialog(state){
    return{
        ...state,
        groupAddVisible : false,
    }
}

function applyJoinFail(state){
    alert('Join failed..')
    return {
        ...state,
        userData : {
            ...state.userData,
            u_id : '',
        }
    };
}


function applyChangeText(state, payload){
    // 1 : userData
    // 2 : groupData
    console.log(payload);
    switch(payload.field){
        case 0:
            return {
                ...state,
                [payload.key] : payload.val}
        case 1:
            return {
                ...state,
                userData : {
                    ...state.userData,
                    [payload.key] : payload.val}}
        case 2:
            return {
                ...state,
                groupData : {
                    ...state.groupData,
                    [payload.key] : payload.val}
                }
        case 3:
            return {
                ...state,
                postData : {
                    ...state.postData,
                    [payload.key] : payload.val}
                }
    }
}

// Export Action Creators

const login_ac = {
    changeText,
    loginRequest,
    joinRequest,
}

const group_ac = {
    pushGroupAddButton,
    deleteGroupAddDialog,
    changeText,
    groupMakeRequest,
    groupPush,
    moveToGroup,
    pushRecButton,
    stopRecButton,
    checkInGroups,
}

const map_ac = {
    getSelectedImage,
    pushSelectedButton,
    changeText,
    addIndex2Image,
    completePosting,
    checkGroupInGroupList,
    addGroup2GroupList
}


// Export Reducer

export {login_ac, group_ac, map_ac};
export default reducer;