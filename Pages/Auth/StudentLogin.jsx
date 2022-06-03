import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Image, Text, TextInput, View } from 'react-native';
import tw from 'twrnc';
import Student from '../../assets/image/studentLogin.png';

export default function StudentLogin() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data) => alert(data.email + data.password);
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
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Email is required',
          },
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={tw`rounded-lg bg-gray-100 w-full px-4 py-3`}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter Your Email"
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text style={tw`text-sm font-bold text-red-600 mb-3`}>
          {errors.email?.message}
        </Text>
      )}

      <Text style={[tw`font-semibold text-purple-600 ml-1`, { fontSize: 16 }]}>
        Password
      </Text>
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Password is required',
          },
          pattern: {
            value: /(?=.*[!#$%&?^*@~() "])(?=.{8,})/,
            message:
              'Password must contain at least 8 characters including one special character',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={tw`rounded-lg bg-gray-100 w-full px-4 py-3`}
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

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
