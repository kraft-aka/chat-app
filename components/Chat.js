import React, { useEffect, useState } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
// import firebase database
const firebase = require("firebase");
require("firebase/firestore");

// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection } from "firebase/firestore/lite";

export default function Chat(props) {
  // state for holding messages
  const [messages, setMessages] = useState([]);

  // configuration of Firebase credentials
  const firebaseConfig = {
    apiKey: "AIzaSyDShzCnlD3dY0YlGmueSPVLIW1bIhCiDlE",
    authDomain: "chatapp-ae72c.firebaseapp.com",
    projectId: "chatapp-ae72c",
    storageBucket: "chatapp-ae72c.appspot.com",
    messagingSenderId: "850257656773",
  };

  // set the Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  //making reference to collection
  const referenceMessages = firebase.firestore().collection('messages');

  // destructuring the props
  let { name, color } = props.route.params;

  // change title once user proceeds to chat
  useEffect(() => {
    props.navigation.setOptions({ title: name === "" ? "no title" : name });
  }, []);

  let unsubscribe; 

  // update a state
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `Hello ${name}`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "This is a system message",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  // checking for updates in collection
  useEffect(() => {
    unsubscribe = referenceMessages.onSnapshot(onCollectionUpdate);
    return () => unsubscribe();
  }, []);

  // function to retrieve data from a collection
  function onCollectionUpdate(querySnapshot) {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the queryDocumnetSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt,
        user: data.user,
      });
    });
  }

  // add message to collection
  function addMessages(message) {
    referenceMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: message.user,
    });
  }

  // function to send message in chat room
  function onSend(messages = []) {
    setMessages((prevState) => GiftedChat.append(prevState.messages, messages));
  }

  // function to alter the bakcgorund color of bubble when user sends msg in chat
  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          // left: {
          //   backgroundColor: 'blue'
          // },
          right: {
            backgroundColor: "#242ACF",
          },
        }}
      />
    );
  }

  return (
    <View style={[{ backgroundColor: color }, styles.chatContainer]}>
      {/* <Text style={styles.txt}>Hello {name} from Chat!</Text> */}

      <GiftedChat
        renderBubble={renderBubble}
        messages={messages}
        onSend={(messages) => {
          console.log(messages, "---------");
           onSend(messages)
        }}
        user={{ _id: 1 }}
      />
      {/* this prevents the screen collapsing with a keyboard */}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    justifyContent: "center",
  },

  txt: {
    fontSize: 16,
    color: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
