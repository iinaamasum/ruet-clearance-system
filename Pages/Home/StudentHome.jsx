import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button, Text, View } from 'react-native';
import tw from 'twrnc';
import auth from '../../firebase.init';

const StudentHome = ({ navigation }) => {
  const [user] = useAuthState(auth);
  if (!user) return <LoadingComponent />;
  const [info] = useStudentInfoFetch(user.email);
  const { navigate } = navigation;

  console.log(user.email);
  console.log(info);

  // if (!info?.email) {
  //   navigate('Update Profile');
  // }
  const handleLogOut = () => {
    signOut(auth);
    navigate('Login');
  };
  return (
    <View>
      <Text style={tw`text-lg mt-20 px-8`}>User: {user?.email}</Text>
      <Button title="Logout" onPress={handleLogOut} />
    </View>
  );
};

export default StudentHome;
