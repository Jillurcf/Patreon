import {StatusBar, StyleSheet, View} from 'react-native';
// import {getSocket, initiateSocket} from '../../redux/services/socket';

import React, { useEffect } from 'react';
import FastImage from 'react-native-fast-image';
// import {NavigProps} from '../../interfaces/NaviProps';
// import { getStorageToken, lStorage } from '../utils/utils';
import tw from '../lib/tailwind';
// import { useLazyGetCheckTokenQuery } from '../redux/apiSlices/authSlice';
import { router } from 'expo-router';
// import {getStorageToken} from '../../utils/utils';

const LoadingSplash = () => {
 
//   const [triggerCheckToken, { data, error, isLoading }] = useLazyGetCheckTokenQuery()
//  const token = lStorage.getString("token")

 
//   const handleCheckValidToken = async () => {
//     try {
//       const res = await triggerCheckToken(token).unwrap();
//       // const res = await checkToken(token).unwrap();
//       console.log("loading token++++++++++++++++++++++", res)
//       if (res?.token_status === true) {
//         router.push('BottomHome');
//       } else {
//         router.push('auth/login');
//       }
//     } catch (error) {
//       console.log("28", error);
//       router.push('auth/login');
//     }
//   };
//   React.useEffect(() => {
//     if (token) {
//       handleCheckValidToken();
//     } else {
//       router.push('auth/login');
//     }
//   }, []);

    useEffect(()=> {
       const timer = setTimeout(()=> {
        router.push("/screens/auth/onboarding1")
       }, 1000)

       return ()=> clearTimeout(timer)
    }, [])

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
