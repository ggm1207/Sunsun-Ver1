import {put,call, takeEvery, takeLatest, all, fork} from 'redux-saga/effects'
import Ftos from './components/util/fetchtoServer'
import need from './components/util/needs/need.js';
import NavigationService from './NavigationService.js';
const delay = (ms) => new Promise(res => setTimeout(res, ms))

var f2s = new Ftos();

export function* loginRequestAsync(action){
    console.log('saga:', action)
    try {
        const data = yield call([f2s,f2s.loginRequest],action.payload)
        console.log('data:', data === '1');
        if (data === '1'){
            // 그룹 리스트 불러오기
            yield put({type:'GROUPLIST_REQUEST', payload: action.payload})
            NavigationService.navigate('GROUPLIST',{});
        } else {
            alert('login failed..')
        }
    } catch (e) {
        console.log(e)
        alert('login failed..')
    }
}

export function* watchLoginRequest(){
    yield takeLatest('LOGIN_REQUEST', loginRequestAsync)
}

export function* joinRequestAsync(action){
    // console.log('saga:', action)
    try {
        const data = yield call([f2s,f2s.joinRequest],action.payload)
        console.log(action.payload);
        if (data === '1'){
            NavigationService.navigate('GROUPLIST',{});
        } else {
            yield put({type:'JOIN_FAIL'})
        }
    } catch (e) {
        console.log(e)
        yield put({type:'JOIN_FAIL'})
    }
}
export function* watchJoinRequest(){
    yield takeLatest('JOIN_REQUEST', joinRequestAsync)
}

export function* groupMakeRequestAsync(action){
    // console.log('saga:', action)
    try { 
        const data = yield call([f2s,f2s.groupMakeRequest],action.payload)
        if (data === '0'){ // 그룹 생성 잘 되었을 때.. 그룹 리스트에 그룹 푸쉬..
            alert('AddGroup failed...')
        } else { // 실패시.. 다이얼로그
            yield put({type:'GROUP_PUSH', payload: data})
        }
    } catch (e) {
        console.log(e)
        alert('AddGroup failed...')
    }
}
export function* watchGroupMakeRequest(){
    yield takeLatest('GROUP_MAKE_REQUEST', groupMakeRequestAsync)
}

export function* groupListRequestAsync(action){
    // console.log('saga:', action)
    try { // json
        const data = yield call([f2s,f2s.groupListRequest],{u_id:action.payload.u_id})
        if (data === '0'){ // 실패시.. 다이얼로그
            alert('call grouLists failed...')
        } else {
            yield put({type:'GROUPLIST_ADD', payload: data})
        }
    } catch (e) {
        console.log(e)
        alert('call grouLists failed...')
    }
}
export function* watchGroupListRequest(){
    yield takeLatest('GROUPLIST_REQUEST', groupListRequestAsync)
}

export function* pushRecBtnAsync(action){
    var posDatas = [];
    console.log(action.payload.recBtn);
    try {
        if (action.payload.recBtn){
            posDatas = yield call([f2s,f2s.stopgetCurposition],{})
            yield put({type:'STOP_RECBTN', payload : posDatas})
        } else {
            yield call([f2s,f2s.getCurposition],{})
            console.log('postion started');
            yield put({type:'START_RECBTN'})
        }
    } catch(e){
        console.log(e)
        alert('pushRecBtnAsync failed...')
    }
}
export function* watchPushRecBtn(){
    yield takeLatest('PUSH_RECBTN', pushRecBtnAsync)
}

export function* addIndex2ImageAsync(action){
    var imagedatas = [];
    try {
        imagedatas = yield call(need.addIndex2Image,{selected : action.payload, posDatas : action.posDatas,sTime :action.sTime, eTime:action.eTime})
        console.log(imagedatas);
        yield put({type:'GET_SELECTED_IMAGE', payload: imagedatas})
    } catch(e){
        console.log(e)
        alert('ADD_INDEX_2_IMAGE failed...')
    }
}
export function* watchAddIndex2Image(){
    yield takeLatest('ADD_INDEX_2_IMAGE', addIndex2ImageAsync)
}

export function* completePostingAsync(action){
    var gList = [];
    action.gIndexList.map(item => (
        item.selected ?
        (gList.push(item.G_ID)):(gList)
    ))
    action.payload['id'] = action.u_id;
    action.payload['gList'] = gList;
    console.log(action.payload);
    action.payload['sTime'] = need.ts2mmss(action.payload.sTime);
    action.payload['eTime'] = need.ts2mmss(action.payload.eTime);
    console.log(action.payload);
    console.log(gList);
    try { // data is p_id
        const data = yield call([f2s,f2s.writePostRequest],action.payload);
        if (data === '0'){
            alert('completePosting failed');
            yield put({type:'MISSION_COMPLETE'})
        }
        else{
            yield put({type:'MISSION_COMPLETE'})
        }
    } catch(e){
        console.log(e)
        alert('completePosting failed...')
    }
}
export function* watchCompletePosting(){
    yield takeLatest('COMPLETE_POSTING', completePostingAsync)
}

export default function* rootSaga(){
    // 모든 Saga들을 한번에 시작하기 위한 단일 
    // entry point
    yield all([
        watchLoginRequest(),
        watchJoinRequest(),
        watchGroupMakeRequest(),
        watchGroupListRequest(),
        watchPushRecBtn(),
        watchAddIndex2Image(),
        watchCompletePosting(),
    ])// 두 제너레이터가 병렬로 시작된다는 것을 의미
}