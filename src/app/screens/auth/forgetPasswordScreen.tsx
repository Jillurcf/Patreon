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
// import {useSignupMutation} from '../../redux/api/apiSlice/apiSlice';

const ForgetPass = ({ navigation }: any) => {
    // console.log('navigation', navigation);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [checkValue, setCheckValue] = useState(false);
    // const [SignUp, {isLoading, isError}] = useSignupMutation();
    console.log('27', password, confirmPassword);
    // const data = {email, password, name:username, address:location}

    const allFilled =
        password.trim() !== ''
        confirmPassword.trim() !== ''

    console.log(allFilled, "allFilled")

    const handleSignup = async () => {
        try {
            // Validate required fields before sending the request
            if (!email || !password) {
                Alert.alert('Error', 'All fields are required.');
                return;
            }

            // const data = {
            //   email: email.trim(),
            //   password: password.trim(),
            //   name: username.trim(),
            //   address: location.trim(),
            // };

            // Send data through the SignUp function and unwrap the response
            // const response = await SignUp(data).unwrap();

            // console.log("Response from SignUp:", response);

            // if (response && response.status === true) {
            //   navigation?.navigate('VerifyOtp', { email, from: "signup" });
            // } else if (response && response.status === false) {
            //   // Extract error messages
            //   const errorMessages = [];
            //   if (response?.message) {
            //     Object.values(response.message).forEach((errors) => {
            //       if (Array.isArray(errors)) {
            //         errorMessages.push(...errors);
            //       } else {
            //         errorMessages.push(errors);
            //       }
            //     });
            //   }

            //   // Show Alert with error messages
            //   Alert.alert("Signup Failed", errorMessages.join("\n"));
            // }
        } catch (err) {
            console.error('Error during SignUp:', err);

            // Extract error messages
            // const errorMessages = [];
            // if (err?.message) {
            //   Object.values(err.message).forEach((errors) => {
            //     if (Array.isArray(errors)) {
            //       errorMessages.push(...errors);
            //     } else {
            //       errorMessages.push(errors);
            //     }
            //   });
            // }

            // // Show Alert with error messages or a default message
            // Alert.alert("Signup Error", errorMessages.length ? errorMessages.join("\n") : "An unexpected error occurred. Please try again.");
        }
    };

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
                        Reset your password
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
                            label={'Password'}
                            iconLeft={iconLock}
                            iconRight={isShowPassword ? IconOpenEye : IconCloseEye}
                            onChangeText={(text: any) => setPassword(text)}
                            isShowPassword={!isShowPassword}
                            rightIconPress={() =>
                                setIsShowPassword(!isShowPassword)
                            }
                        />
                        <InputText
                            cursorColor="white"
                            style={tw`text-white`}
                            containerStyle={tw`bg-none h-14 border-b border-[#565358]`}
                            labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
                            placeholder={'Write it here'}
                            placeholderColor={'#949494'}
                            label={'Confirm Password'}
                            iconLeft={iconLock}
                            iconRight={isShowConfirmPassword ? IconOpenEye : IconCloseEye}
                            onChangeText={(text: any) => setConfirmPassword(text)}
                            isShowPassword={!isShowConfirmPassword}
                            rightIconPress={() =>
                                setIsShowConfirmPassword(!isShowConfirmPassword)
                            }
                        />
                    </View>
                    
                   
                </View>
            </View>
            <View style={tw`flex-col justify-end `}>
                <Button
                    disabled={!allFilled}
                    title={'Continue'}
                    style={tw`${allFilled ? 'text-black' : 'text-gray-500'} font-AvenirLTProBlack items-center`}
                    containerStyle={tw`${allFilled ? 'bg-white' : 'bg-PrimaryFocus'} mt-4 h-14 rounded-2xl justify-center`}
                    onPress={() => {
                        if (allFilled) {
                            router.push("/screens/auth/verifyScreen");
                        } else {
                            Alert.alert('Please fill all fields');
                        }
                    }}
                />
            </View>
            <StatusBar backgroundColor="black" translucent={false} />
        </ScrollView>
    );
};

export default ForgetPass;
