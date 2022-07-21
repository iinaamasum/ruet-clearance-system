import axios from 'axios';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import tw from 'twrnc';
import userImg from '../../assets/image/studentLogin.png';
import auth from '../../firebase.init';
import useStudentInfoFetch from '../Hooks/useStudentInfoFetch';

const StudentHome = ({ navigation }) => {
  const [user] = useAuthState(auth);
  const [info] = useStudentInfoFetch(user.email);
  if (!user) return <LoadingComponent />;
  const { navigate } = navigation;
  const [deptCData, setDeptCData] = useState({});
  const [hallCData, setHallCData] = useState({});
  const [adminCData, setAdminCData] = useState({});
  const [othersCData, setOthersCData] = useState({});

  useEffect(() => {
    if (user.email) {
      axios
        .get(
          `http://localhost:5000/dept-clearance-application?email=${user.email}`
        )
        .then((res) => setDeptCData(res.data));
    }
  }, [navigate, user]);
  useEffect(() => {
    if (user.email) {
      axios
        .get(
          `http://localhost:5000/hall-clearance-application?email=${user.email}`
        )
        .then((res) => setHallCData(res.data));
    }
  }, [navigate, user]);
  // useEffect(() => {
  //   if (user.email) {
  //     axios
  //       .get(
  //         `http://localhost:5000/admin-clearance-application?email=${user.email}`
  //       )
  //       .then((res) => setAdminCData(res.data));
  //   }
  // }, [navigate, user]);
  // useEffect(() => {
  //   if (user.email) {
  //     axios
  //       .get(
  //         `http://localhost:5000/others-clearance-application?email=${user.email}`
  //       )
  //       .then((res) => setOthersCData(res.data));
  //   }
  // }, [navigate, user]);

  const handleLogOut = () => {
    signOut(auth);
    navigate('Login');
  };

  return (
    <View style={tw``}>
      <View style={tw`flex-row items-center justify-between bg-gray-200 px-2`}>
        <View style={tw`flex-row items-center`}>
          <Image source={userImg} style={tw`w-16 h-16`} />
          <Text style={tw`text-xl font-semibold text-green-600`}>
            {info.full_name || 'user'}
          </Text>
        </View>
        <TouchableHighlight style={tw`rounded-lg bg-slate-700 font-bold p-2`}>
          <Text style={tw`text-center text-white`} onPress={handleLogOut}>
            LogOut
          </Text>
        </TouchableHighlight>
      </View>

      <View>
        <Text style={tw`text-2xl text-purple-600 mt-4 font-bold pl-5`}>
          Clearance Options :{' '}
          <Text style={tw`text-black`}>Please Select One</Text>
        </Text>
        <View>
          <View
            style={tw`flex-row items-center justify-between pl-5 pr-7 pt-2`}
          >
            <TouchableHighlight
              style={tw`rounded-lg w-6/12 bg-[#dddeee] font-bold p-2 h-[100px] flex-row items-center justify-center mr-2`}
            >
              <Text
                style={tw`text-xl font-semibold`}
                onPress={() => {
                  if (!deptCData?.full_name) navigate('Dept Clearance');
                }}
              >
                {deptCData?.full_name
                  ? 'Already Applied for Dept Clearance'
                  : 'Dept Clearance'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={tw`rounded-lg w-6/12 bg-[#dddeee] font-bold p-2 h-[100px] flex-row items-center justify-center`}
            >
              <Text
                style={tw`text-xl font-semibold`}
                onPress={() => {
                  if (!hallCData?.full_name) navigate('Hall Clearance');
                }}
              >
                {hallCData?.full_name
                  ? 'Already Applied for Hall Clearance'
                  : 'Hall Clearance'}
              </Text>
            </TouchableHighlight>
          </View>
          <View
            style={tw`flex-row items-center justify-between pl-5 pr-7 pt-4 pt-5`}
          >
            <TouchableHighlight
              style={tw`rounded-lg w-6/12 bg-[#dddeee] font-bold p-2 h-[100px] flex-row items-center justify-center mr-2`}
            >
              <Text
                style={tw`text-xl font-semibold`}
                onPress={() => {
                  if (!adminCData?.full_name)
                    navigate('Accounts and Admin Clearance');
                }}
              >
                {adminCData?.full_name
                  ? 'Already Applied for Accounts and Admin Clearance'
                  : 'Accounts and Admin Clearance'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={tw`rounded-lg w-6/12 bg-[#dddeee] font-bold p-2 h-[100px] flex-row items-center justify-center`}
            >
              <Text
                style={tw`text-xl font-semibold`}
                onPress={() => {
                  if (!othersCData?.full_name) navigate('Others');
                }}
              >
                {othersCData?.full_name
                  ? 'Already Applied for Others'
                  : 'Others'}
              </Text>
            </TouchableHighlight>
          </View>
          <TouchableHighlight
            style={tw`rounded-lg bg-slate-700 font-bold py-2 px-4 mt-5 w-2/3 mx-auto`}
          >
            <Text
              style={tw`text-center text-white text-xl tracking-wide font-semibold`}
              onPress={() => navigate('Report Error')}
            >
              Report A Problem
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default StudentHome;
