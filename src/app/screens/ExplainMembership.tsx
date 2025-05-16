import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import Textarea from 'react-native-textarea';

import {
  AttachmentIcon,
  BulbIcon,
  CrossIcon,
  Gallery,
  IconBack,
  IconDollar,
  IconRightArrow,
  StillCamera,
  VideoCam,
} from '../../assets/icons/icons';
import IButton from '../../components/IButton';
import TButton from '../../components/TButton';
import tw from '../../lib/tailwind';
import IconArrow from '../../components/IconArrow';
import { SvgXml } from 'react-native-svg';
import { router } from 'expo-router';
import { usePostBecmeAContibutorMutation } from '@/src/redux/apiSlice/serviceSlice';
import { getExplainMemberValue, setExplainMemberValue } from '@/src/utils';

const data = [
  { label: 'marketing', value: '1' },
  { label: 'finance', value: '2' },
  { label: 'law', value: '3' },
  { label: 'economy', value: '4' },
  { label: 'writing', value: '5' },
  { label: 'business', value: '6' },
  // {label: 'Item 7', value: '7'},
  // {label: 'Item 8', value: '8'},
];

const ExplainMembership = () => {
  const [value, setValue] = useState({
    title: '',
    subtitle: '',
    currency: '',
    price: '',
    description: "",
    category: "",
  });
  console.log(value, "value++++++++++++++")
  const [isFocus, setIsFocus] = useState(false);
  const [postBecmeAContibutor, { isLoading, isError }] = usePostBecmeAContibutorMutation()

  useEffect(() => {
    const savedValue = getExplainMemberValue();
    console.log(savedValue?.category, "savedValue+++++++++++++")
    setValue(savedValue);
  }, []);

  // Save the form value when it changes
  useEffect(() => {
    setExplainMemberValue(value);
  }, [value]);

  
  const handleSave = () => {
    setExplainMemberValue(value);
    console.log(value, "value++++++++++")
    router.push("/screens/ExplainMembership1")
  }
  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 bg-black h-[95%] px-[4%] items-center justify-between`}>
      <View style={tw`my-10`}>
        <View style={tw`flex-row w-full justify-between mt-4`}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`bg-PrimaryFocus rounded-full p-1`}>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
            Explain Membership
          </Text>
          <View style={tw`w-8`} />
        </View>


        <View style={tw`flex-row w-[100%] mt-4 items-center p-3`}>
          <TouchableOpacity
            // onPress={() => selectMediaType()}
            style={tw`mr-2 absolute right-6 z-30`}>
            {/* <SvgXml xml={IconDollar} width={20} height={20} /> */}
          </TouchableOpacity>
          <View style={tw`flex-row gap-1 px-[2%] items-center relative`}>
            <TextInput
              style={tw`w-[100%] h-10 border text-white bg-[#262329] border-gray-400 rounded-2xl px-2`}
              placeholder="Write title here"
              placeholderTextColor={'white'}
              cursorColor={'white'}
              value={value.title}
              onChangeText={text => setValue(prev => ({ ...prev, title: text }))}
            />
          </View>

        </View>
        <View style={tw`flex-row w-[100%] items-center p-3`}>
          <TouchableOpacity
            // onPress={() => selectMediaType()}
            style={tw`mr-2 absolute right-6 z-30`}>
            {/* <SvgXml xml={IconDollar} width={20} height={20} /> */}
          </TouchableOpacity>
          <View
            style={tw`flex-row  gap-1 px-[2%] items-center relative`}>
            <TextInput
              style={tw`w-[100%] h-10 border text-white bg-[#262329] border-gray-400 rounded-2xl px-2`}
              placeholder="Write subtitle"
              placeholderTextColor={'white'}
              cursorColor={'white'}
              value={value?.subtitle}
              onChangeText={text => setValue(prev => ({
                ...prev,
                subtitle: text,
              }))}
            />
          </View>
        </View>
        {/* <Text style={tw`text-white font-AvenirLTProBlack mt-6 mb-2`}>
          Price
        </Text> */}
        <View style={tw`flex-row w-[100%] items-center p-3`}>
          <TouchableOpacity
            // onPress={() => selectMediaType()}
            style={tw`mr-2 absolute right-6 z-30`}>
            <SvgXml xml={IconDollar} width={20} height={20} />
          </TouchableOpacity>
          <View
            style={tw`flex-row  gap-1 px-[2%] items-center relative`}>
            <TextInput
              style={tw`w-[100%] h-10 border text-white bg-[#262329] border-gray-400 rounded-2xl px-2`}
              placeholder="Input currency"
              placeholderTextColor={'white'}
              cursorColor={'white'}
              value={value.currency}
              onChangeText={text => setValue(prev => ({
                ...prev,
                currency: text
              }))}
            />
          </View>
        </View>

        {/* ==========================input textarea ========================= */}
        <View style={tw`mt-8`}>
          {/* <Text style={tw`text-white font-AvenirLTProBlack py-2`}>Input</Text> */}
          <View
            style={tw`h-44 p-2 bg-[#262329] border border-[#565358] w-full rounded-lg`}>
            <Textarea
              style={tw`text-left h-40 text-white`}
              placeholder={'Write description here'}
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
              multiline
              maxLength={120}
              value={value.description}
              onChangeText={text => setValue(prev => ({
                ...prev,
                description: text // ✅ FIXED THIS LINE
              }))}
              textAlignVertical="top" // Ensures text starts from the top
            />

          </View>
        </View>
        {/* ==========================drop down area =============================== */}
        <View style={tw`mt-8`}>
          {/* <Text style={tw`text-white font-AvenirLTProBlack py-2`}>Input</Text> */}


          {/* {renderLabel()} */}
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            // search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select category' : '...'}
            searchPlaceholder="Search..."
            value={value.category}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(prev => ({
                ...prev,
                category: item?.label, // ✅ Save only the selected value
              }));
              setIsFocus(false);
            }}
            
          />
        </View>
      </View>



      {/* Continue button */}
      <View style={tw`flex mb-6 my-12 items-center justify-center w-full`}>
        <TButton
        onPress={handleSave}
          titleStyle={tw`text-black font-bold text-center`}
          title="Continue"
          containerStyle={tw`bg-primary w-[90%] rounded-full`}
        />
      </View>

      <StatusBar backgroundColor={'gray'} translucent={false} />
    </ScrollView>
  );
};

export default ExplainMembership;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262329',
    padding: 16,
  },
  dropdown: {
    height: 50,
    color: 'white',
    backgroundColor: "#262329",
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
    color: 'white',
  },
  // label: {
  //   position: 'absolute',

  //   left: 22,
  //   top: 8,
  //   zIndex: 999,
  //   paddingHorizontal: 8,
  //   fontSize: 14,
  // },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
