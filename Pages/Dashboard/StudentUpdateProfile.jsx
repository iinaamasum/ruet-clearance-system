import React from 'react';
import { Button, Text, View } from 'react-native';
import tw from 'twrnc';

const StudentUpdateProfile = ({ navigation }) => {
  const { navigate } = navigation;
  return (
    <View style={tw`px-8`}>
      <Text style={tw`text-center text-xl text-purple-600 mt-5`}>
        Update Profile
      </Text>
      <Text style={tw`text-center text-xl text-red-600 my-5`}>
        Page is under development
      </Text>

      <Button title="Home" onPress={() => navigate('Student Home')} />

      {/* <View style={tw`mb-3`}>
        <Text
          style={[tw`font-semibold text-purple-600 ml-1`, { fontSize: 18 }]}
        >
          Password
        </Text>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Password is required',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={tw`rounded-lg bg-gray-200 w-full px-4 py-3`}
              placeholder="Enter Password"
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={tw`text-sm font-bold text-red-600`}>
            {errors.password?.message}
          </Text>
        )}
      </View> */}
    </View>
  );
};

export default StudentUpdateProfile;
