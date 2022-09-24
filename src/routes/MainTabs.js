import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { ChatStack } from "./ChatStack"
import { DirectoryStack } from "./DirectoryStack"
import { SettingsStack } from "./SettingsStack"

export const MainTabs = () => {
  const Tab = createBottomTabNavigator()

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="ChatsStack"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#000",
            borderTopColor: "#2b2b2b",
          },
          headerStyle: { backgroundColor: "#000" },
          headerTitleStyle: { color: "#fff" },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="DirectoryStack"
          component={DirectoryStack}
          options={{
            title: "Directorio",
            tabBarIcon: () => <AntDesign name="bars" size={24} color="gray" />,
            tabBarActiveTintColor: "#308bfc",
            tabBarInactiveTintColor: "gray",
          }}
        />
        <Tab.Screen
          name="ChatsStack"
          component={ChatStack}
          options={{
            title: "Chats",
            tabBarIcon: () => (
              <Ionicons name="ios-chatbubbles-outline" size={24} color="gray" />
            ),
            tabBarActiveTintColor: "#308bfc",
            tabBarInactiveTintColor: "gray",
          }}
        />
        <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            title: "Ajustes",
            tabBarIcon: () => (
              <Ionicons name="settings-outline" size={24} color="gray" />
            ),
            tabBarActiveTintColor: "#308bfc",
            tabBarInactiveTintColor: "gray",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
