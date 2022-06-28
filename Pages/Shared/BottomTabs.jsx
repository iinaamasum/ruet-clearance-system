import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StudentHome from '../Home/StudentHome';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={StudentHome} />
      {/* <Tab.Screen name="Home" component={StudentHome} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabs;
