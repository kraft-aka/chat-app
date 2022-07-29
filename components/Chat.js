import React from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Text,
} from "react-native";

import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDShzCnlD3dY0YlGmueSPVLIW1bIhCiDlE",
  authDomain: "chatapp-ae72c.firebaseapp.com",
  projectId: "chatapp-ae72c",
  storageBucket: "chatapp-ae72c.appspot.com",
  messagingSenderId: "850257656773",
};

// export default class Chat extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       messages: [],
//       uid: 0,
//       loggedInText: "Please wait. You are being authenticated",
//       user: {
//         _id: "",
//         name: this.props.route.params.name || "User",
//         avatar: "https://placeimg.com/140/140/any",
//       },
//     };

//     if (!firebase.apps.length) {
//       firebase.initializeApp(firebaseConfig);
//     }

//     this.referenceMessages = firebase.firestore().collection("messages");
//   }

//   componentDidMount() {

//     let { name, color } = this.props.route.params;
//     this.props.navigation.setOptions({ title: name, color: color });

//     this.referenceMessages = firebase.firestore().collection("messages");

//     this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
//       if (!user) {
//         await firebase.auth().signInAnonymously();
//       }

//       this.setState({
//         uid: user.uid,
//         messages: [],
//         loggedInText: "Hello there",
//         user: {
//           _id: user.uid,
//           name: name,
//           avatar: "https://placeimg.com/140/140/any",
//         },
//       });
//       this.referenceMessages = firebase
//       .firestore()
//       .collection("messages")
//       .where("uid", "==", this.state.uid);

//       this.unsubscribe = this.referenceMessages.onSnapshot(
//       this.onCollectionUpdate);

//       this.unsubscribe = this.referenceMessages
//       .orderBy("createdAt", "desc")
//       .onSnapshot(this.onCollectionUpdate);
//     });
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//     this.authUnsubscribe();
//   }

//   onCollectionUpdate = (querySnapshot) => {
//     const messages = [];
//     // go through each message
//     querySnapshot.forEach((doc) => {
//       // get theQueryDocumentSnapshot data
//       let data = doc.data();
//       messages.push({
//         _id: data._id,
//         text: data.text,
//         createdAt: data.createdAt,
//         // user: {
//         //   _id: data.user._id,
//         //   name: data.user.name,
//         //   avatar: data.user.avatar,
//         // },
//         user: data.user,
//       });
//     });
//     this.setState({
//       messages: messages,
//     });
//   };

//   addMessage() {
//     const message = this.state.messages[0];
//     this.referenceMessages.add({
//       uid: this.state.uid,
//       _id: message._id,
//       text: message.text || "",
//       createdAt: message.createdAt,
//       user: message.user,
//     });
//   }

//   renderBubble(props) {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           left: {
//             backgroundColor: "#fff",
//           },
//           right: {
//             backgroundColor: "#7209b7",
//           },
//         }}
//       />
//     );
//   }

//   // append messages which user sends
//   onSend(messages = []) {
//     this.setState(
//       (prevState) => ({
//         messages: GiftedChat.append(prevState.messages, messages),
//       }),
//       () => this.addMessage()
//     );
//   }

//   render() {
//     let { name, color } = this.props.route.params;
    
//     return (
//       <View style={[{ backgroundColor: color }, styles.chatContainer]}>
//         <Text>{this.state.loggedInText}</Text>
//         <GiftedChat
//           renderBubble={this.renderBubble.bind(this)}
//           messages={this.state.messages}
//           onSend={(messages) => this.onSend(messages)}
//           user={{
//             _id: this.state.user._id,
//             name: name,
//             avatar: this.state.avatar,
//           }}
//         />
//         {Platform.OS === "android" ? (
//           <KeyboardAvoidingView behavior="height" />
//         ) : null}
//       </View>
//     );
//   }
// }

class Chat extends React.Component {
	constructor() {
		super();
		this.state = {
			messages: [],
			uid: 0,
      loggedInText: "Please wait. You are being authenticated",
			user: {
				_id: '',
				name: '',
				avatar: "https://placeimg.com/140/140/any",
			},
		}

		// initializes the Firestore app
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		//Stores and retrieves the chat messages users send
		this.referenceChatMessages = firebase.firestore().collection("messages");

		this.referenceMessagesUser = null;
	}



	componentDidMount() {

		let { name, color } = this.props.route.params;
		this.props.navigation.setOptions({ title: name, color: color });

		// Reference to load messages via Firebase
		this.referenceChatMessages = firebase.firestore().collection("messages");



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
				.where("uid", '==', this.state.uid);
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

	// Add messages to cloud storage
	addMessages() {
		const message = this.state.messages[0];
		this.referenceChatMessages.add({
			uid: this.state.uid,
			_id: message._id,
			text: message.text || "",
			createdAt: message.createdAt,
			user: message.user,
		});
	}

	onSend(messages = []) {
		this.setState((previousState) => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}), () => {
			this.addMessages();
		});
	}


	onCollectionUpdate = (querySnapshot) => {
		const messages = [];
		// go through each document
		querySnapshot.forEach((doc) => {
			// get the QueryDocumentSnapshot's data
			let data = doc.data();
			messages.push({
				_id: data._id,
				text: data.text,
				createdAt: data.createdAt.toDate(),
				user: data.user,
			});
		});
		this.setState({
			messages: messages
		});
	}



	// Customize the color of the sender bubble
	renderBubble(props) {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
          left: {
            backgroundColor: '#fff'
          },
					right: {
						backgroundColor: '#7209b7'
					}
				}}
			/>
		)
	}

	render() {
		let { color, name } = this.props.route.params;
		return (
			<View style={[{ backgroundColor: color }, styles.chatContainer]}>
        <Text>{this.state.loggedInText}</Text>
				<GiftedChat
					renderBubble={this.renderBubble.bind(this)}
					messages={this.state.messages}
					// onSend={(messages) => this.onSend(messages)}
          onSend={(messages)=> console.log(messages)}
					user={{
						_id: this.state.user._id,
						name: name,
						avatar: this.state.user.avatar

					}}
				/>
				{/* Avoid keyboard to overlap text messages on older Andriod versions  */}
				{Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
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
