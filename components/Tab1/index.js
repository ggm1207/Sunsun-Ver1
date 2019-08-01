// container는 index 여기에 리덕스에 관련된 것을 다 넣고
// presenter는 데이터를 보여주기만 하면 됨. 리덕스 작업은 노노

import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import Tab1 from './presenter';
import {group_ac} from '../../reducers';

function mapStateToProps(state){
// 스토어에서 state을 복사해서 컨테이너의 props에 붙여넣기
    const { groupAddVisible, text1, text2, userData, recBtn, groupData, inGroup, postData } = state;
    return {
        groupAddVisible,
        text1,
        text2,
        userData,
        recBtn,
        groupData,
        inGroup,
        postData
    };
}
// action을 reducer 로 보내는 친구  그러므로 reducer file 에 있는 action과 얘를 묶어야함
function mapDispathToProps(dispatch){
    return {
        pushGroupAddButton : bindActionCreators(group_ac.pushGroupAddButton, dispatch),
        deleteGroupAddDialog : bindActionCreators(group_ac.deleteGroupAddDialog, dispatch),
        changeText : bindActionCreators(group_ac.changeText, dispatch),
        groupMakeRequest : bindActionCreators(group_ac.groupMakeRequest, dispatch),
        pushRecButton : bindActionCreators(group_ac.pushRecButton, dispatch),
        stopRecButton : bindActionCreators(group_ac.stopRecButton, dispatch),
    };
}

export default connect(mapStateToProps, mapDispathToProps)(Tab1);
