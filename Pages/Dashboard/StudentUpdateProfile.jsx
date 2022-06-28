import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import tw from 'twrnc';

const StudentUpdateProfile = ({ navigation }) => {
  const { navigate } = navigation;
  const [deptOpen, setDeptOpen] = useState(false);
  const [deptValue, setDeptValue] = useState(null);
  const [studentInfo, setStudentInfo] = useState({});

  const [facultyOpen, setFacultyOpen] = useState(false);
  const [facultyValue, setFacultyValue] = useState(null);
  const [faculty, setFaculty] = useState([
    { label: 'Electrical & Computer Engineering', value: 'electrical' },
    { label: 'Civil Engineering', value: 'civil' },
    { label: 'Mechanical Engineering', value: 'mechanical' },
  ]);
  const [ECEDept, setECEDept] = useState([
    { label: 'CSE', value: 'cse' },
    { label: 'EEE', value: 'eee' },
    { label: 'ETE', value: 'ete' },
    { label: 'ECE', value: 'ece' },
  ]);
  const [CEDept, setCEDept] = useState([
    { label: 'CE', value: 'ce' },
    { label: 'Arch', value: 'arch' },
    { label: 'URP', value: 'urp' },
    { label: 'BECM', value: 'becm' },
  ]);
  const [MEDept, setMEDept] = useState([
    { label: 'ME', value: 'me' },
    { label: 'GCE', value: 'gce' },
    { label: 'MTE', value: 'mte' },
    { label: 'MSE', value: 'mse' },
    { label: 'IPE', value: 'ipe' },
    { label: 'CFPE', value: 'cfpe' },
  ]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      full_name: '',
      roll: '',
      series: '',
      contact_number: '',
    },
  });
  // console.log(facultyValue);
  const onSubmit = (data) => {
    console.log(data);
    console.log(facultyValue);
    console.log(deptValue);

    setStudentInfo({ ...data, faculty: facultyValue, dept: deptValue });
  };

  useEffect(() => {
    if (studentInfo) {
      fetch('http://localhost:5000/studentDetails', {
        method: 'POST',
        body: JSON.stringify(studentInfo),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      Toast.show({
        type: 'success',
        text1: 'Info Updated',
        text2: 'Congratulations 👋',
      });
      navigate('Student Home');
    }
  }, [studentInfo]);

  return (
    <SafeAreaView>
      <View style={tw`px-5 mt-6`}>
        <View>
          <Text style={tw`text-center font-bold text-green-500 text-2xl my-4`}>
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

          <View style={[tw`mb-3 z-50`]}>
            <Text
              style={[
                tw`font-semibold text-purple-600 ml-1 mb-1`,
                { fontSize: 18 },
              ]}
            >
              Faculty
            </Text>
            <DropDownPicker
              open={facultyOpen}
              value={facultyValue}
              items={faculty}
              setValue={setFacultyValue}
              setItems={setFaculty}
              setOpen={setFacultyOpen}
              style={[tw`bg-gray-200 w-full px-4 py-3 border-0`]}
              containerStyle={[tw`border-0 bg-gray-200 rounded-lg`]}
              dropDownContainerStyle={[
                tw``,
                {
                  backgroundColor: '#E5E7EB',
                  borderRadius: 10,
                  zIndex: 1,
                  borderWidth: 0,
                },
              ]}
            />
          </View>

          <View style={[tw`mb-3 z-40`]}>
            <Text
              style={[
                tw`font-semibold text-purple-600 ml-1 mb-1`,
                { fontSize: 18 },
              ]}
            >
              Department
            </Text>
            <DropDownPicker
              open={deptOpen}
              value={deptValue}
              items={
                facultyValue === 'electrical'
                  ? ECEDept
                  : facultyValue === 'civil'
                  ? CEDept
                  : MEDept
              }
              setValue={setDeptValue}
              setItems={
                facultyValue === 'electrical'
                  ? setECEDept
                  : facultyValue === 'civil'
                  ? setCEDept
                  : setMEDept
              }
              setOpen={setDeptOpen}
              style={[tw`bg-gray-200 w-full px-4 py-3 border-0`]}
              containerStyle={[tw`border-0 bg-gray-200 rounded-lg`]}
              dropDownContainerStyle={[
                tw``,
                {
                  backgroundColor: '#E5E7EB',
                  borderRadius: 10,
                  zIndex: 1,
                  borderWidth: 0,
                },
              ]}
            />
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
                pattern: {
                  value: /^[0-9]{2}$/,
                  message: 'Invalid Series Format',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={tw`rounded-lg bg-gray-200 w-full px-4 py-3`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Series. Ex: 19"
                  keyboardType="numeric"
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
                  placeholder="Enter Your Roll"
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

          <View style={tw`mb-3`}>
            <Text
              style={[
                tw`font-semibold text-purple-600 ml-1 mb-1`,
                { fontSize: 18 },
              ]}
            >
              Contact Number
            </Text>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Contact is required',
                },
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: 'Invalid Contact Number',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={tw`rounded-lg bg-gray-200 w-full px-4 py-3`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Your Contact Number"
                  keyboardType="numeric"
                />
              )}
              name="contact_number"
            />
            {errors.contact_number && (
              <Text style={tw`text-sm font-bold text-red-600`}>
                {errors.contact_number?.message}
              </Text>
            )}
          </View>

          <TouchableHighlight
            style={tw`rounded-lg bg-slate-700 font-bold py-2 px-4 my-3`}
          >
            <Text
              style={tw`text-center text-white text-xl tracking-wide font-bold`}
              onPress={handleSubmit(onSubmit)}
            >
              Update Profile Now
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StudentUpdateProfile;
