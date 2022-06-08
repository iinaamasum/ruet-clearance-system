import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Text, View } from 'react-native';
import auth from '../../firebase.init';

const StudentHome = () => {
  const [user] = useAuthState(auth);
  return (
    <View>
      <Text>StudentHome {user.email}</Text>
    </View>
  );
};

export default StudentHome;
