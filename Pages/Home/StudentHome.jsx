import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import tw from 'twrnc';
import userImg from '../../assets/image/studentLogin.png';
import auth from '../../firebase.init';

const StudentHome = ({ navigation }) => {
  const [user] = useAuthState(auth);
  const [info, setInfo] = useState({});
  if (!user) return <LoadingComponent />;
  const { navigate } = navigation;

  // console.log(user.email);
  // console.log(info);

  const handleLogOut = () => {
    signOut(auth);
    navigate('Login');
  };

  useEffect(() => {
    if (user.email) {
      fetch(`http://localhost:5000/studentDetails?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setInfo(data));
    }
  }, [user.email]);
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
        <Text style={tw`text-2xl text-purple-600 mt-4 text-center font-bold`}>
          Clearance Options
        </Text>
        <View>
          <View
            style={tw`flex-row items-center justify-between pl-5 pr-7 pt-6`}
          >
            <TouchableHighlight
              style={tw`rounded-lg w-6/12 bg-[#0FCFEC] font-bold p-2 h-[100px] flex-row items-center justify-center mr-2`}
            >
              <Text
                style={tw`text-center text-2xl font-semibold text-slate-700`}
                onPress={() => navigate('Dept Clearance')}
              >
                Dept Clearance
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={tw`rounded-lg w-6/12 bg-[#19D3AE] to-[#0FCFEC] font-bold p-2 h-[100px] flex-row items-center justify-center`}
            >
              <Text
                style={tw`text-center text-2xl font-semibold text-white`}
                onPress={() => navigate('Hall Clearance')}
              >
                Hall Clearance
              </Text>
            </TouchableHighlight>
          </View>
          <View
            style={tw`flex-row items-center justify-between pl-5 pr-7 pt-4 pt-5`}
          >
            <TouchableHighlight
              style={tw`rounded-lg w-6/12 bg-[#19D3AE] font-bold p-2 h-[100px] flex-row items-center justify-center mr-2`}
            >
              <Text
                style={tw`text-center text-2xl font-semibold text-black`}
                onPress={() => navigate('Accounts and Admin Clearance')}
              >
                Accounts and Admin Clearance
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={tw`rounded-lg w-6/12 bg-[#0FCFEC] font-bold p-2 h-[100px] flex-row items-center justify-center`}
            >
              <Text
                style={tw`text-center text-2xl font-semibold text-white`}
                onPress={() => navigate('Others')}
              >
                Others
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
