import {
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { useState } from "react"
import axios from "axios"
import { API_ROUTE } from "../config/consts"
import { useDispatch } from "react-redux"
import { set } from "../store/features/userSlice"
import { StatusBar } from "expo-status-bar"

export const SignInScreen = ({ navigate }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const signIn = async () => {
    try {
      const { data } = await axios.post(`${API_ROUTE}/api/people/sign-in`, [
        username,
        password,
      ])
      dispatch(set(data))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.page}>
        <Text style={styles.title}>Chaski</Text>
        <Text style={styles.subtitle}>v1.0</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="username"
          placeholderTextColor="#3c3f41"
          keyboardAppearance="dark"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="password"
          placeholderTextColor="#3c3f41"
          keyboardAppearance="dark"
          textContentType="password"
        />
        <Button title="Ingresar" onPress={signIn} />
        <StatusBar style="light" />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  page: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#000",
  },
  title: {
    fontSize: 40,
    color: "#757575",
  },
  subtitle: {
    fontSize: 15,
    color: "#3c3f41",
    marginBottom: 10,
  },
  input: {
    borderColor: "#2b2b2b",
    borderWidth: 1,
    borderRadius: 8,
    color: "#ababab",
    width: 250,
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
  },
})
