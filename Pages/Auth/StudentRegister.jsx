import { useEffect } from 'react';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { Controller, useForm } from 'react-hook-form';
import { Image, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Toast from 'react-native-toast-message';
import tw from 'twrnc';
import registerImg from '../../assets/image/StudentSignup.png';
import auth from '../../firebase.init';
import LoadingComponent from '../Shared/LoadingComponent';

const StudentRegister = ({ navigation }) => {
  const { navigate } = navigation;
  const [createUserWithEmailAndPassword, formUser, formLoading, formError] =
    useCreateUserWithEmailAndPassword(auth);
  const [user, loading, error] = useAuthState(auth);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    Toast.show({
      type: 'success',
      text1: 'Account Created Successfully',
      text2: `Congratulations ${data.email}👋`,
    });
  };

  useEffect(() => {
    if (user || formUser) {
      reset();
      navigate('Update Profile');
    }
  }, [user, formUser]);

  if (loading) {
    return <LoadingComponent />;
  }
  if (error) {
    Toast.show({
      type: 'success',
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
        <Image source={registerImg} style={tw`w-32 h-32 mx-auto`} />
      </View>
      <Text style={tw`text-xl text-center mb-5 font-bold text-red-600`}>
        Create Account
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
      <View style={tw`mb-3`}>
        <Text
          style={[tw`font-semibold text-purple-600 ml-1`, { fontSize: 18 }]}
        >
          Confirm Password
        </Text>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Confirm password is required',
            },
            validate: (val) => {
              if (watch('password') != val) {
                return 'Your passwords do no match';
              }
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
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <Text style={tw`text-sm font-bold text-red-600`}>
            {errors.confirmPassword?.message}
          </Text>
        )}
      </View>

      <Text style={tw`text-[4] mb-3 ml-1`}>
        Already have an account?{' '}
        <Text
          onPress={() => navigate('Login')}
          style={tw`text-blue-600 underline`}
        >
          Login Now
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

export default StudentRegister;
