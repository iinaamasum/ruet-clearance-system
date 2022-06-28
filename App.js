import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import ResetPassword from './Pages/Auth/ResetPassword';
import StudentLogin from './Pages/Auth/StudentLogin';
import StudentRegister from './Pages/Auth/StudentRegister';
import StudentUpdateProfile from './Pages/Dashboard/StudentUpdateProfile';
import StudentHome from './Pages/Home/StudentHome';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="Login" component={StudentLogin} />
        <Stack.Screen name="Register" component={StudentRegister} />
        <Stack.Screen name="Student Home" component={StudentHome} />
        <Stack.Screen name="Reset Password" component={ResetPassword} />
        <Stack.Screen name="Update Profile" component={StudentUpdateProfile} />
      </Stack.Navigator>
      <Toast />
      {/* <BottomTabs /> */}
    </NavigationContainer>
  );
}
