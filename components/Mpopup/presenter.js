import React , { Component }from 'react';
import { StyleSheet, View , TextInput, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import ClusteredMapView from 'react-native-maps-super-cluster';
import { Polyline, Marker } from 'react-native-maps';
import PopupDialog, {
    SlideAnimation,
} from 'react-native-popup-dialog';
import CameraRollPicker from 'react-native-camera-roll-picker';
import AntDesign from "react-native-vector-icons/AntDesign";
import need from '../util/needs/need.js';

const slideAnimation1 = new SlideAnimation({ slideFrom : 'bottom'});
const slideAnimation2 = new SlideAnimation({ slideFrom : 'top'});
const imagepath = require('../../assets/1.jpg')

type Props = {};
export default class Mpopup extends Component<Props>{
    listitem = (item) => {
        const { addGroup2GroupList } = this.props;
        return (
            <TouchableOpacity
                onPress = {()=>addGroup2GroupList(item)}
            >
                <View style = {[{flexDirection:'row', padding:15,borderBottomWidth:1, borderBottomColor:'#34abd6'}, item.selectedClass]}>
                    <View style = {{flex:1, flexDirection:'column',justifyContent:'center'}}>
                        <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                            <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:18, paddingLeft:10,}}>{item.G_NAME}</Text>
                                <Text style={{fontSize:10, paddingLeft:5}}> {item.G_USERNUM}</Text>
                            </View>
                            <View style ={{justifyContent:'flex-start', paddingTop:4}}>
                                {item.selected ? 
                                (<AntDesign name='check' size={18} color={'#000000'}/>):
                                (<View/>)}
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderCluster = (cluster, onPress) => {
        const pointCount = cluster.pointCount,
            coordinate = cluster.coordinate,
            clusterId = cluster.clusterId,
            uri = cluster.uri.uri
            
        console.log(coordinate);
        console.log(uri);
        
        // const clusteringEngine = this.map.getClusteringEngine()        
        return (
            <Marker identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress}>
            <Text style={styles.overlay2}>{pointCount}</Text>
                <View style = {styles.mvstyle}>
                    <Image source={{uri : uri}} style={styles.mistyle} />
                </View>
            </Marker>
          )
        }

    renderMarker = (data) => 
    <Marker 
        key={data.id || Math.random()} 
        coordinate={data.location}>
        <View style = {styles.mvstyle}>
            <Image source={{uri : data.uri}} style={styles.mistyle} />
        </View>
    </Marker>

    render(){
        console.log(this.props.postData)
        const { 
            postData , 
            mpopupVisible, 
            selectphotos, 
            changeText,
            pushSelectedButton,
            addIndex2Image,
            completePosting,
            groupList,
            userData,
            checkGroupInGroupList,
            checkGroupVisible} = this.props;
        posData = postData.posDatas.map((e) => ({
            latitude : e.location.latitude, 
            longitude : e.location.longitude}
            ));
        console.log(posData);
        return(
            <View>
                <PopupDialog
                    width = {0.9}
                    height = {0.8}
                    visible = {mpopupVisible} // mpopupVisible
                    dialogStyle = {{backgroundColor:'transparent'}}
                    animationDuration ={100}
                    ref={slideAnimationDialog => {
                    this.slideAnimationDialog = slideAnimationDialog;
                    }}
                    dialogAnimation={slideAnimation1}
                    >
                    <Text style={styles.overlay}>  오늘의 선  </Text>
                    <Text style={styles.overlay1}> {postData.YYMMDD} {need.ts2mmss(postData.sTime)}~{need.ts2mmss(postData.eTime)} </Text>
                    <View style = {styles.dialogcontainer1}>
                        <View style={styles.mapviewcontainer}>
                            <ClusteredMapView
                                style={{flex:1}}
                                data={postData.imagedatas}
                                initialRegion={{latitude: 37.868609, longitude: 127.742412,
                                    latitudeDelta: 0.01, longitudeDelta: 0.01}}
                                // ref={(r)=>{this.map = r}}
                                renderMarker={this.renderMarker}
                                renderCluster={this.renderCluster} 
                            >
                            <Polyline
                                coordinates ={posData}
                                strokeColor = "#26ABFF"
                                strokeWidth={10}
                            />
                            
                            </ClusteredMapView>
                            
                            {/* <MapView
                                // clustering = {true}
                                // clusterColor = '#000'
                                // clusterTextColor = '#fff'
                                // clusterBorderColor = '#fff'
                                // clusterBorderWidth = {4}
                                // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={styles.map}
                                region={{latitude: 37.868609, longitude: 127.742412,
                                    latitudeDelta: 0.01, longitudeDelta: 0.01}}
                            >
                            <Polyline
                                coordinates ={postData.posDatas}
                                strokeColor = "#964b00"
                                strokeWidth={6} 
                            />
                            {postData.imagedatas.map(marker => (
                                <Marker
                                    key = {marker.uri}
                                    coordinate = {postData.posDatas[marker.index]}
                                >
                                    <View style = {styles.mvstyle}>
                                        <Image source={{uri : marker.uri}} style={styles.mistyle} />
                                    </View>
                                </Marker>
                            ))}
                            </MapView> */}
                        </View>
                    {selectphotos ? // selectphotos
                    (<View style = {styles.dialogcontainer2}>
                        <CameraRollPicker
                            callback = {(data) => addIndex2Image(data,postData.posDatas,postData.sTime,postData.eTime)}
                            containerWidth = {300}
                            assetType = {"Photos"}
                            selectedMarker = {
                                <View style={[styles.selectedCircle]} >
                                    <AntDesign name='check' size={18} color={'#ffffff'} />
                                </View >
                            }
                        />
                        <Button
                                title="선택 완료"
                                containerStyle={{backgroundColor:'#34cfff', width:'95%', margin:0, }}
                                buttonStyle={{backgroundColor:'transparent'}}
                                titleStyle={{color:'white'}}
                                onPress={pushSelectedButton}
                        />
                    </View>
                    )
                    :(
                        <View style = {styles.dialogcontainer2}>
                            <View style={styles.titlecontainer}>
                                <TextInput
                                    style = {styles.Text}
                                    placeholder=' 제목'
                                    placeholderTextColor={'rgba(150,150,150,0.8)'}
                                    onChangeText={val => changeText({field:3 ,key:'title', val:val})}/>
                            </View>
                            <View style={styles.descriptioncontainer}>
                                <TextInput
                                    style = {styles.Text}
                                    placeholder=' 상세내용'
                                    placeholderTextColor={'rgba(150,150,150,0.8)'}
                                    onChangeText={val => changeText({field:3 ,key:'description', val:val})}/>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.5}
                            >
                                <Button
                                    title="글 쓰기"
                                    containerStyle={{backgroundColor:'#34cfff', width:'95%', margin: 0, }}
                                    buttonStyle={{backgroundColor:'transparent'}}
                                    titleStyle={{color:'white'}}
                                    onPress={() => checkGroupInGroupList()}
                                    />
                            </TouchableOpacity>
                        </View>
                        )}
                    </View>
                </PopupDialog>
                <PopupDialog
                    width = {0.9}
                    height = {0.8}
                    visible = {checkGroupVisible} // checkGroupVisible
                    dialogStyle = {{backgroundColor:'transparent'}}
                    animationDuration ={100}
                    ref={slideAnimationDialog => {
                    this.slideAnimationDialog = slideAnimationDialog;
                    }}
                    dialogAnimation={slideAnimation2}
                    >
                    <View style = {styles.dialogcontainer1}>
                        <FlatList
                            data = {groupList}
                            style = {{width: '90%'}}
                            keyExtractor={item=>String(item.G_ID)}
                            renderItem={({item})=>(
                                this.listitem(item)
                            )}
                        >
                        </FlatList>
                        <TouchableOpacity
                            activeOpacity={0.2}
                            title = "ddd"
                            >
                            <Button
                                title = "공유하기"
                                buttonStyle = {{width:'100%', marginBottom:10, backgroundColor:'#34abd6', borderRadius:13,}}
                                onPress = {()=> completePosting(postData, userData.u_id, groupList)}
                            />
                        </TouchableOpacity>
                    </View>
                </PopupDialog>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mvstyle : {
        backgroundColor:'white', 
        padding:3,
        borderRadius: 10,
    },
    mistyle : {
        width:50, 
        height:50,
        borderRadius:10, 
    },
    dialogcontainer1 : {
        backgroundColor: 'white', 
        height:'95%' ,
        margin:10, 
        alignItems:'center', 
        borderRadius : 15,
        justifyContent:'center',
    },
    dialogcontainer2 : {
        backgroundColor: 'white', 
        height:'37%',
        width : '100%',
        margin:10, 
        alignItems:'center', 
        borderRadius : 15,
        justifyContent:'center',
    },
    Text : {
        height : 38,
        width : '80%'
    },
    image : {
        width: 60,
        height: 60,
        alignSelf: "flex-end",
        borderRadius : 10,
        margin : 3,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    titlecontainer: {
        height: "15%",
        width : '95%',
        backgroundColor : 'white',
        borderColor : "#34abd6",
        borderWidth : 1,
        borderRadius: 7,
        marginTop : 0,
    },
    descriptioncontainer: {
        height: "65%",
        width : '95%',
        backgroundColor : 'white',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        marginTop : 7,
        marginBottom : 5,
    },
    mapviewcontainer: {
        zIndex:0,
        height: "46%",
        width : '95%',
        borderRadius: 25,
        borderColor: '#34cfff',
        borderWidth: 1,
        marginTop : 10,
        marginBottom : 10,
        overflow: 'hidden'
    },
    overlay:{
        zIndex : 1,
        flex: 1,
        position: 'absolute',
        left: 8,
        top: 20,
        color :'white',
        borderRadius: 4,
        backgroundColor: '#34cfff',
    },
    overlay1:{
        zIndex : 1,
        flex: 1,
        position: 'absolute',
        left: 80,
        top: 20,
        color :'#34cfff',
        borderRadius: 4,
        backgroundColor: 'transparent',
    },
    overlay2:{
        zIndex : 1,
        flex: 1,
        position: 'absolute',
        width : 15,
        height : 15,
        textAlign : 'center',
        fontSize : 10,
        left: 40,
        top: 5,
        color :'white',
        borderRadius: 5,
        backgroundColor: '#34cfff',
    },
    selectedCircle : {
        position: 'absolute',
        left: 73,
        top: 5,
        borderRadius: 6,
        backgroundColor: '#34cfff',
    }
})