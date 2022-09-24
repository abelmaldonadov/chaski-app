import {
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { MessageBubble } from "../components/MessageBubble"
import { Feather } from "@expo/vector-icons"
import { API_ROUTE } from "../config/consts"
import { useDispatch, useSelector } from "react-redux"
import { add, set } from "../store/features/messageSlice"
import { send } from "../store/features/chatSlice"

export const ChatScreen = ({ navigation, route }) => {
  const [text, setText] = useState("")
  const scrollViewRef = useRef()
  const { person } = route.params
  const { data: user } = useSelector((state) => state.user)
  const { list } = useSelector((state) => state.message)
  const dispatch = useDispatch()
  const [range, setRange] = useState({
    from: 1,
    to: 50,
    isUsed: false,
  })
  const [isRefreshing, setRefreshing] = useState(false)

  useEffect(() => {
    getChats()
  }, [range])

  const getChats = async () => {
    try {
      setRefreshing(true)
      const { data } = await axios.post(
        `${API_ROUTE}/api/messages/conversation/${range.from}/${range.to}`,
        [user.id, person.id]
      )
      dispatch(set(data.reverse()))
    } catch (err) {
      console.log(err)
    } finally {
      setRefreshing(false)
    }
  }

  const onRefresh = async () => {
    setRange({ from: range.from, to: range.to + 50, isUsed: true })
  }

  const sendMessage = async () => {
    try {
      const message = {
        sender: user.id,
        receptor: person.id,
        content: text,
        insertionDate: new Date().toISOString(),
      }
      dispatch(add(message))
      const { data } = await axios.post(
        `${API_ROUTE}/api/messages/send-message`,
        message
      )
      dispatch(send(data))
    } catch (err) {
      console.log(err)
    } finally {
      setText("")
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.chats}
        ref={scrollViewRef}
        onContentSizeChange={
          !range.isUsed && scrollViewRef.current?.scrollToEnd
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
            progressBackgroundColor="#000"
            colors={["#fff"]}
          />
        }
      >
        {list.map((item) => (
          <MessageBubble key={item.id} message={item} />
        ))}
        <View style={{ height: 10 }}></View>
      </ScrollView>
      <KeyboardAvoidingView
        style={styles.footer}
        behavior="padding"
        keyboardVerticalOffset={65}
      >
        <TextInput
          style={styles.input}
          placeholder=""
          value={text}
          onChangeText={setText}
          onFocus={scrollViewRef.current?.scrollToEnd}
          keyboardAppearance="dark"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Feather name="send" size={24} color="#2e89fc" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <StatusBar style="light"></StatusBar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#000",
  },
  chats: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  footer: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#2b2b2b",
  },
  input: {
    backgroundColor: "#3c3f41",
    color: "#ababab",
    borderRadius: 10,
    width: "90%",
    padding: 10,
    marginBottom: 10,
  },
  sendButton: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
})
