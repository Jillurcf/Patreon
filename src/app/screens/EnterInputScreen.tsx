import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';

import { SvgXml } from 'react-native-svg';


import {
  BulbIcon,
  CrossIcon,
  Gallery,
  IconBack,
  IconUpload,
  StillCamera,
  VideoCam,
} from '../../assets/icons/icons';
import IButton from '../../components/IButton';
import TButton from '../../components/TButton';
import tw from '../../lib/tailwind';
import { router } from 'expo-router';
import { loadMediaPromptData, saveMediaPromptData } from '@/src/utils';


const EnterInput = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [promptInput, setPromptInput] = useState<string | null>("");
  useEffect(() => {
    const { selectedImages, promptInput } = loadMediaPromptData();
    setSelectedImages(selectedImages);
    setPromptInput(promptInput);
  }, []);

  console.log('Selected Images:', selectedImages, promptInput);

  // Open gallery to select images
  const openGallery = async () => {
    try {
      const images = await ImageCropPicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        cropping: true,
      });

      const imagePaths = images.map((image: any) => image.path);
      setSelectedImages(prev => [...prev, ...imagePaths]);
    } catch (error) {
      if (error.message !== 'User cancelled image selection') {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    }
  };

  // Open camera to capture images


  // Remove a specific image
  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  // Clear the captured video
  const handleSave = () => {
    console.log(selectedImages, promptInput, "data before sending========")
    saveMediaPromptData(selectedImages, null, promptInput);
    const { selectedImages: savedImages, promptInput: savedPrompt } = loadMediaPromptData();
    console.log(savedImages, savedPrompt, 'Retrieved data from storage ++++++++');
    Alert.alert('Saved', 'Your data has been saved successfully!');
    router.push("/screens/ExplainMembership")
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1 bg-black`}>
      <ScrollView
        contentContainerStyle={tw`flex-grow bg-black items-center justify-between px-4`}
        keyboardShouldPersistTaps="handled">
        <View style={tw`my-10`}>
          <View style={tw`flex-row w-full justify-between mt-4`}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={tw`bg-PrimaryFocus rounded-full p-1`}>
              <SvgXml xml={IconBack} />
            </TouchableOpacity>
            <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
              Enter Input
            </Text>
            <View style={tw`w-8`} />
          </View>

          {/* Input Area */}
          <View style={tw`mt-8`}>
            <Text style={tw`text-white py-2 font-AvenirLTProBlack`}>Prompt input</Text>
            <View style={tw`h-44 p-2 bg-[#262329] border border-[#565358] w-full rounded-lg`}>
              <TextInput
                value={promptInput}
                onChangeText={setPromptInput}
                style={tw`text-left h-40 text-white`}
                placeholder="Write it here"
                placeholderTextColor="#c7c7c7"
                multiline
                maxLength={120}
                textAlignVertical="top"
                underlineColorAndroid="transparent"
              />
            </View>
          </View>

          {/* Media Upload */}
          <View style={tw`my-6`}>
            <Text style={tw`text-white font-AvenirLTProBlack`}>Upload file</Text>
            <View style={tw`flex items-center bg-[#262329] mt-2 rounded-2xl py-8 border border-[#565358] justify-center`}>
              <View style={tw`flex-row gap-6`}>
                <TouchableOpacity onPress={openGallery}>
                  <SvgXml xml={IconUpload} />
                </TouchableOpacity>

                {/* <IButton containerStyle={tw`p-4 rounded-full`} svg={StillCamera} onPress={openCamera} />
              <IButton containerStyle={tw`p-4 rounded-full`} svg={VideoCam} onPress={captureVideo} /> */}
              </View>
              <Text style={tw`text-white my-4`}>Upload file (50 mb maximum)</Text>

              {/* Display selected images */}
              {selectedImages.length > 0 && (
                <View style={tw`flex-row flex-wrap gap-2 my-4`}>
                  {selectedImages.map((image, index) => (
                    <View key={index} style={tw`relative`}>
                      <TouchableOpacity
                      // onPress={() => navigation?.navigate('promptScreen')}
                      >
                        <Image source={{ uri: image }} style={tw`w-24 h-24 rounded-lg`} />
                      </TouchableOpacity>
                      <IButton
                        containerStyle={tw`absolute top-[-8px] right-[-8px] bg-red-500 rounded-full p-1`}
                        svg={CrossIcon}
                        onPress={() => handleRemoveImage(index)}
                      />
                    </View>
                  ))}
                </View>
              )}

              {/* Display captured video */}

            </View>
          </View>
        </View>

        {/* Continue Button */}
        <View style={tw`flex mb-6 my-12 items-center justify-center w-full`}>
          <TButton
            onPress={handleSave}
            titleStyle={tw`text-black font-bold text-center`}
            title="Save"
            containerStyle={tw`bg-primary w-[90%] rounded-full`}
          />
        </View>

        <StatusBar backgroundColor={'gray'} translucent={false} />
      </ScrollView>
    </KeyboardAvoidingView>

  );
};

export default EnterInput;
