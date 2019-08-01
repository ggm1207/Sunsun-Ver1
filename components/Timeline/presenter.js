import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Image,
  ActivityIndicator,
  Button,
  StatusBar,
  Platform,
  Dimensions
} from 'react-native';
import MapView, {Polyline, Marker} from 'react-native-maps';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

// const time1 = require('../../assets/timeline')

type Props = {};
export default class Mainview extends Component<Props> {
  constructor() {
    super()
    this.onEndReached = this.onEndReached.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.renderDetail = this.renderDetail.bind(this)
    //this.onEventPress = this.onEventPress.bind(this)
    //this.renderSelected = this.renderSelected.bind(this)
    
    this.state = {
      isRefreshing: false,
      waiting: false,
      data: this.data,
    }
  }

  onRefresh() {
    this.setState({ isRefreshing: true });
    //refresh to initial data
    setTimeout(() => {
      //refresh to initial data
      this.setState({
        data: this.data,
        isRefreshing: false
      });
    }, 2000);
  }

  onEndReached() {
    if (!this.state.waiting) {
      this.setState({ waiting: true });

      //fetch and concat data
      setTimeout(() => {

        //refresh to initial data
        var data = this.state.data.concat(
          [
            { time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline' },
            { time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline' },
            { time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline' },
            { time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline' },
            { time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline' }
          ]
        )

        this.setState({
          waiting: false,
          data: data,
        });
      }, 2000);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const vitalPropsChange = this.props !== nextProps;
    const vitalStateChange = this.state !== nextState;
    console.log(vitalPropsChange || vitalStateChange);
    return vitalPropsChange || vitalStateChange;
  }

  renderFooter() {
    if (this.state.waiting) {
      return <ActivityIndicator />;
    } else {
      return <Text>~</Text>;
    }
  }
  renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={styles.title}>{rowData.title}</Text>
    var desc = null

    console.log('renderDetail starting...');
    
    if (rowData.description && rowData.imageUrl)
      desc = (
        <View style={{ flex: 1 }}>
          <View style={styles.descriptionContainer}>
            <MapView
              style={styles.map}
              region={{
                latitude: 37.869510,
                longitude: 127.743027, // 원점인 느낌
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
            >
            </MapView>
          </View>
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View >
      )
    return (
      <View style={{ flex: 1 }}>
        {title}
        {desc}
      </View>
    )
  }

  // onEventPress(data) {
  //   this.setState({ selected: data })
  // }

  // renderSelected() {
  //   if (this.state.selected)
  //     return <Text style={{ marginTop: 10 }}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
  // }
  listitem = (item) => {
      return (
        <View style = {styles.timelineContainer}>
          <View style = {styles.userContinaer}> 
            <Image 
              style = {{width:50, height:50, borderRadius:35}}
              source = {require('../../assets/user.jpg')}
            />
            <View style = {{flex:1, flexDirection:'column', justifyContent:'center', marginLeft:10,}}>
              <Text style = {{
                color:'#000000',
                fontSize : 17,
              }}>{item.name}</Text>
              <Text>{item.YYMMDD} {item.sTime}~{item.eTime}</Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <MapView
                style={styles.map}
                region={{
                  latitude: 37.869510,
                  longitude: 127.743027, // 원점인 느낌
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
              <Polyline
                coordinates={item.posDatas}
                strokeColor="#74f2ed" // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={4}
              />
              <Marker
                  key = '1'
                  coordinate = {{ latitude: 37.868609, longitude: 127.736812 }}
              >
                  <View style = {styles.mvstyle}>
                      <Image source={require('../../assets/time1.jpg')} style={styles.mistyle} />
                  </View>
              </Marker>
              <Marker
                  key = '2'
                  coordinate = {{ latitude: 37.869215, longitude: 127.742412 }}
              >
                  <View style = {styles.mvstyle}>
                      <Image source={require('../../assets/time2.jpg')} style={styles.mistyle} />
                  </View>
              </Marker>
              <Marker
                  key = '3'
                  coordinate = {{ latitude: 37.870453, longitude: 127.748766 }}
              >
                  <View style = {styles.mvstyle}>
                      <Image source={require('../../assets/time3.jpg')} style={styles.mistyle} />
                  </View>
              </Marker>
              </MapView>
          </View>
          <View style = {styles.timelineDescription}>
            <Text style = {{margin:10}}>{item.description}</Text>
          </View>


        </View>
    )
  }

  render() {
    //'rgb(45,156,219)'
    const { timeLineList } = this.props;
    return (
      <FlatList
                data = {timeLineList}
                // initialNumToRender={20}
                // onEndReachedThreshold={1}
                // onEndReached={this.onEndReached}
                // refreshing={this.state.refreshing}
                // onRefresh={this.onRefresh}
                style = {{backgroundColor:"#a2a2a2", opacity : 0.8}}
                keyExtractor = {item => String(item.index)} // 나중에 hash 값으로 변경
                renderItem={({ item }) => (
                    <View style = {styles.container}>
                        {this.listitem(item)}
                    </View>
                    )
                }
            />
    );
  }
}

const styles = StyleSheet.create({
  timelineDescription : {
    backgroundColor: 'white',
    height : 150,
    width : '100%',
  },
  mvstyle : {
    backgroundColor:'white', 
    padding:3,
    borderRadius: 10,
  },
  mistyle : {
    width:70, 
    height:70,
    borderRadius:10, 
  },
  userContinaer : {
    padding : 10,
    flexDirection : 'row',
  },
  timelineContainer: {
    backgroundColor:'white', 
    width:'95%', 
    height:450, 
    marginLeft: 10,
    marginRight :10,
    marginBottom : 5,
    marginTop : 5,
    borderRadius : 5,
    borderWidth : 1,
    borderColor : '#a5a5a5'
  },
  title: {
    textAlign: 'left',
    justifyContent: 'flex-start',
    fontSize: 30,
  },
  container: {
    flex: 1,
    alignItems : 'center',
  },
  descriptionContainer: {
    width: '100%',
    height:'50%',
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
});