import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Platform, Image, BackHandler } from 'react-native';
import MapView, { PROVIDER_GOOGLE , Polyline } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
WIDTH = Dimensions.get('window').width;
type Props = {};
export default class Home extends Component<Props> {
    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        this.props.checkInGroups();
        return true;
    }
    render() {
        const { userData, groupData } = this.props;
        var level = Math.floor(userData.exp/100);
        var exp = userData.exp % 100;
        return (
            <View style={styles.container}>
                <View style={styles.profilecontainer}>
                    <View style = {styles.profileup}>
                        <View style = {styles.profile}>
                            <Image
                                style = {{width:WIDTH*0.16, height:WIDTH*0.16}}
                                source = {require('../../assets/1.jpg')}
                            />
                        </View>
                        <View style = {styles.profilein}>
                            <Text style ={{fontSize:WIDTH*0.07}}>{userData.u_id}</Text>
                            <View style = {{flexDirection:'row', marginLeft:3 ,alignItems:'center'}}>
                                <Text style={{fontSize:WIDTH*0.03, color:'#a6a6a6'}}>Friends</Text> 
                                <Text style={{fontSize:WIDTH*0.03}}> 0 </Text> 
                            </View>
                        </View>
                    </View>
                    <View style = {styles.profiledown}>
                        <View style = {{flexDirection:'row', padding:1, alignItems:'flex-end'}}>
                            <Text style ={{fontSize:10,color:'#a5a5a5',paddingBottom:2}}> Group</Text>
                            <Text style ={{fontSize:16}}> {` ${groupData.groupLine} line`}  </Text>
                            <Text style = {{fontSize:16,color:'#a5a5a5'}}>|</Text>
                            <Text style = {{fontSize:16}}> {`  ${groupData.groupKm} km`}</Text>
                        </View>
                        <View style = {{flexDirection:'row', padding:1, alignItems:'flex-end', width:'100%',justifyContent:'space-between'}}>
                            <View style = {{flexDirection:'row', alignItems:'flex-end'}}>
                                <Text style ={{fontSize:10,color:'#a5a5a5',paddingBottom:2}}> Me      </Text>
                                <Text style ={{fontSize:16}}> {` ${userData.line} line`}  </Text>
                                <Text style = {{fontSize:16,color:'#a5a5a5'}}>|</Text>
                                <Text style = {{fontSize:16}}> {`  ${userData.km} km`}</Text>
                            </View>
                            <View style ={{justifyContent:'flex-end',alignItems:'center'}}>
                                <Text style = {{color:'#34abd6'}}>{`LV. ${level}`}</Text>
                            </View>
                        </View>
                        <View style = {{backgroundColor:'#cfcfcf', width:'100%', height:15, marginTop:8, borderRadius:15, overflow:'hidden'}}>
                            <LinearGradient
                                colors = {['#74f2ed','#5fa6d9','#214580']}
                                style = {{flex:1, width:`${exp}%`}}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            >
                            </LinearGradient>
                        </View>
                    </View>
                </View>                
                <View style={styles.descriptionContainer}>
                    <Text style={styles.overlay}>  우리의 선  </Text>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                        latitude: 37.869510,
                        longitude: 127.743027, // 원점인 느낌
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                        }}
                    >
                        <Polyline
                            coordinates={[
                                { latitude: 37.868609, longitude: 127.736812 },
                                { latitude: 37.866738, longitude: 127.738242 },
                                { latitude: 37.867741, longitude: 127.740188 },
                                { latitude: 37.869215, longitude: 127.742412 },
                                { latitude: 37.870328, longitude: 127.744020 },
                                { latitude: 37.872632, longitude: 127.744795 },
                                { latitude: 37.872224, longitude: 127.746463 },
                                { latitude: 37.871707, longitude: 127.747316 },
                                { latitude: 37.870453, longitude: 127.748766 }
                            ]}
                            strokeColor="#74f2ed" // fallback for when `strokeColors` is not supported by the map-provider
                            strokeWidth={4}
                        />
                    </MapView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    profilecontainer: {
        flex: 2,
        margin : 10,
        marginBottom: 0,
        borderBottomWidth : 0,
        borderRadius : 15,
        borderColor : '#ddd',
        shadowColor : '#000',
        shadowOffset : {width : 0, height : 2},
        shadowOpacity: 0.8,
        shadowRadius : 2,
        elevation: 1,
        backgroundColor: '#ffffff',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    descriptionContainer: {
        zIndex:0,
        flex : 5,
        height: "100%",
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        overflow: 'hidden'
    },
    overlay:{
        zIndex : 1,
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 8,
        color :'white',
        borderRadius: 4,
        opacity : 0.8,
        backgroundColor: '#34abd6',
    },
    profileup : {
        flex:1,
        flexDirection : 'row',
        marginLeft: WIDTH*0.2,
        marginRight: WIDTH*0.2,
        alignItems: 'center',
        justifyContent:'center',
    },
    profiledown : {
        flex:1,
        marginLeft: WIDTH*0.05,
        marginRight: WIDTH*0.05,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    profile : {
        borderRadius: 35,
        overflow : 'hidden',
    },
    profilein:{
        backgroundColor:'#ffffff',
        marginLeft:8,
        padding: 1,
        justifyContent:'center',
    }
})