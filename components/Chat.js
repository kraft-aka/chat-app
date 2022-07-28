import React from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Text
} from "react-native";


export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id:1,
          text: 'Hello Developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
        }}
      />
    );
  }

  // append messages which user sends
  onSend(messages=[]) {
    this.setState(prevState => ({
      messages: GiftedChat.append(prevState.messages, messages),
    }))
  }

  render() {

    let {name , color} = this.props.route.params;
    this.props.navigation.setOptions({ title: name, color: color})

    return(
      <View style={ [ { backgroundColor: this.props.route.params.color }]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({

})



