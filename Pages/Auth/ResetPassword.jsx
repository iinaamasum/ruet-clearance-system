import React from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { Controller, useForm } from 'react-hook-form';
import { Image, Text, TextInput, TouchableHighlight, View } from 'react-native';
import tw from 'twrnc';
import ForgotPass from '../../assets/image/forgotPass.png';
import auth from '../../firebase.init';
import LoadingComponent from '../Shared/LoadingComponent';

const ResetPassword = ({ navigation }) => {
  const { navigate } = navigation;
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  if (sending) {
    return <LoadingComponent />;
  }

  if (error) {
    alert(error.message);
  }

  const onSubmit = (data) => {
    sendPasswordResetEmail(data.email);
    reset();
  };
  return (
    <View style={tw`flex justify-center h-full px-8`}>
      <View style={tw`w-full mx-auto`}>
        <Image source={ForgotPass} style={tw`w-52 h-52 mx-auto`} />
      </View>
      <Text style={tw`text-xl text-center mb-5 font-bold text-red-600`}>
        Reset Password
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
          <Text style={tw`text-sm font-bold text-red-600 ml-1`}>
            {errors.email?.message}
          </Text>
        )}
      </View>

      <Text style={tw`mb-3 text-[4] ml-1`}>
        Already reset password via email?{' '}
        <Text
          onPress={() => navigate('Login')}
          style={tw`text-blue-600 underline ml-1`}
        >
          Log In
        </Text>
      </Text>

      <TouchableHighlight
        style={tw`rounded-lg bg-slate-700 font-bold py-2 px-4`}
      >
        <Text
          style={tw`text-center text-white text-xl tracking-wide font-bold`}
          onPress={handleSubmit(onSubmit)}
        >
          Register
        </Text>
      </TouchableHighlight>
    </View>
  );
};

export default ResetPassword;
