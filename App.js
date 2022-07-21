import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import ResetPassword from './Pages/Auth/ResetPassword';
import StudentLogin from './Pages/Auth/StudentLogin';
import StudentRegister from './Pages/Auth/StudentRegister';
import StudentUpdateProfile from './Pages/Dashboard/StudentUpdateProfile';
import AccountsClearance from './Pages/Home/AccountsClearance';
import DeptClearanceSelection from './Pages/Home/DeptClearanceSelection';
import HallClearanceSelection from './Pages/Home/HallClearanceSelection';
import OtherClearance from './Pages/Home/OtherClearance';
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
        <Stack.Screen
          name="Dept Clearance"
          component={DeptClearanceSelection}
        />
        <Stack.Screen
          name="Hall Clearance"
          component={HallClearanceSelection}
        />
        <Stack.Screen
          name="Accounts and Admin Clearance"
          component={AccountsClearance}
        />
        <Stack.Screen name="Others" component={OtherClearance} />
      </Stack.Navigator>
      <Toast />
      {/* <BottomTabs /> */}
    </NavigationContainer>
  );
}
