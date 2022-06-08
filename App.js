import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentLogin from './Pages/Auth/StudentLogin';
import StudentHome from './Pages/Home/StudentHome';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={StudentLogin} />
        <Stack.Screen name="Register" component={StudentLogin} />
        <Stack.Screen name="StudentHome" component={StudentHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
