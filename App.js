import React, {Component} from 'react';
import {Text, View, Alert, PermissionsAndroid} from 'react-native';
import reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { Provider } from 'react-redux';
import FinalNavigator from './components/navigator/ab'
// import Main from './components/Main';
// import Join from './components/Join';
// import Login from './components/Login';
// import Group from './components/Group';
import TimeLine from './components/Timeline';
import NavigationService from './NavigationService';
import { Time } from 'react-native-gifted-chat';
// import Permissions from 'react-native-permissions';

const sagaMiddleware = createSagaMiddleware()

let store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Cool READ_EXTERNAL_STORAGE App READ_EXTERNAL_STORAGE Permission',
        message:
          'Cool Photo App needs access to your READ_EXTERNAL_STORAGE ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the READ_EXTERNAL_STORAGE');
    } else {
      console.log('READ_EXTERNAL_STORAGE permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

async function requestAccessFineLocation() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cool ACCESS_FINE_LOCATION App ACCESS_FINE_LOCATION Permission',
        message:
          'Cool Photo App needs access to your ACCESS_FINE_LOCATION ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the ACCESS_FINE_LOCATION');
    } else {
      console.log('ACCESS_FINE_LOCATION permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

sagaMiddleware.run(rootSaga)

type Props = {};
export default class App extends Component<Props> {
  componentDidMount(){
    requestCameraPermission()
    requestAccessFineLocation()
  }
  render() {
    return (
      <Provider store={store}>
        <FinalNavigator 
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}/>
        {/* <TimeLine /> */}
      </Provider>
    );
  }
}