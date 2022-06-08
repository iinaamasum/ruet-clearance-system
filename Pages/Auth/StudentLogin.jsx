import React, { useEffect } from 'react';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { Controller, useForm } from 'react-hook-form';
import { Image, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Toast from 'react-native-toast-message';
import tw from 'twrnc';
import loginImg from '../../assets/image/studentLogin.png';
import auth from '../../firebase.init';
import LoadingComponent from '../Shared/LoadingComponent';

export default function StudentLogin({ navigation }) {
  const [signInWithEmailAndPassword, formUser, formLoading, formError] =
    useSignInWithEmailAndPassword(auth);
  const { navigate } = navigation;
  const [user, loading, error] = useAuthState(auth);
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
  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(data.email, data.password);
    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      text2: 'Congratulations 👋',
    });
  };

  useEffect(() => {
    if (user) {
      reset();
      navigate('Update Profile');
    }
  }, [user]);

  if (loading) {
    return <LoadingComponent />;
  }
  if (error) {
    Toast.show({
      type: 'error',
      text1: 'Error Ocurred',
      text2: `${error?.message}`,
    });
  }

  if (formLoading) {
    return <LoadingComponent />;
  }
  if (formError) {
    Toast.show({
      type: 'error',
      text1: 'Error Ocurred',
      text2: `${formError?.message}`,
    });
  }

  return (
    <View style={tw`flex justify-center h-full px-8`}>
      <View style={tw`w-full mx-auto`}>
        <Image source={loginImg} style={tw`w-32 h-32 mx-auto`} />
      </View>
      <Text style={tw`text-xl text-center mb-5 font-bold text-red-600`}>
        Student Login
      </Text>

      <View style={tw`mb-3`}>
        <Text
          style={[tw`font-semibold text-purple-600 ml-1`, { fontSize: 18 }]}
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
              style={tw`rounded-lg bg-gray-200 w-full px-4 py-3`}
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
      </View>

      <Text style={tw`text-[4] ml-1`}>
        Don't have an account?{' '}
        <Text
          style={tw`text-blue-600 underline`}
          onPress={() => navigate('Register')}
        >
          Create Account
        </Text>
      </Text>
      <Text style={tw`text-[4] mb-3 ml-1`}>
        Forgot password?{' '}
        <Text
          style={tw`text-blue-600 underline`}
          onPress={() => navigate('Reset Password')}
        >
          Reset Now
        </Text>
      </Text>

      <TouchableHighlight
        style={tw`rounded-lg bg-slate-700 font-bold py-2 px-4`}
      >
        <Text
          style={tw`text-center text-white text-xl tracking-wide font-bold`}
          onPress={handleSubmit(onSubmit)}
        >
          Login
        </Text>
      </TouchableHighlight>
    </View>
  );
}
