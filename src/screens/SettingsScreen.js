import { Button, ScrollView, StyleSheet, View } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useDispatch } from "react-redux"
import { unset } from "../store/features/userSlice"

export const SettingsScreen = ({ navigate }) => {
  const dispatch = useDispatch()

  return (
    <ScrollView style={styles.container}>
      <View>
        <Button title="Salir" onPress={() => dispatch(unset())} />
      </View>
      <StatusBar style="light" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
})
