import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SignInScreen } from "../screens/SignInScreen"
import { NavigationContainer } from "@react-navigation/native"

export const SignInStack = () => {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
