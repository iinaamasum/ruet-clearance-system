import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Controller, useForm } from 'react-hook-form';
import { Button, Image, Text, TextInput, View } from 'react-native';
import tw from 'twrnc';
import Student from '../../assets/image/studentLogin.png';
import auth from '../../firebase.init';

export default function StudentLogin({ navigation }) {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const { navigate } = navigation;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
    reset();
    navigate('StudentHome');
  };
  if (loading) {
    return <Text>Loading</Text>;
  }
  if (error) {
    return alert(error.message);
  }
  return (
    <View style={tw`flex justify-center h-full px-8`}>
      <View style={tw`w-full mx-auto`}>
        <Image source={Student} style={tw`w-24 h-32 mx-auto`} />
      </View>
      <Text style={tw`text-xl text-center mb-5 font-bold text-red-600`}>
        Student Login
      </Text>

      <View style={tw`mb-3`}>
        <Text
          style={[tw`font-semibold text-purple-600 ml-1`, { fontSize: 16 }]}
        >
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
          <Text style={tw`text-sm font-bold text-red-600`}>
            {errors.email?.message}
          </Text>
        )}
      </View>

      <View style={tw`mb-3`}>
        <Text
          style={[tw`font-semibold text-purple-600 ml-1`, { fontSize: 16 }]}
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
      </View>

      <Text>
        Don't have an account?{' '}
        <Text
          style={tw`text-blue-600 underline`}
          onPress={() => navigate('StudentHome')}
        >
          Create Account
        </Text>
      </Text>

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
