import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ImageBackground,
  Text,
} from "react-native";

// import the background image
import image from "../assets/Background_Image.png";

// variable holding the color choices for background
const colors = {
  black: "#090C08",
  purple: "#474056",
  gray: "#8A95A5",
  hackie: "#B9C6AE",
  blue: "#c9e9f6",
};

// function Start renders the main page of the app
const Start = (props) => {
  // set the state for the name and background input
  const [name, setName] = useState("");
  const [color, setColor] = useState();

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode={"cover"} style={styles.image}>
        <Text style={styles.title}>Chat App</Text>

        <View style={styles.menu}>
          <TextInput
            style={styles.input}
            onChangeText={(name) => setName(name)}
            value={name}
            placeholder="Your name..."
          />
          {/* the main title */}
          <Text style={styles.txt}>Choose Background Color</Text>
          <View style={styles.modeColors}>
            {/* Colors for background */}
            <TouchableOpacity
              style={styles.color1}
              onPress={() => setColor(colors.black)}
            ></TouchableOpacity>
            <TouchableOpacity
              style={styles.color2}
              onPress={() => setColor(color.purple)}
            ></TouchableOpacity>
            <TouchableOpacity
              style={styles.color3}
              onPress={() => setColor(colors.gray)}
            ></TouchableOpacity>
            <TouchableOpacity
              style={styles.color4}
              onPress={() => setColor(colors.hackie)}
            ></TouchableOpacity>
            <TouchableOpacity
              style={styles.color5}
              onPress={() => setColor(colors.blue)}
            ></TouchableOpacity>
          </View>

          <Pressable
            style={styles.btnStart}
            onPress={() => {
              props.navigation.navigate("Chat", { name: name, color: color });
            }}
          >
            <Text style={styles.btnText}>Start Chatting</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

// this is the declaration of styles for the Start component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  menu: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
    height: "20%",
    width: "90%",
    marginLeft: "5%",
    marginBottom: "5%",
  },

  title: {
    flex: 1,
    justifyContent: "center",
    fontSize: 45,
    fontWeight: "600",
    color: "#fff",
  },

  input: {
    height: 40,
    width: "90%",
    borderColor: "lightgray",
    borderWidth: 1,
    padding: "5%",
    marginTop: "5%",
  },

  modeColors: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  txt: {
    fontSize: 20,
    fontWeight: "300",
    color: "#757083",
    padding: 30,
  },
  color1: {
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 3,
    backgroundColor: colors.black,
  },

  color2: {
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 3,
    backgroundColor: colors.purple,
  },

  color3: {
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 3,
    backgroundColor: colors.gray,
  },

  color4: {
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 3,
    backgroundColor: colors.hackie,
  },

  color5: {
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 3,
    backgroundColor: colors.blue,
  },

  btnStart: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: "90%",
    backgroundColor: "#757083",
    marginBottom: "5%",
  },

  btnText: {
    fontSize: "16",
    fontWeight: "600",
    color: "#fff",
  },
});

export default Start;
