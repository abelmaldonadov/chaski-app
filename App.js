import { SignInStack } from "./src/routes/SignInStack"
import { MainTabs } from "./src/routes/MainTabs"
import { Provider, useSelector } from "react-redux"
import store from "./src/store/store"

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

const Routes = () => {
  const { data: user } = useSelector((state) => state.user)

  if (user) {
    return <MainTabs />
  } else {
    return <SignInStack />
  }
}
