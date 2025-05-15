import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import tw from '../../lib/tailwind';
import { SvgXml } from 'react-native-svg';
import {
  IconBack,
  IconPencil,
  IconPlus,
} from '../../assets/icons/icons';
import TButton from '../../components/TButton';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system";
import { router } from 'expo-router';
import { useGetUserQuery, usePatchUpdateUserProfileMutation } from '@/src/redux/apiSlice/userSlice';
import { imageUrl } from '@/src/redux/baseApi';
// import { useGetUserQuery, usePatchUpdateUserProfileMutation } from '@/src/redux/apiSlice/userSlice';


const SettingProfile = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { data, isLoading, isError } = useGetUserQuery({});
  const [patchUpdateUserProfile] = usePatchUpdateUserProfileMutation();
  console.log(data, "data======================")
  const fullImageUrl = data?.data?.image ? `${imageUrl}/${data.data.image}` : null;



  const selectImage = async () => {
    console.log("click");
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result, "result +++++++++++++++++++");

      if (!result.canceled && result.assets.length > 0) {
        const file = result.assets[0];
        setImageUri(file.uri);

        const fileName = file.uri.split("/").pop() || "photo.jpg";
        const match = /\.(\w+)$/.exec(fileName);
        const fileType = match ? `image/${match[1]}` : `image`;

        const fileInfo = await FileSystem.getInfoAsync(file.uri);
        if (!fileInfo.exists) {
          throw new Error("File does not exist");
        }

        const formData = new FormData();
        formData.append("image", {
          uri: file.uri,
          name: fileName,
          type: fileType,
        } as any);

        const res = await patchUpdateUserProfile(formData)
        console.log("Image updated:", res);
        // const response = await fetch("http://10.0.80.85:3004/api/users/auth/update-profile-by-user", {
        //   method: "PATCH",
        //   body: formData,
        //   // ❌ Don't set Content-Type manually
        // });

        // const data = await response.json();
        console.log("Image uploaded:", data);
      }
    } catch (error) {
      console.error("Image selection error:", error);
    }
  };




  return (
    <View style={tw`bg-black flex-1 mt-4`}>
      {/* Header */}
      <View style={tw`flex-row w-full justify-between mt-4 px-[4%]`}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`bg-PrimaryFocus rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          Profile
        </Text>
        <View style={tw`w-8`} />
      </View>

      {/* Profile Image */}
      <View style={tw`flex items-center justify-center mt-8`}>
        <TouchableOpacity onPress={selectImage}>
          <View style={tw`relative`}>
            <View
              style={tw`w-18 h-18 bg-gray-400 rounded-full overflow-hidden mx-auto justify-center items-center`}>
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={tw`w-full h-full`}
                  resizeMode="cover"
                />
              ) : <Image
                source={{ uri: fullImageUrl }}
                style={tw`w-full h-full`}
                resizeMode="cover"
              />}


            </View>
            <View style={tw`absolute bottom-0 right-0 bg-gray-200 rounded-full p-2`}>
              <SvgXml xml={IconPlus} width={16} height={16} />
            </View>
          </View>
        </TouchableOpacity>

        {/* User Info */}
        <Text style={tw`text-white font-AvenirLTProBlack text-lg mt-2`}>
          {data?.data?.username || 'Username'}
        </Text>
        <Text style={tw`text-white font-AvenirLTProBlack`}>
          {data?.data?.bio || 'Bio'}
        </Text>
      </View>

      {/* Stats Box */}
      <View style={tw`flex items-center justify-center my-8`}>
        <View style={tw`bg-[#262329] w-[90%] h-20 rounded-2xl flex-row items-center justify-between`}>
          <View style={tw`border-r-2 w-[33%] h-12 border-[#091218] items-center justify-center`}>
            <TouchableOpacity>
              <Text style={tw`text-white text-center font-AvenirLTProBlack text-xl`}>
                {data?.data?.subscriptions}
              </Text>
              <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
                Subscriptions
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tw`border-r-2 w-[33%] h-12 border-[#091218] items-center justify-center`}>
            <TouchableOpacity>
              <Text style={tw`text-white text-center font-AvenirLTProBlack text-xl`}>
                {data?.data?.subscriberCount}
              </Text>
              <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
                Subscribers
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/screens/EditProfile')}
            style={tw`w-[33%] items-center justify-center`}>
            <SvgXml xml={IconPencil} />
            <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
              Edit profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contributor Box */}
      <View style={tw`items-center justify-center`}>
        <View style={tw`bg-[#262329] w-[90%] mt-6 rounded-2xl p-[6%]`}>
          <Text style={tw`text-white text-xl text-center font-AvenirLTProBlack`}>
            Become A Contributor
          </Text>
          <Text style={tw`text-white text-center font-AvenirLTProBlack`}>
            Consult People anytime anywhere
          </Text>
          <View style={tw`w-full items-center mt-8`}>
            <TButton
              onPress={() => router.push('/screens/EnterInputScreen')}
              title="Become a contributor"
              titleStyle={tw`text-black`}
              containerStyle={tw`w-full bg-white`}
            />
          </View>
        </View>
      </View>

      <StatusBar backgroundColor="black" translucent />
    </View>
  );
};

export default SettingProfile;

const styles = StyleSheet.create({});
