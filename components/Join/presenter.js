import React, {Component} from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Text
} from 'react-native';
import { Button } from 'react-native-elements';
type Props = {};

export default class Join extends Component<Props> {
  render() {
    console.log('ID:', this.props);
    const {changeText,joinRequest, userData } = this.props;
    return (
    <View style = {styles.container}>
        <Text style = {styles.LOGIN}> J O I N</Text>
        <View style = {{backgroundColor:'#34abd6', width:'100%', }}>
            <TextInput
                value = {userData.u_id}
                style = {styles.Text}
                placeholder='아이디'
                placeholderTextColor={'rgba(150,150,150,0.8)'}
                onChangeText={val => changeText({field : 1 ,key: 'u_id', val:val})} />
        </View>
        <View style = {{backgroundColor:'#34abd6', width:'100%', }}>
            <TextInput
                value = {userData.pw}
                style = {styles.Text}
                placeholder='비밀번호'
                secureTextEntry = {true}
                placeholderTextColor={'rgba(150,150,150,0.8)'}
                onChangeText={val => changeText({field : 1 ,key: 'pw', val:val})} />
        </View>
        <View style = {{backgroundColor:'#34abd6', width:'100%', }}>
            <TextInput
                value = {userData.name}
                style = {styles.Text}
                placeholder='이름'
                placeholderTextColor={'rgba(150,150,150,0.8)'}
                onChangeText={val => changeText({field : 1 ,key: 'name', val:val})} />
        </View>
        <View style = {{backgroundColor:'#34abd6', width:'100%', }}>
            <TextInput
                value = {userData.age}
                style = {styles.Text}
                placeholder='나이'
                placeholderTextColor={'rgba(150,150,150,0.8)'}
                onChangeText={val => changeText({field : 1 ,key: 'age', val:val})} />
        </View>
        <View style = {{backgroundColor:'#34abd6', width:'100%', }}>
            <TextInput
                value = {userData.email}
                style = {styles.Text}
                placeholder='이메일'
                placeholderTextColor={'rgba(150,150,150,0.8)'}
                onChangeText={val => changeText({field : 1 ,key: 'email', val:val})} />
        </View>
        <View style = {{backgroundColor:'#34abd6', width:'100%', }}>
            <TextInput
                value = {userData.area}
                style = {styles.Text}
                placeholder='지역'
                placeholderTextColor={'rgba(150,150,150,0.8)'}
                onChangeText={val => changeText({field : 1 ,key: 'area', val:val})} />
        </View>

        <Button
            containerStyle = {styles.LOGINBUTTON}
            buttonStyle={{backgroundColor:'transparent', width:'100%'}}
            title="회원가입" 
            onPress = {() => joinRequest({u_id:userData.u_id, pw:userData.pw, name:userData.name,age:userData.age,email:userData.email,area:userData.area})}
        />
      </View>

    )
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
        justifyContent : 'flex-start',
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
        
        borderRadius : 7,
        borderWidth : 1,
        borderColor : '#34abd6',
        alignItems:'center',
        justifyContent:'center',
    }
})