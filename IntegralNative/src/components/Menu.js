import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";

export default function Menu({ navigation }) {
  return (
    <View style={[styles.menu]}>
      <Pressable
        style={[styles.button]}
        onPress={() => navigation.navigate("BackgroundImageSelector")}
      >
        <Image
          source={require("./image.png")} // Replace with the actual path to your image
          style={{ width: 30, height: 30 }} // Adjust the width and height as needed
        />          
      </Pressable>
      <Pressable
        style={[styles.button]}
        onPress={() => navigation.navigate("Url")}
      >
        <Image
          source={require("./url.png")} // Replace with the actual path to your image
          style={{ width: 30, height: 30 }} // Adjust the width and height as needed
        />              
      </Pressable>
      <Pressable
        style={[styles.button]}
        onPress={() => navigation.navigate("Fono")}
      >
        <Image
          source={require("./fono.png")} // Replace with the actual path to your image
          style={{ width: 30, height: 30 }} // Adjust the width and height as needed
        />       
      </Pressable>
      <Pressable
        style={[styles.button]}
        onPress={() => navigation.navigate("Qr")}
      >
        <Image
          source={require("./qr.png")} // Replace with the actual path to your image
          style={{ width: 30, height: 30 }} // Adjust the width and height as needed
        />           
      </Pressable>
      <Pressable
        style={[styles.button]}
        onPress={() => navigation.navigate("Configuracion")}
      >
       <Image
          source={require("./settings.png")} // Replace with the actual path to your image
          style={{ width: 30, height: 30 }} // Adjust the width and height as needed
        />               
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    display: "flex",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
  },

  button: {
    width: "20%",
    height: "100%",
    display: "flex",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    marginTop:"5%",
  },
});
