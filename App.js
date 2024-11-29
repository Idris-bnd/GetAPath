import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChooseLocation from "./src/Screens/ChooseLocation";
import Home from "./src/Screens/Home";


const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ChooseLocation" component={ChooseLocation} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;