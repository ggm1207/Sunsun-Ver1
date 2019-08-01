import React from 'react';
import {
createSwitchNavigator,
createStackNavigator,
createMaterialTopTabNavigator,
createAppContainer,
} from 'react-navigation'
import {Platform} from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

////
import Home from '../Home';
import Chat from '../Chat';
import Timeline from '../Timeline';
///
import Group from '../Group';
import Tab1 from '../Tab1';
    
import Login from '../Login';
import Join from '../Join';
import Tutorial from '../Tutorial';
////
    
    
const SubNavigator = createStackNavigator({
TUTORIAL : {
    screen : Tutorial,
    navigationOptions: {
        tabBarLable: 'TUTORIAL',
    }
},
LOGIN : {
    screen : Login,
    navigationOptions: {
        tabBarLable: 'LOGIN',
    }
},
JOIN : {
    screen : Join, 
    navigationOptions: {
        tabBarLable: 'JOIN',
    }
},
},
    {
        initialRouteName: "TUTORIAL",
        headerMode:"none",
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    }
)

const AppTabNavigator = createMaterialTopTabNavigator({
    HOME : {
        screen:Home,
        navigationOptions:{
          tabBarLabel : 'HOME',
          tabBarIcon:({tintColor}) =>
          <Entypo color={tintColor} size = {24} name = "home"/>
        }
        
      },
      CHAT : {
        screen:Chat,
        navigationOptions:{
          tabBarLabel : 'CHAT',
          tabBarIcon:({tintColor}) =>
          <Entypo color={tintColor} size = {24} name = "chat"/>
        }
        
      },
      TIMELINE : {
        screen:Timeline,
        navigationOptions:{
          tabBarLabel : 'TIMELINE',
          tabBarIcon:({tintColor}) =>
          <MaterialIcons color={tintColor} size = {24} name = "timeline"/>
            }
        }
    }, {
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPosition: "bottom",
        tabBarOptions: {
            style: {
            ...Platform.select({
                ios:{
                backgroundColor:'#ffffff',
                },
                android:{
                backgroundColor:'#ffffff'
                }
            }),
            height : 45,
            },
            activeTintColor: '#34cfff',
            activeBackgroundColor : '#ffffff',
            inactiveTintColor : 'gray',
            inactiveBackgroundColor : '#ffffff',
            // upperCaseLabel: false,
            showLabel: false,
            showIcon: true,
        }
});

const GroupNavigator = createStackNavigator({
    GROUPLIST : {
        screen : Group,
        navigationOptions: ({ navigation }) => ({
            tabBarLable: 'GROUPLIST',
            header: <Tab1/>,
        }),
    },
    GROUPROOM : {
        screen : AppTabNavigator,
        navigationOptions: ({ navigation }) => ({
            tabBarLable: 'GROUPROOM',
            header: <Tab1/>,
        }),
    },
},
{
    initialRouteName : 'GROUPLIST',
}
)

const MainNavigator = createSwitchNavigator({
    BEFORE : {
        screen : SubNavigator,
        navigationOptions: ({ navigation }) => ({
            tabBarLable: 'BEFORE',
            header: null,
        }),
    },
    AFTER : {
        screen : GroupNavigator,
        navigationOptions: ({ navigation }) => ({
            tabBarLable: 'AFTER',
            header: null,
        }),
    },
})

const finalNavigator = createAppContainer(MainNavigator);

export default finalNavigator;