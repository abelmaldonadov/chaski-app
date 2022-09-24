import {
  Button,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import axios from "axios"
import { useEffect, useState } from "react"
import { ContactPreview } from "../components/ContactPreview"
import { API_ROUTE } from "../config/consts"
import { useDispatch, useSelector } from "react-redux"
import { set } from "../store/features/directorySlice"

export const DirectoryScreen = ({ navigation }) => {
  const [filter, setFilter] = useState("")
  const [filteredPeople, setFilteredPeople] = useState([
    { name: "asd", username: "a", insertionDate: "2022-08-27T16:41:47.366" },
  ])
  const { data: user } = useSelector((state) => state.user)
  const { list } = useSelector((state) => state.directory)
  const dispatch = useDispatch()
  const [isRefreshing, setRefreshing] = useState(false)

  useEffect(() => {
    findAll()
  }, [])

  useEffect(() => {
    if (filter.length > 0) {
      const filtered = list.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      )
      setFilteredPeople(filtered)
    } else {
      setFilteredPeople(list)
    }
  }, [filter, list])

  const findAll = async () => {
    try {
      setRefreshing(true)
      const { data } = await axios.get(
        `${API_ROUTE}/api/directory/contacts/${user.id}`
      )
      dispatch(set(data))
    } catch (err) {
      console.log(err)
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          placeholderTextColor="#ababab"
          onChangeText={(value) => setFilter(value)}
          keyboardAppearance="dark"
        />
      </View>
      <ScrollView
        style={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={findAll}
            tintColor="#fff"
            progressBackgroundColor="#000"
            colors={["#fff"]}
          />
        }
      >
        {filteredPeople.map((item, index) => (
          <ContactPreview key={index} person={item} />
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
