import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ChatScreen } from "../screens/ChatScreen"
import { ChatListScreen } from "../screens/ChatListScreen"

export const ChatStack = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{ title: "Chats" }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({ title: route.params.person.name })}
      />
    </Stack.Navigator>
  )
}
