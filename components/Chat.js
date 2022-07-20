import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Chat(props) {
  // destructuring the porps
  let { name, color } = props.route.params;

  // change title once user proceeds to chat
  useEffect(() => {
    props.navigation.setOptions({ title: name === "" ? "no title" : name });
  });
  return (
    <View style={[{ backgroundColor: color }, styles.chatContainer]}>
      <Text style={styles.txt}>Hello {name} from Chat!</Text>
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
    backgroundColor: "#fff",
    padding: 10,
    width: "90%",
    marginLeft: 16,
  },
});
