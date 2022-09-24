import { StyleSheet, Text, View } from "react-native"
import moment from "moment"
import "moment/locale/es"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export const MessageBubble = ({ message }) => {
  const { data: user } = useSelector((state) => state.user)

  useEffect(() => {}, [])

  return (
    <View
      style={
        user.id === message.sender
          ? { ...styles.container, justifyContent: "flex-end" }
          : { ...styles.container, justifyContent: "flex-start" }
      }
    >
      <View
        style={
          user.id === message.sender
            ? { ...styles.bubble, backgroundColor: "#2e89fc" }
            : { ...styles.bubble, backgroundColor: "#3c3f41" }
        }
      >
        <Text style={{ ...styles.content, color: "#fff" }}>
          {message.content}
        </Text>
        <Text style={{ ...styles.date, color: "rgba(255,255,255,0.4)" }}>
          {moment(message.insertionDate).local("es").format("LT")}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  bubble: {
    borderRadius: 7,
    padding: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "85%",
  },
  content: {
    fontSize: 14,
    maxWidth: "85%",
  },
  date: {
    marginLeft: 10,
    fontSize: 12,
  },
})
