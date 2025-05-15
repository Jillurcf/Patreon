import {InteractionManager, StatusBar, StyleSheet, View} from 'react-native';
// import {getSocket, initiateSocket} from '../../redux/services/socket';

import React, { useEffect } from 'react';
import FastImage from 'react-native-fast-image';
// import {NavigProps} from '../../interfaces/NaviProps';
// import { getStorageToken, lStorage } from '../utils/utils';
import tw from '../lib/tailwind';
// import { useLazyGetCheckTokenQuery } from '../redux/apiSlices/authSlice';
import { router, useRouter } from 'expo-router';

import { lStorage } from '../utils';
import { usePostCheckTokenMutation } from '../redux/apiSlice/authSlice';
// import {getStorageToken} from '../../utils/utils';

const LoadingSplash = () => {
 
  const [postCheckToken, { data, error, isLoading }] = usePostCheckTokenMutation()
 const token = lStorage.getString("token")

 
 const router = useRouter();

 useEffect(() => {
   const task = InteractionManager.runAfterInteractions(async () => {
     try {
       const res = await postCheckToken(token);
       console.log(res, 'res after sending');
       if (res?.data?.success === true) {
         router.replace('/(drawer)/(tab)');
       } else {
        router.replace('/screens/auth/onboarding1');
       }
     } catch (err) {
       router.replace('/screens/auth/onboarding1');
     }
   });

   return () => task.cancel();
 }, []);


  return (
    <View style={tw`flex-1 w-full bg-black justify-center items-center`}>
      <FastImage
        style={tw`w-28 h-28 flex-1 `}
        resizeMode={FastImage.resizeMode.contain}
        source={require('../assets/images/logo.png')}
      />
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
    </View>
  );
};

export default LoadingSplash;

const styles = StyleSheet.create({});
