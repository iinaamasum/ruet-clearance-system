import React from 'react';
import { Image, View } from 'react-native';
import tw from 'twrnc';
import loadingImg from '../../assets/icon/Curve-Loading.gif';

const LoadingComponent = () => {
  return (
    <View style={tw`flex justify-center items-center h-full mx-auto`}>
      <Image source={loadingImg} style={tw` w-56 h-56`} />
    </View>
  );
};

export default LoadingComponent;
