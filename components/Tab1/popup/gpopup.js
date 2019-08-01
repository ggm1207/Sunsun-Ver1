// group add popup
import React from 'react';
import { StyleSheet, View , TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import PopupDialog, {
    DialogTitle,
    SlideAnimation,
} from 'react-native-popup-dialog';
  
const slideAnimation = new SlideAnimation({ slideFrom : 'top'});

function GPOPUP ({groupAddVisible, changeText ,groupMakeRequest, text1, userData, deleteGroupAddDialog }){
    return(
        <PopupDialog
                width = {0.8}
                height = {0.6}
                visible = {groupAddVisible}
                animationDuration ={100}
                dialogTitle={<DialogTitle title="그룹 생성/참가" />}
                ref={slideAnimationDialog => {
                this.slideAnimationDialog = slideAnimationDialog;
                }}
                dialogAnimation={slideAnimation}
                >    
            <View style={styles.container}>
                <View style = {styles.dialogContentView}>
                <TextInput
                    style = {styles.Text}
                    placeholder='Group Name'
                    placeholderTextColor={'rgba(150,150,150,0.8)'}
                    onChangeText={val => changeText({field:0 ,key:'text1', val:val})}/>
                <Button 
                    buttonStyle={{backgroundColor:'transparent'}}
                    onPress = {() => groupMakeRequest({u_id : userData.u_id ,g_name : text1})}
                    title = 'Make'/>
                </View>
                <View style={styles.dialogContentView}>
                <TextInput
                    style = {styles.Text}
                    placeholder='Group ID'
                    placeholderTextColor={'rgba(150,150,150,0.8)'}
                    onChangeText={val => changeText({field:0 ,key:'text2', val:val})}/>
                <Button
                    buttonStyle={{backgroundColor:'transparent'}}
                    title = 'Join'/>
                </View>
                <Button
                    title="Close"
                    containerStyle={{backgroundColor:'transparent'}}
                    buttonStyle={{backgroundColor:'transparent'}}
                    titleStyle={{color:'black'}}
                    onPress={() => deleteGroupAddDialog()}
                />
            </View>
        </PopupDialog>
    );}

// 경로데이터를 받는다... 끝?


const styles = StyleSheet.create({
    container : {
      flexDirection : 'column',
      justifyContent : 'center',
      height : '60%',
      backgroundColor : 'white',
    },
    dialogcontainer : {
        backgroundColor: 'white', 
        height:'95%' ,
        margin:10, 
        alignItems:'center', 
        borderRadius : 15,
        justifyContent:'center',
    },
    dialogContentView: {
      backgroundColor : '#d9d9d9',
      flexDirection : 'row',
      borderRadius: 10,
      borderColor: '#ddd',
      alignItems : 'center',
      height : 40,
      justifyContent : 'space-between',
      borderWidth: 1,
      marginTop : 7,
      paddingLeft : 15,
      paddingRight : 10,
    },        
    Text : {
        height : 40,
        width : '80%'
    },
})

export { GPOPUP };