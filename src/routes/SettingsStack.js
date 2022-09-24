import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SettingsScreen } from "../screens/SettingsScreen"

export const SettingsStack = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Ajustes" }}
      />
    </Stack.Navigator>
  )
}
