import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Alert,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Pdf from 'react-native-pdf';
import tw from '../../lib/tailwind';
import { router } from 'expo-router';
import { loadMediaPromptData, saveMediaPromptData } from '@/src/utils';

import {
  IconBack,
  IconUpload,
  CrossIcon,
} from '../../assets/icons/icons';

import TButton from '../../components/TButton';
import WebView from 'react-native-webview';

const EnterInput = () => {
  const [promptInput, setPromptInput] = useState('');
  // const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState({
    assets: [
      {
        uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        name: 'dummy.pdf',
        size: 0,
        mimeType: 'application/pdf',
      },
    ],
    canceled: false,
  });

  const openFilePicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
    // Or if you use another picker that returns { assets, canceled } like your log

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const file = result.assets[0];

      const destPath = FileSystem.cacheDirectory + file.name;

      await FileSystem.copyAsync({
        from: file.uri,
        to: destPath,
      });

      const pdfFile = {
        uri: destPath,
        name: file.name,
        size: file.size,
        mimeType: file.mimeType || 'application/pdf',
      };

      console.log('PDF selected:', pdfFile.uri);
      setSelectedPdf(pdfFile);
    } else {
      console.log('No file selected or operation canceled');
    }
  };

  const isMounted = useRef(true);
  console.log(selectedPdf, "selectedPdf ==================")
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // const openFilePicker = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: 'application/pdf',
  //       copyToCacheDirectory: true,
  //     });

  //     console.log(result, 'result ++++++++++++++++');
  //     setSelectedPdf({
  //             assets: [
  //               {
  //                 uri: result?.assets[0]?.uri,
  //                 name: result?.assets[0]?.name,
  //                 size: result?.assets[0]?.size,
  //                 mimeType: result?.assets[0]?.mimeType || 'application/pdf',
  //               },
  //             ],
  //             canceled: false,
  //           });
  //     if (result.type === 'success') {
  //       const destPath = FileSystem.cacheDirectory + result.name;

  //       await FileSystem.copyAsync({
  //         from: result.uri,
  //         to: destPath,
  //       });

  //       const pdfFile = {
  //         uri: destPath,
  //         name: result.name,
  //         size: result.size,
  //         mimeType: result.mimeType,
  //       };

  //       console.log('PDF selected:', pdfFile.uri);
  //       setSelectedPdf(pdfFile);
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', error.message || 'Something went wrong picking the PDF.');
  //   }
  // };

  const handleSave = () => {
    console.log(selectedPdf, promptInput, 'data before sending ==========');
    saveMediaPromptData(selectedPdf, null, promptInput);
    const { selectedImages: savedImages, promptInput: savedPrompt } = loadMediaPromptData();
    console.log(savedImages, savedPrompt, 'Retrieved data from storage ++++++++');
    Alert.alert('Saved', 'Your data has been saved successfully!');
    router.push('/screens/ExplainMembership');
  };

  return (
    <ScrollView style={tw`flex-1 bg-black`}>
      <ScrollView
        contentContainerStyle={tw`flex-grow bg-black items-center justify-between px-4`}
        keyboardShouldPersistTaps="handled"
      >
        <View style={tw`my-10`}>
          {/* Header */}
          <View style={tw`flex-row w-full justify-between mt-4`}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={tw`bg-PrimaryFocus rounded-full p-1`}
            >
              <SvgXml xml={IconBack} />
            </TouchableOpacity>
            <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
              Enter Input
            </Text>
            <View style={tw`w-8`} />
          </View>

          {/* Prompt Input */}
          <View style={tw`mt-8`}>
            <Text style={tw`text-white py-2 font-AvenirLTProBlack`}>Prompt input</Text>
            <View style={tw`h-44 p-2 bg-[#262329] border border-[#565358] w-full rounded-lg`}>
              <TextInput
                value={promptInput}
                onChangeText={(text) => setPromptInput(text)}
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

          {/* Upload File */}
          <View style={tw`my-6`}>
            <Text style={tw`text-white font-AvenirLTProBlack`}>Upload file</Text>
            <View
              style={tw`flex items-center bg-[#262329] mt-2 rounded-2xl py-8 border border-[#565358] justify-center`}
            >
              <View style={tw`flex-row gap-6`}>
                <TouchableOpacity onPress={openFilePicker}>
                  <SvgXml xml={IconUpload} />
                </TouchableOpacity>
              </View>

              <Text style={tw`text-white my-4`}>Upload file (50 mb maximum)</Text>

              {selectedPdf && (
                <View style={tw`w-full h-[500px] mt-4`}>
                  {/* <TouchableOpacity
                    onPress={() => setSelectedPdf(null)}
                    style={tw`absolute top-2 right-2 z-10 bg-black/60 p-1 rounded-full`}
                  >
                    <SvgXml xml={CrossIcon} width={20} height={20} />
                  </TouchableOpacity> */}

                  {/* <WebView
                    source={{ uri: selectedPdf?.assets[0]?.uri }}
                    style={{ flex: 1 }}
                    startInLoadingState
                  /> */}
                  <Pdf
                    source={{ uri: selectedPdf?.uri }}
                    style={{ flex: 1 }}
                    trustAllCerts={false} // Optional: fix SSL issues
                    onError={(error) => console.log("PDF load error:", error)}
                  />

                </View>
              )}
            </View>
          </View>
        </View>

        {/* Save Button */}
        <View style={tw`flex mb-6 items-center justify-center w-full`}>
          <TButton
            onPress={handleSave}
            titleStyle={tw`text-black font-bold text-center`}
            title="Save"
            containerStyle={tw`bg-primary w-[90%] rounded-full`}
          />
        </View>

        <StatusBar backgroundColor={'gray'} translucent={false} />
      </ScrollView>
    </ScrollView>
  );
};

export default EnterInput;
