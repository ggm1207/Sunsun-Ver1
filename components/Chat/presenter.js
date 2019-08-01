import React , { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import Fire from './Fire';

type Props = {};
export default class Chat extends Component<Props> {
    name = 'test';
    componentDidMount(){
        Fire.shared.on(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }
    
    componentWillUnmount(){
        Fire.shared.off();
    }

    get user(){
        // console.log(Fire.shared.uid);
        return {
            name: this.name,
            _id: Fire.shared.uid,
            avatar: "https://placeimg.com/140/140/any"
        };
    }

    static navigationOptions = ({ navigation }) => ({
        title : (navigation.state.params || {}).name || 'Chat!',
    });

    state = {
        messages: [],
    };

    render(){
        return(
            // Expo 에서 벗어나면 안드로이드도 딸려 오게 할 수 있음.
            <GiftedChat
                messages = {this.state.messages}
                onSend= {Fire.shared.send}
                user={this.user}
            />
        );
    }
}
