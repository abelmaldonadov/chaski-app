import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Platform,
  Alert,
  Text,
  Button,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { useEffect, useRef, useState } from "react"
import { ChatPreview } from "../components/ChatPreview"
import axios from "axios"
import { API_ROUTE, PUSHER_API_KEY } from "../config/consts"
import { receive, set } from "../store/features/chatSlice"
import Pusher from "pusher-js"
import { useDispatch, useSelector } from "react-redux"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import { add } from "../store/features/messageSlice"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export const ChatListScreen = ({ navigation }) => {
  const [filter, setFilter] = useState("")
  const [filteredChats, setFilteredChats] = useState([])
  const { list } = useSelector((state) => state.chat)
  const { data: user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [isRefreshing, setRefreshing] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    findChats()
    const socket = new Pusher(PUSHER_API_KEY, {
      cluster: "sa1",
    })
    subscribeOnPusher(socket)
    registerForPushNotificationsAsync()
    notificationsListen()
    return () => {
      socket.unsubscribe(user.id)
      console.log("Unsubscribe to Pusher")
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
      console.log("Unsubscribe to expo Notification")
    }
  }, [])

  useEffect(() => {
    if (filter.length > 0) {
      const filtered = list.filter((item) =>
        item.t1.name.toLowerCase().includes(filter.toLowerCase())
      )
      setFilteredChats(filtered)
    } else {
      setFilteredChats(list)
    }
  }, [filter, list])

  const findChats = async () => {
    try {
      setRefreshing(true)
      const { data } = await axios.get(
        `${API_ROUTE}/api/directory/contacts/last-message/${user.id}`
      )
      dispatch(set(data))
    } catch (err) {
      console.log(err)
    } finally {
      setRefreshing(false)
    }
  }

  const subscribeOnPusher = (socket) => {
    socket.unsubscribe(user.id)
    const channel = socket.subscribe(user.id)
    channel.bind("send-message", (e) => {
      const { date: d, time: t } = e.insertionDate
      e = {
        ...e,
        insertionDate: new Date(
          d.year,
          d.month,
          d.day,
          t.hour,
          t.minute,
          t.second
        ).toISOString(),
      }
      dispatch(receive(e))
      dispatch(add(e))
    })
  }

  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== "granted") {
        Alert.alert("Error", "Failed to get push token for push notification!")
        return
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data
      console.log(token)
      await saveToken(token)
    } else {
      Alert.alert("Error", "Must use physical device for Push Notifications")
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      })
    }
  }

  const saveToken = async (token) => {
    try {
      const { data } = await axios.post(`${API_ROUTE}/api/people/save-token`, {
        ...user,
        expoToken: token,
      })
      console.log("Expo Notifications token was saved")
    } catch (err) {
      console.log("Expo Notifications Token was not saved")
    }
  }

  const notificationsListen = () => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification)
      })
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          placeholderTextColor="#ababab"
          keyboardAppearance="dark"
          onChangeText={(value) => setFilter(value)}
        />
      </View>
      <ScrollView
        style={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={findChats}
            tintColor="#fff"
            progressBackgroundColor="#000"
            colors={["#fff"]}
          />
        }
      >
        {filteredChats.map((item) => (
          <ChatPreview
            key={item.t1.id}
            person={item.t1}
            message={item.t2}
            onPress={() =>
              navigation.navigate("Chat", { person: item.t1, message: item.t2 })
            }
          />
        ))}
      </ScrollView>
      <StatusBar style="light"></StatusBar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#000",
  },
  list: {
    padding: 5,
  },
  header: {
    padding: 10,
    width: "100%",
  },
  input: {
    backgroundColor: "#2b2b2b",
    color: "#ababab",
    width: "100%",
    padding: 10,
    borderRadius: 10,
  },
})
