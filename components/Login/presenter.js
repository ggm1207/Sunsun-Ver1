import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements'

type Props = {};
export default class Login extends Component<Props>{
    render() {
        const { changeText , loginRequest, userData } = this.props;
        return (
            <View style = {styles.container}>
                <Text style = {styles.LOGIN}> L O G I N </Text>
                <View style = {{backgroundColor:'#34abd6', width:'100%', }}>
                    <TextInput
                        style = {styles.Text}
                        placeholder='이메일'
                        placeholderTextColor={'rgba(150,150,150,0.8)'}
                        onChangeText={val => changeText({field : 1 ,key: 'u_id', val:val})}/>
                        {/* key */}
                </View>
                <View style = {{backgroundColor:'#34abd6', width:'100%', }}>
                    <TextInput
                        style = {styles.Text}
                        placeholder='비밀번호'
                        placeholderTextColor={'rgba(150,150,150,0.8)'}
                        secureTextEntry = {true}
                        onChangeText={val => changeText({field:1, key:'pw', val:val})} />
                </View>

                <Button
                    containerStyle = {styles.LOGINBUTTON}
                    buttonStyle={{backgroundColor:'transparent', width:'100%'}}
                    title="로그인"
                    onPress = {() => loginRequest({u_id: userData.u_id, pw: userData.pw})}
                />
                
            </View>
    );
  }
}

const styles = StyleSheet.create(    
{
  container : {
      flex:1,
      marginTop: "30%",
      marginBottom: "30%",
      marginLeft : "15%",
      marginRight: "15%",
      backgroundColor: 'white',
      alignItems : 'center',
      justifyContent : 'center',
  },
  LOGIN : {
      color : '#34abd6',
      fontSize : 30,
      marginBottom: 50,
  },
  Text : {
      backgroundColor: 'white',
      height : 38,
      marginBottom : 1,
  },
  LOGINBUTTON : {
      width:'100%',
      backgroundColor : '#34abd6',
      marginTop: 20,
      borderRadius : 7,
      alignItems:'center',
      justifyContent:'center',
  },
  JOINBUTTON : {
      width:'100%',
      backgroundColor : 'white',
      marginTop: 5,
      borderRadius : 7,
      borderWidth : 1,
      borderColor : '#34abd6',
      alignItems:'center',
      justifyContent:'center',
  }
})