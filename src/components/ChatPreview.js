import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import moment from "moment"
import "moment/locale/es"

export const ChatPreview = ({ person, message, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Image
          source={{ uri: `https://picsum.photos/200/200` }}
          style={styles.image}
        />
        <View style={styles.text}>
          <Text style={styles.person}>{person.name}</Text>
          <Text style={styles.message}>{message.content}</Text>
        </View>
      </View>
      <Text style={styles.date}>
        {moment(message.insertionDate).locale("es").format("ddd LT")}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 10,
    borderBottomColor: "#2b2b2b",
    borderBottomWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  content: {
    flexDirection: "row",
    justifyContent: "flex-start",
    maxWidth: "63%",
  },
  text: {
    marginLeft: 10,
  },
  person: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 18,
    maxHeight: 25,
  },
  message: {
    color: "#7e7e7e",
    fontWeight: "300",
    fontSize: 14,
    maxHeight: 20,
  },
  date: {
    padding: 5,
    color: "#7e7e7e",
    fontWeight: "300",
    fontSize: 14,
  },
})
