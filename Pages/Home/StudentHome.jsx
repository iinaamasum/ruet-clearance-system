import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button, Text, View } from 'react-native';
import tw from 'twrnc';
import auth from '../../firebase.init';

const StudentHome = ({ navigation }) => {
  const [user] = useAuthState(auth);
  const { navigate } = navigation;
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
