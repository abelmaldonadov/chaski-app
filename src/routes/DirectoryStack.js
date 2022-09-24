import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { DirectoryScreen } from "../screens/DirectoryScreen"

export const DirectoryStack = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Stack.Screen
        name="Directory"
        component={DirectoryScreen}
        options={{ title: "Directorio" }}
      />
    </Stack.Navigator>
  )
}
