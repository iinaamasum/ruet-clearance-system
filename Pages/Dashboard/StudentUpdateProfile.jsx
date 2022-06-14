import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableHighlight, View } from 'react-native';
import tw from 'twrnc';

const StudentUpdateProfile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      full_name: '',
      roll: '',
      dept: '',
      series: '',
      contact_number: '',
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    navigate('Student Home');
  };
  return (
    <View style={tw`px-5`}>
      <Text style={tw`text-center text-green-500 text-xl my-4`}>
        Please, Update Your Profile
      </Text>
      <View style={tw`mb-3`}>
        <Text
          style={[
            tw`font-semibold text-purple-600 ml-1 mb-1`,
            { fontSize: 18 },
          ]}
        >
          Full Name
        </Text>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Name is required',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`rounded-lg bg-gray-200 w-full px-4 py-3`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter Your Full Name"
            />
          )}
          name="full_name"
        />
        {errors.full_name && (
          <Text style={tw`text-sm font-bold text-red-600`}>
            {errors.full_name?.message}
          </Text>
        )}
      </View>

      <View style={tw`mb-3`}>
        <Text
          style={[
            tw`font-semibold text-purple-600 ml-1 mb-1`,
            { fontSize: 18 },
          ]}
        >
          Series
        </Text>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Series is required',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`rounded-lg bg-gray-200 w-full px-4 py-3`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter Your Series"
            />
          )}
          name="series"
        />
        {errors.series && (
          <Text style={tw`text-sm font-bold text-red-600`}>
            {errors.series?.message}
          </Text>
        )}
      </View>

      <View style={tw`mb-3`}>
        <Text
          style={[
            tw`font-semibold text-purple-600 ml-1 mb-1`,
            { fontSize: 18 },
          ]}
        >
          Roll
        </Text>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Roll is required',
            },
            pattern: {
              value: /^[0-9]{7}$/,
              message: 'Invalid Roll',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`rounded-lg bg-gray-200 w-full px-4 py-3`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter Your Full Name"
              keyboardType="numeric"
            />
          )}
          name="roll"
        />
        {errors.roll && (
          <Text style={tw`text-sm font-bold text-red-600`}>
            {errors.roll?.message}
          </Text>
        )}
      </View>

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
};

export default StudentUpdateProfile;
