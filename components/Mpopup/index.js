// container는 index 여기에 리덕스에 관련된 것을 다 넣고
// presenter는 데이터를 보여주기만 하면 됨. 리덕스 작업은 노노

import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import Mpopup from './presenter';
import {map_ac} from '../../reducers';

function mapStateToProps(state){
// 스토어에서 state을 복사해서 컨테이너의 props에 붙여넣기
    const { postData, mpopupVisible, selectphotos, userData, 
        checkGroupVisible, groupList } = state;
    return {
        postData,
        mpopupVisible,
        selectphotos,
        userData,
        checkGroupVisible,
        groupList,
    };
}
// action을 reducer 로 보내는 친구  그러므로 reducer file 에 있는 action과 얘를 묶어야함
function mapDispathToProps(dispatch){
    return {
        addIndex2Image : bindActionCreators(map_ac.addIndex2Image, dispatch),
        changeText : bindActionCreators(map_ac.changeText, dispatch),
        pushSelectedButton : bindActionCreators(map_ac.pushSelectedButton, dispatch),
        completePosting : bindActionCreators(map_ac.completePosting, dispatch),
        checkGroupInGroupList : bindActionCreators(map_ac.checkGroupInGroupList, dispatch),
        addGroup2GroupList : bindActionCreators(map_ac.addGroup2GroupList, dispatch),
    };
}

export default connect(mapStateToProps, mapDispathToProps)(Mpopup);
