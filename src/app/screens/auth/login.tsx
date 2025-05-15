import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import tw from '../../../lib/tailwind';
import InputText from '../../../components/InputText';

import { Checkbox } from 'react-native-ui-lib';
import Button from '../../../components/Button';
import { SvgXml } from 'react-native-svg';
import {
    IconBack,
    IconCloseEye,
    IconEnvelope,
    IconGoogle,
    iconLock,
    IconOpenEye,
    IconUser,
} from '../../../assets/icons/icons';
import TButton from '../../../components/TButton';
import { router } from 'expo-router';
import { getStorageToken, lStorage, setStorageToken } from '@/src/utils';
// import { useLoginUserMutation } from '@/src/redux/apiSlice/authSlice';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { useLoginUserMutation } from '@/src/redux/apiSlice/authSlice';

// import {useSignupMutation} from '../../redux/api/apiSlice/apiSlice';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [checkValue, setCheckValue] = useState(false);
    const [loginError, setLoginError] = useState();
    const [loginUser, {isLoading, isError}] = useLoginUserMutation();
    console.log('27', email, password);
    // const data = {email, password, name:username, address:location}

    const allFilled =
        email.trim() !== '' &&
        password.trim() !== ''

    console.log(allFilled, "allFilled")

    const handleLogin = async () => {
        if (!email || !password) {
        //   setAllFieldModalVisible(true)
          return;
        }
        // const fcmtoken = lStorage.getString('fcmToken')
        // console.log("fcmToken", fcmtoken)
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        // formData.append('device_token', fcmtoken)
    
        console.log('FormData before sending:', formData);
    
        try {
          console.log("Try catch click")
          const res = await loginUser(formData).unwrap();
          setLoginError(res)
          console.log("login res++++++++", res?.data?.token)
          if (res?.data?.token) {
            lStorage.setString('token', res?.data?.token);
            setStorageToken(res?.data?.token);
           const token = getStorageToken();
           console.log(token, "token++++++ after set")
           router.replace('/');
           router.replace('/(drawer)/(tab)');
          }
    
          console.log('Login successful:', res);
    
        } catch (error) {
          console.error('Login failed:', error);
          setLoginError(error)
        }
      };
    
    //   useEffect(() => {
    //     if (googleUser?.photo) {
    //       const processImage = async () => {
    //         try {
    //           const resizedImage = await ImageResizer.createResizedImage(
    //             googleUser.photo,
    //             96,
    //             96,
    //             'JPEG',
    //             100,
    //             0,
    //           );
    
    //           console.log('Resized Image Path:', resizedImage.uri);
    
    //           setResizeImg(prev => [
    //             ...prev,
    //             {
    //               uri: resizedImage.uri,
    //               name: `image_${Date.now()}.jpeg`, // Use unique names
    //               type: 'jpeg',
    //             },
    //           ]);
    
    //           // Alert.alert('Image Processed', `Image saved at: ${resizedImage.uri}`);
    //         } catch (error) {
    //           console.error('Image Processing Error:', error);
    //           console.log('Error', 'Failed to process the image.');
    //         }
    //       };
    
    //       processImage();
    //     }
    //   }, [googleUser?.photo]);
    
    //   const handleGoogleLogin = async () => {
    //     try {
    //       // Ensure Google Play services are available
    //       await GoogleSignin.hasPlayServices();
    //       const response = await GoogleSignin.signIn();
    //       console.log('125', response?.data?.user);
    
    //       if (response?.data?.user) {
    //         const { name, email, id: google_id, photo } = response?.data?.user;
    //         // Set the Google user data for further processing
    //         setGoogleUser({ name, email, google_id, photo });
    //         console.log('Google Sign-In Successful:', photo, name, email, google_id);
    
    //         // Resize the image if photo exists
    //         let resizedImage = null;
    //         if (photo) {
    //           try {
    //             resizedImage = await ImageResizer.createResizedImage(
    //               photo,
    //               96,
    //               96,
    //               'JPEG',
    //               100,
    //               0,
    //             );
    
    //             console.log('Resized Image Path:', resizedImage.uri);
    //           } catch (error) {
    //             console.error('Image Processing Error:', error);
    //             console.log('Error', 'Failed to process the image.');
    //           }
    //         }
    
    //         // Send data to the backend
    //         try {
    //           const fcmtoken = lStorage.getString('fcmToken');
    //           const formData = new FormData();
    //           formData.append('full_name', name);
    //           formData.append('email', email);
    //           formData.append('google_id', google_id);
    //           formData.append('device_token', fcmtoken);
    
    //           console.log('179', resizedImage);
    
    //           // Append photo (either the resized image or original)
    //           if (resizedImage) {
    //             formData.append("avatar", {
    //               uri: resizedImage.uri, // Ensure uri is not null or undefined
    //               name: `profile_${Date.now()}.jpeg`, // Unique name for the photo
    //               type: "image/jpeg", // Correct MIME type
    //             });
    //           } else if (photo) {
    //             formData.append("avatar", {
    //               uri: photo, // Use original photo if resized image doesn't exist
    //               name: `profile_${Date.now()}.jpeg`, // Unique name for the photo
    //               type: "image/jpeg", // Correct MIME type
    //             });
    //           }
    
    //           console.log('FormData ready. Sending request...');
    //           const apiResponse = await soicalLogin(formData).unwrap();
    //           console.log('Upload Successful:', apiResponse);
    
    //           if (apiResponse?.access_token) {
    //             const res = lStorage.setString('token', apiResponse?.access_token);
    //             // const res = setStorageToken(apiResponse?.access_token);
    //             console.log("google token", res);
    //             navigation?.replace('LoadingSplash');
    //           }
    //         } catch (error) {
    //           console.error('Error during upload:', error?.data?.message || error.message || error);
    //           console.log('Wrong somewhere', 'Please try again');
    //         }
    //       } else {
    //         console.log('Google Sign-In Cancelled by User');
    //       }
    //     } catch (error) {
    //       console.error('Google Sign-In Error:', error);
    
    //       // Handle specific Google Sign-In errors
    //       if (error.code) {
    //         switch (error.code) {
    //           case statusCodes.IN_PROGRESS:
    //             console.log('Google Sign-In already in progress.');
    //             break;
    //           case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
    //             console.log('Google Play Services not available or outdated.');
    //             break;
    //           case statusCodes.SIGN_IN_CANCELLED:
    //             console.log('User cancelled the Google Sign-In process.');
    //             break;
    //           case statusCodes.SIGN_IN_REQUIRED:
    //             console.log('Sign-in is required but has not yet occurred.');
    //             break;
    //           default:
    //             console.log('An unknown error occurred:', error.message);
    //         }
    //       } else {
    //         console.log('An unexpected error occurred:', error);
    //       }
    //     }
    //   };
    

    return (
        <ScrollView
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`bg-black flex-1 px-[4%] h-full justify-between`}>
            <View>
                <View style={tw`flex-row w-full justify-between mt-4`}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={tw`bg-PrimaryFocus rounded-full p-1`}>
                        <SvgXml xml={IconBack} />
                    </TouchableOpacity>
                    <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
                        Login into your account!
                    </Text>
                    {/* Placeholder view for symmetry */}
                    <View style={tw`w-8`} />
                </View>
                <View>


                    <View style={tw`mt-12`}>
                        <InputText
                            cursorColor="white"
                            style={tw`text-white`}
                            containerStyle={tw`bg-none h-14 border-b border-[#565358]`}
                            labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
                            placeholder={'Write it here'}
                            placeholderColor={'#949494'}
                            label={'Email'}
                            iconLeft={IconEnvelope}
                            // iconRight={isShowPassword ? iconLock : iconLock}
                            onChangeText={(text: any) => setEmail(text)}
                        // isShowPassword={!isShowPassword}
                        // rightIconPress={() => setIsShowPassword(!isShowPassword)}
                        />
                        <InputText
                            cursorColor="white"
                            style={tw`text-white`}
                            containerStyle={tw`bg-none h-14 border-b border-[#565358]`}
                            labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
                            placeholder={'Write it here'}
                            placeholderColor={'#949494'}
                            label={'Password'}
                            iconLeft={iconLock}
                            iconRight={isShowPassword ? IconOpenEye : IconCloseEye}
                            onChangeText={(text: any) => setPassword(text)}
                            isShowPassword={!isShowPassword}
                            rightIconPress={() =>
                                setIsShowPassword(!isShowPassword)
                            }
                        />
                    </View>
                    <View style={tw``}>
                        <Checkbox
                            value={checkValue}
                            onValueChange={setCheckValue}
                            label="By logging in you accept our TOS & PP"
                            labelStyle={tw`text-white`}
                            color="gray" // Tick color
                            containerStyle={tw`p-2`}
                            style={[
                                tw`border border-white`,
                                checkValue ? tw`bg-white` : tw`bg-none`,
                            ]}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: "/screens/auth/phoneVerification",
                                params: { screenName: "forgetPass" }
                            })
                        }
                        style={tw`mt-8`}>
                        <Text style={tw`text-white`}>Forget password</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={tw`flex-col justify-end `}>
                <Button
                    disabled={!allFilled}
                    title={'Continue'}
                    style={tw`${allFilled ? 'text-black' : 'text-gray-500'} font-AvenirLTProBlack items-center`}
                    containerStyle={tw`${allFilled ? 'bg-white' : 'bg-PrimaryFocus'} mt-4 h-14 rounded-2xl justify-center`}
                    onPress={handleLogin}
                />
            </View>
            <StatusBar backgroundColor="black" translucent={false} />
        </ScrollView>
    );
};

export default Login;
