import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Controller, useForm } from 'react-hook-form';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import tw from 'twrnc';
import auth from '../../firebase.init';
import useStudentInfoFetch from '../Hooks/useStudentInfoFetch';

const AccountsClearance = ({ navigation }) => {
  const [user] = useAuthState(auth);
  const { navigate } = navigation;
  const [info, setInfo] = useStudentInfoFetch(user.email);

  // console.log(info);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      due: 0,
      trx_id: 'NULL',
    },
  });

  const onSubmit = (data) => {
    // console.log(data);
    if (data.due > 0 && data.trx_id === 'NULL') {
      Toast.show({
        type: 'error',
        text1: 'Provide Transaction ID',
        text2: `You Have due and should be clear due before getting clearance.`,
      });
    } else {
      const { full_name, email, dept, roll, series, contact_number, faculty } =
        info;
      axios
        .post('http://localhost:5000/admin-clearance-application', {
          full_name,
          email,
          dept,
          roll,
          series,
          contact_number,
          faculty,
          ...data,
          admin_req: 'all',
          admin_get_clearance: 0,
        })
        .then((res) => {
          if (res.data.acknowledged === true) {
            reset();
            Toast.show({
              type: 'success',
              text1: 'Accounts Clearance Applied Successfully',
              text2: 'Congratulations 👋',
            });
            navigate('Student Home');
          }
        });
    }
  };

  return (
    <SafeAreaView>
      <View style={tw`px-5 mt-6`}>
        <View>
          <Text
            style={tw`text-center font-bold text-purple-600 text-2xl my-1 capitalize`}
          >
            Admin & Accounts Clearance Form
          </Text>
          <Text style={tw`text-gray-500 text-center mb-3 px-2`}>
            The application is directly sent to DSW.
          </Text>

          <View style={tw`ml-1 w-full`}>
            <Text
              style={tw`font-semibold text-green-600 mb-1 text-xl text-center`}
            >
              Your Info
            </Text>
            <View style={tw`flex-row items-center w-full`}>
              <View style={tw`w-1/2 mr-1`}>
                <Text
                  style={[
                    tw`font-semibold text-purple-600 mb-1`,
                    { fontSize: 18 },
                  ]}
                >
                  Your Name
                </Text>
                <Text style={tw`bg-gray-300 text-red-500 px-2 py-2 rounded-lg`}>
                  {info?.full_name}
                </Text>
              </View>

              <View style={tw`w-1/2`}>
                <Text
                  style={[
                    tw`font-semibold text-purple-600 mb-1`,
                    { fontSize: 18 },
                  ]}
                >
                  Your Email
                </Text>
                <Text style={tw`bg-gray-300 text-red-500 px-2 py-2 rounded-lg`}>
                  {info?.email}
                </Text>
              </View>
            </View>
          </View>

          <View style={tw`mt-3`}>
            <Text
              style={[
                tw`font-semibold text-purple-600 ml-1 mb-1`,
                { fontSize: 18 },
              ]}
            >
              Total Due
            </Text>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Dues required',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={tw`rounded-lg bg-gray-200 w-full px-4 py-3 focus:offset-none`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="If not applicable enter '0'"
                  keyboardType="numeric"
                />
              )}
              name="due"
            />
            {errors.due && (
              <Text style={tw`text-sm font-bold text-red-600`}>
                {errors.due?.message}
              </Text>
            )}
          </View>

          <View style={tw`mt-3`}>
            <Text
              style={[
                tw`font-semibold text-purple-600 ml-1 mb-1`,
                { fontSize: 18 },
              ]}
            >
              Transaction ID
            </Text>
            <Controller
              control={control}
              rules={{}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={tw`rounded-lg bg-gray-200 w-full px-4 py-3 focus:offset-none`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Due Amount"
                  keyboardType="text"
                />
              )}
              name="trx_id"
            />
          </View>
          <Text style={tw`text-[4] ml-1 mt-2`}>
            Want to pay dues?{' '}
            <Text
              style={tw`text-blue-600 underline`}
              onPress={() => navigate('Pay')}
            >
              Pay Now
            </Text>
          </Text>
          <TouchableHighlight
            style={tw`rounded-lg bg-slate-700 font-bold py-2 px-4 my-3`}
          >
            <Text
              style={tw`text-center text-white text-xl tracking-wide font-bold`}
              onPress={handleSubmit(onSubmit)}
            >
              Request for Admin Clearance
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountsClearance;
