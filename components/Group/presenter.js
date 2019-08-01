import React, {Component} from 'react'
import {View, Text, Image, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
type Props = {};
export default class Group extends Component<Props> {
    // componentWillReceiveProps(nextProps){ // component 가 새로운 props 를 받아올 때 마다 실행
    //     const currentProps = this.props;
    //     if(!currentProps.isPlaying && nextProps.isPlaying){
    //         const timerInterval = setInterval(() => {
    //             currentProps.addSecond()
    //         }, 1000);
    //         this.setState({
    //             timerInterval
    //         });
    //     } else if(currentProps.isPlaying && !nextProps.isPlaying){
    //         clearInterval(this.state.timerInterval);
    //     }
    // }

    listitem = (item) => {
        return (
            <View style = {{flexDirection:'row', margin:10}}>
                <View style = {styles.descriptionContainer}>
                    <Image
                        style = {{width:50, height:50}}
                        source = {require('../../assets/drawable-xxhdpi/logo_symbol.png')}
                    />
                </View>
                <View style = {{flex:1, flexDirection:'column',justifyContent:'center'}}>
                    <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:18, paddingLeft:10,}}>{item.G_NAME}</Text>
                            <Text style={{fontSize:10, paddingLeft:5}}> {item.G_USERNUM}</Text>
                        </View>
                        <View style ={{justifyContent:'flex-start', paddingTop:4}}>
                            <Text style={{fontSize:10, color:'#a5a5a5'}}> {item.G_TIME} </Text>
                        </View>
                    </View>
                    <View style ={{flexDirection: 'row',justifyContent:'space-between'}}>
                        <Text style ={{paddingLeft:10, color:'#a5a5a5'}}> {item.G_TEXT}</Text>
                    </View>
                </View>
            </View>
        )
    }
    
    render(){
        // data props
        const { groupList, moveToGroup } = this.props;
        return(
            <FlatList
                data = {groupList}
                // initialNumToRender={20}
                // onEndReachedThreshold={1}
                // onEndReached={this.onEndReached}
                // refreshing={this.state.refreshing}
                // onRefresh={this.onRefresh}
                keyExtractor = {item => String(item.G_ID)} // 나중에 hash 값으로 변경
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => moveToGroup({G_ID : String(item.G_ID), G_NAME : item.G_NAME})}
                    >
                        {this.listitem(item)}
                    </TouchableOpacity>
                    )
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    uplayout : {
        flex : 1,
        flexDirection : 'row',
        backgroundColor : 'red',
        alignItems : 'flex-end',
    },
    descriptionContainer: {
        borderRadius : 25,
        overflow: 'hidden'
    },
    downlayout : {
        flex : 8,
        flexDirection : 'column',
        backgroundColor : 'green'
    }
    
})