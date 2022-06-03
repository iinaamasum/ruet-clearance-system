import React from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import tw from 'twrnc';
import Student from '../../assets/image/studentLogin.png';

export default function StudentLogin() {
  return (
    <View style={tw`flex justify-center h-full px-8`}>
      <View style={tw`w-full mx-auto`}>
        <Image source={Student} style={tw`w-24 h-32 mx-auto`} />
      </View>
      <Text style={tw`text-xl text-center mb-5 font-bold text-red-600`}>
        Student Login
      </Text>
      <Text style={[tw`font-semibold text-purple-600 ml-1`, { fontSize: 16 }]}>
        Email
      </Text>
      <TextInput
        style={tw`rounded-lg bg-gray-100 w-full px-4 py-3 mb-3`}
        placeholder="Enter Email"
      />
      <Text style={[tw`font-semibold text-purple-600 ml-1`, { fontSize: 16 }]}>
        Password
      </Text>
      <TextInput
        style={tw`rounded-lg bg-gray-100 w-full px-4 py-3`}
        placeholder="Enter Password"
      />
    </View>
  );
}
