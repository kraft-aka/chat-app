import React from "react";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Text,
} from "react-native";

import firebase from "firebase";
import "firebase/firestore";
import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from "@react-native-community/netinfo";

const firebaseConfig = {
  apiKey: "AIzaSyDShzCnlD3dY0YlGmueSPVLIW1bIhCiDlE",
  authDomain: "chatapp-ae72c.firebaseapp.com",
  projectId: "chatapp-ae72c",
  storageBucket: "chatapp-ae72c.appspot.com",
  messagingSenderId: "850257656773",
};

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      loggedInText: "Please wait. You are being authenticated",
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
      isConnected: false,
    };

    // initializes the Firestore app
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    //Stores and retrieves the chat messages users send
    this.referenceChatMessages = firebase.firestore().collection("messages");

    this.referenceMessagesUser = null;
  }

  async getMessages() {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }


  componentDidMount() {
    this.getMessages();

    let { name, color } = this.props.route.params;
    this.props.navigation.setOptions({ title: name, color: color });

    // Reference to load messages via Firebase
    this.referenceChatMessages = firebase.firestore().collection("messages");

    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        console.log("online");
      } else {
        console.log("offline");
      }
    });

    // Authenticates user via Firebase
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
        loggedInText: `Hello ${name}`,
        user: {
          _id: user.uid,
          name: name,
          avatar: "https://placeimg.com/140/140/any",
        },
      });
      this.referenceMessagesUser = firebase
        .firestore()
        .collection("messages")
        .where("uid", "==", this.state.uid);
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }


  // stop listening to auth and collection changes
  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

	// retrives the chat messgaes from storage
  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

	// deletes stored messages
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Add messages to cloud storage
  addMessages() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user,
    });
  }

	// sends the messages 
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessages();
        this.saveMessages();
      }
    );
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      //console.log(data)
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages: messages,
    });
  };

	// renders toolbar when offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  // Customize the color of the sender bubble
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#fff",
          },
          right: {
            backgroundColor: "#7209b7",
          },
        }}
      />
    );
  }

  render() {
    let { color, name } = this.props.route.params;
    return (
      <View style={[{ backgroundColor: color }, styles.chatContainer]}>
        <Text style={{ margin: 5 }}>{this.state.loggedInText}</Text>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          // onSend={(messages)=> console.log(messages)}
          user={{
            _id: this.state.user._id,
            name: name,
            avatar: this.state.user.avatar,
          }}
        />
        {/* Avoid keyboard to overlap text messages on older Andriod versions  */}
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Chat;
