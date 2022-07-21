import { signOut } from 'firebase/auth';
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

  // console.log(user.email);
  // console.log(info);

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
                style={tw`text-center text-2xl font-semibold text-slate-700`}
                onPress={() => navigate('Dept Clearance')}
              >
                Dept Clearance
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={tw`rounded-lg w-6/12 bg-[#dddeee] font-bold p-2 h-[100px] flex-row items-center justify-center`}
            >
              <Text
                style={tw`text-center text-2xl font-semibold`}
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
              style={tw`rounded-lg w-6/12 bg-[#dddeee] font-bold p-2 h-[100px] flex-row items-center justify-center mr-2`}
            >
              <Text
                style={tw`text-center text-2xl font-semibold text-black`}
                onPress={() => navigate('Accounts and Admin Clearance')}
              >
                Accounts and Admin Clearance
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={tw`rounded-lg w-6/12 bg-[#dddeee] font-bold p-2 h-[100px] flex-row items-center justify-center`}
            >
              <Text
                style={tw`text-center text-2xl font-semibold`}
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
