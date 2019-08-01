import firebase from 'firebase';

class Fire {
    constructor() {
        this.init();
        this.observeAuth();
    }

    init = () =>
        firebase.initializeApp({
            apiKey: "AIzaSyD5GKTLQBWU25tzGuoE1cZa95QZ3J9VpPc",
            authDomain: "capston-chat.firebaseapp.com",
            databaseURL: "https://capston-chat.firebaseio.com",
            projectId: "capston-chat",
            storageBucket: "capston-chat.appspot.com",
            messagingSenderId: "448739621184"
        })

    observeAuth = () =>
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    onAuthStateChanged = user => {
        if (!user) {
            try {
                firebase.auth().signInAnonymously();
            } catch ({ message }) {
                alert(message);
            }
        }
    };

    get ref() {
        return firebase.database().ref('messages'); // groupname
    }

    on = callback =>
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot =>
                callback(this.parse(snapshot)));

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;

        const timestamp = new Date(numberStamp);
        // _id = JSON.parse(JSON.stringify(_id)
        // user = JSON.parse(JSON.stringify(user))
        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        // console.log(message);
        return message;
    };

    off() {
        this.ref.off();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];

            const message = {
                text,
                user,
                timestamp: this.timestamp,
            };
            this.append(message);
        }
    };

    append = message => {
        this.ref.push(message);
    }
}

Fire.shared = new Fire();
export default Fire;