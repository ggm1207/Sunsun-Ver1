import React, {Component} from 'react';
import { StyleSheet, View , Text, Platform, TouchableOpacity, Image, StatusBar} from 'react-native';
import { GPOPUP } from './popup/gpopup';
import Mpopup from '../Mpopup';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

type Props = {};
export default class Tab1 extends Component<Props> {
    render(){
      const { 
        groupAddVisible, 
        pushGroupAddButton, 
        deleteGroupAddDialog, 
        changeText, 
        groupMakeRequest, 
        text1, userData, recBtn, 
        pushRecButton, groupData, inGroup } = this.props; 
      return(
            <View style = {styles.Tab}>
                <GPOPUP 
                  groupAddVisible = {groupAddVisible}
                  groupMakeRequest = {groupMakeRequest}
                  text1 = {text1}
                  userData = {userData}
                  deleteGroupAddDialog = {deleteGroupAddDialog}
                  changeText = {changeText}
                />
                <Mpopup />
                <View style = {styles.lefttab}>
                    <TouchableOpacity 
                    style={styles.recBtn}
                    activeOpacity={0.5}
                    onPress={()=> pushRecButton({recBtn:recBtn})}>
                    {recBtn ?
                    (
                    <Image
                        source={require('../../assets/stop_btn.png')}
                        style={styles.ImageIconStyle}
                    />):
                    (<Image
                        source={require('../../assets/drawable-xxhdpi/rec_btn.png')}
                        style={styles.ImageIconStyle}
                    />)}
                    
                    </TouchableOpacity>
                </View>
                <View style ={{flex:1, flexDirection:'row',justifyContent:'center', alignItems:'flex-end'}}>
                    <Image 
                    source={require('../../assets/drawable-hdpi/logo_symbol.png')}
                    style={styles.logoStyle}  
                    ></Image>
                    <Text style = {{fontSize:20, paddingBottom:8 }}> {groupData.groupName} </Text>
                    </View>
                <View style = {styles.righttab}>
                  {inGroup 
                  ? (<View></View>):
                  (
                    <TouchableOpacity 
                      style={styles.recBtn}
                      activeOpacity={0.5}
                      onPress={() => pushGroupAddButton()}>
                      <Image
                          source={require('../../assets/drawable-xhdpi/group_6.png')}
                          style={styles.ImageIconStyle}
                      />
                    </TouchableOpacity>
                  )}
                    
                    <TouchableOpacity 
                    style={styles.recBtn}
                    activeOpacity={0.5}
                    onPress={()=> alert('its works!')}>
                    <Image
                        source={require('../../assets/drawable-xxhdpi/097_user.png')}
                        style={styles.ImageIconStyle}
                        resizeMode="cover"
                    />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    dialogcontainer : {
      backgroundColor: 'white', 
      height:'95%' ,
      margin:10, 
      alignItems:'center', 
      borderRadius : 15,
      justifyContent:'center',
    },
    righttab:{
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    lefttab : {
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    Tab : {
      flexDirection : 'row',
      height : STATUSBAR_HEIGHT * 2,
      backgroundColor : 'white',
      borderWidth : 1,
      borderRadius : 2,
      borderColor : '#ddd',
      shadowColor : '#ddd',
      shadowOffset : {width : 0, height : 2},
      shadowOpacity:0.8,
      shadowRadius : 2,
      elevation : 1,
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    recBtn : {
      width : STATUSBAR_HEIGHT * 2,
      height : STATUSBAR_HEIGHT * 2,
      backgroundColor : 'transparent',
    },
    ImageIconStyle : {
      padding: 10,
      margin: 10,
      height: 30,
      width: 30,
      resizeMode: 'stretch',
    },
    logoStyle : {
      padding: 10,
      marginBottom: 10,
      height: 20,
      width: 30,
      resizeMode: 'stretch',
    },
  })