import React, {Component} from 'react';
import { Ionicons } from 'react-native-vector-icons';
import { StyleSheet, View, Text, StatusBar, Image} from 'react-native';
import { Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: 'somethun',
        title: 'Quick setup, good defaults',
        text: 'React-native-app-intro-slider is easy to setup with a small footprint and no dependencies. And it comes with good default layouts!',
        icon: 'ios-images',
        colors: ['#63E2FF', '#B066FE'],
        image: require('../../assets/suntuto.png'),
    },
    {
        key: 'somethun1',
        title: 'Super customizable',
        text: 'The component is also super customizable, so you can adapt it to cover your needs and wants.',
        icon: 'ios-options',
        colors: ['#A3A1FF', '#3A3897'],
        image: require('../../assets/2.jpg'),
    },
    {
        key: 'somethun2',
        title: 'No need to buy me beer',
        text: 'Usage is all free',
        icon: 'ios-beer',
        colors: ['#29ABE2', '#4F00BC'],
        image: require('../../assets/3.jpg'),
    },
];

type Props = {};
export default class Tutorial extends Component<Props> {
    // _renderItem = props => (
    //     <LinearGradient
    //         style={[styles.mainContent, {
    //             paddingTop: props.topSpacer,
    //             paddingBottom: props.bottomSpacer,
    //             width: props.width,
    //             height: props.height,
    //         }]}
    //         colors={props.colors}
    //         start={{ x: 0, y: .1 }} end={{ x: .1, y: 1 }}
    //     >
    //         <Ionicons style={{ flex: 0.7,backgroundColor: 'transparent', marginTop: 50 }} name={props.icon} size={200} color="white" />
    //         <View style = {{flex:1}}>
    //             <Text style={styles.title}>{props.title}</Text>
    //             <Text style={styles.text}>{props.text}</Text>
    //         </View>
    //     </LinearGradient>
    // );

    _renderItem = (item) => {
      return (
        <View style = {{flex : 1, backgroundColor: 'red'}}>
          <StatusBar hidden = {true}/>
          <Image style = {styles.backgroundImage} source={item.image} />
        </View>
      );
    }

    _joinButton = () => {
        const {navigate} = this.props.navigation;
        navigate('JOIN', this.props);
    }

    
    _loginButton = () => {
        const {navigate} = this.props.navigation;
        navigate('LOGIN', this.props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.mainContent}>
                    <AppIntroSlider
                        slides={slides}
                        renderItem={this._renderItem}
                        buttonTextStyle = {{color:'transparent'}}
                        activeDotStyle = {{width :7, height:4 ,backgroundColor:'rgba(255,255,255,.9)'}}
                        dotStyle = {{width : 7, height : 4, backgroundColor: 'rgba(0, 0, 0, .2)'}}
                    />
                </View>
                <View style={styles.view2}>
                    <Button buttonStyle={styles.button1} title="회원가입" onPress={this._joinButton} />
                    <View style = {{flexDirection:'row', alignItems:'center'}}>
                        <Text style ={{color:"#889988"}}>이미 아이디가 있으신가요? </Text>
                        <Button buttonStyle={styles.button2} titleStyle={{color:'#55AAFF'}} title="로그인" onPress={this._loginButton} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button1:{
        backgroundColor: '#55AAFF',
        borderRadius : 30,
        margin : 10,
        width: 130,
        height: 46,  
    },
    button2:{
        backgroundColor: 'transparent',
    },
    view2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    mainContent: {
        flex: 3,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        backgroundColor: 'white'
    },
    image: {
        width: 320,
        height: 320,
    },
    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 22,
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 16,
    },
    container: {
        flex: 1,
    },

    backgroundImage: {
        height: 539,
        width: "100%",
        resizeMode: 'contain', // or 'stretch',
        justifyContent: 'center',
    },

    loginForm: {
        backgroundColor: 'transparent',
        alignItems: 'center',
    },

    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
