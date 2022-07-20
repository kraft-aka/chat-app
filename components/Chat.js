import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Chat = (props) => {
  // destructuring the porps
  let { name, color } = props.route.params;

  useEffect(() => {
    props.navigation.setOptions({ title: name === "" ? "no name" : name });
  });

  return (
    <View style={[{ backgroundColor: color }, styles.chatContainer]}>
      <Text style={styles.txt}>Hello {name} from Chat!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  txt: {
    color: "#000",
  },
});

export default Chat;
