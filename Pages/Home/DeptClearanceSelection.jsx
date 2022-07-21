import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { SafeAreaView, Text, TouchableHighlight, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import tw from 'twrnc';
import auth from '../../firebase.init';

const DeptClearanceSelection = () => {
  const [user] = useAuthState(auth);
  const { navigate } = navigation;
  const [deptOpen, setDeptOpen] = useState(false);
  const [deptValue, setDeptValue] = useState(null);
  const [studentInfo, setStudentInfo] = useState({});
  const [info, setInfo] = useState();

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

  const onSubmit = (data) => {
    console.log(data);
    console.log(facultyValue);
    console.log(deptValue);

    setStudentInfo({
      ...data,
      faculty: facultyValue,
      dept: deptValue,
      email: user.email,
    });
  };

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/studentDetails?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setStudentInfo(data));
    }
  }, [user]);

  return (
    <SafeAreaView>
      <View style={tw`px-5 mt-6`}>
        <View>
          <Text
            style={tw`text-center font-bold text-purple-600 text-2xl my-1 capitalize`}
          >
            Departmental clearance form
          </Text>
          <Text style={tw`text-gray-500 mb-3 px-2`}>
            The application is directly sent to the department head from which
            you want to get clearance.
          </Text>

          <View>
            <Text
              style={[
                tw`font-semibold text-green-600 ml-1 mb-1 text-center`,
                { fontSize: 18 },
              ]}
            >
              Your Info
            </Text>
            <View>
              <Text
                style={[
                  tw`font-semibold text-purple-600 ml-1 mb-1`,
                  { fontSize: 18 },
                ]}
              >
                Name
              </Text>
              <Text>{info?.full_name}</Text>
            </View>
          </View>

          <View style={[tw`mb-3 z-50`]}>
            <Text
              style={[
                tw`font-semibold text-purple-600 ml-1 mb-1`,
                { fontSize: 18 },
              ]}
            >
              Select the Faculty
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
              Choose the Department for clearance
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

          <TouchableHighlight
            style={tw`rounded-lg bg-slate-700 font-bold py-2 px-4 my-3`}
          >
            <Text
              style={tw`text-center text-white text-xl tracking-wide font-bold`}
              onPress={handleSubmit(onSubmit)}
            >
              Request for Clearance
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeptClearanceSelection;
