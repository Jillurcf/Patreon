import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import tw from '@/src/lib/tailwind';
import { router } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import { IconBack, IconDollar, IconUpload } from '@/src/assets/icons/icons';
import * as DocumentPicker from 'expo-document-picker';
import { TextArea } from 'react-native-ui-lib';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { useGetServicesByIdQuery } from '@/src/redux/apiSlice/serviceSlice';


const data = [
    { label: 'marketing', value: '1' },
    { label: 'finance', value: '2' },
    { label: 'law', value: '3' },
    { label: 'economy', value: '4' },
    { label: 'writing', value: '5' },
    { label: 'business', value: '6' },
];

type Props = {};


const EditService = (props: Props) => {
    const { id, } = useLocalSearchParams();
    console.log(id, "id==================")
    const isMounted = useRef(true);
    const [fields, setFields] = useState(['', '', '']);
    const [promptInput, setPromptInput] = useState('');
    const [selectedPdf, setSelectedPdf] = useState<any>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [selectedImages, setSelectedImages] = useState();
    const { data: serviceData } = useGetServicesByIdQuery(id)
    const [services, setServices] = useState({})
    console.log(serviceData?.data, "serviceData=======================")

    const [value, setValue] = useState({
        title: '',
        subtitle: '',
        currency: '',
        price: '',
        description: '',
        category: '',
    });
    console.log(value, "value=====================")
    const [initialized, setInitialized] = useState(false); // to prevent overwriting on every render
    useEffect(() => {
        const service = serviceData?.data;
        setServices(service);
        if (services && !initialized) {
            setValue(prev => ({
              ...prev,
              currency: services?.price?.toString() || '',
              price: services?.price?.toString() || '',
              description: services?.description || ''
            }));
            setInitialized(true);
          }
    }, [serviceData?.data]);
    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const openFilePicker = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf', // Restrict to PDF files
                multiple: true,          // Allow multiple selections if supported
                copyToCacheDirectory: true,
            });
            setSelectedPdf(result);
            console.log(result, "pdf file==================")
            if (result && isMounted.current) {
                setSelectedPdf(result);
            } else if (result.type === 'cancel') {
                console.log('User cancelled document picker');
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'Something went wrong');
        }
    };

    const handleAddField = () => {
        setFields([...fields, '']);
    };

    const handleChange = (text: string, index: number) => {
        const updatedFields = [...fields];
        updatedFields[index] = text;
        setFields(updatedFields);
    };
    const handleSave = async () => {
        console.log(fields, "Fields ++++++++++++++++++++++")
        try {
            const formData = new FormData()
            formData.append('title', value?.title)
            formData.append('subtitle', value?.subtitle)
            formData.append('price', value?.currency)
            formData.append('description', value?.description)
            formData.append('category', value?.category)
            formData.append('about', promptInput)
            formData.append('pdfFiles', selectedImages)
            // formData.append('explainMembership', fields)
            formData.append("explainMembership", JSON.stringify(fields)); // ← becomes: '["Member ", "Member 1", "Member 2"]'

            console.log(formData, "formData==================")
            // const res = await postBecmeAContibutor(formData).unwrap();
            router.push('/(drawer)/SettingProfile');
            console.log(res, "res++++++++++++++++")
            Alert.alert("Service created succcessfully")
        } catch (err) {
            console.log(err)
        }
        console.log('Saved fields:', fields);
        // Save logic here
    };


    return (
        <ScrollView contentContainerStyle={tw` bg-black px-[4%] pb-20`}>
            <StatusBar translucent={false} />
            {/* Header */}
            <View>
                <View style={tw`flex-row w-full justify-between mt-4`}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={tw`bg-PrimaryFocus rounded-full p-1`}>
                        <SvgXml xml={IconBack} />
                    </TouchableOpacity>
                    <Text style={tw`text-white font-bold font-AvenirLTProBlack text-2xl`}>
                        Edit service
                    </Text>
                    <View style={tw`w-8`} />
                </View>
            </View>

            {/* Prompt Input */}
            <View style={tw`mt-8`}>
                <Text style={tw`text-white py-2 font-AvenirLTProBlack`}>Prompt input</Text>
                <View style={tw`h-44 p-2 bg-[#262329] border border-[#565358] w-full rounded-lg`}>
                    <TextInput
                      defaultValue={services?.about}
                        onChangeText={setPromptInput}
                        style={tw`text-left h-40 text-white`}
                        placeholder="Write it here"
                        placeholderTextColor="#c7c7c7"
                        multiline
                        maxLength={120}
                        textAlignVertical="top"
                    />
                </View>
            </View>

            {/* File Upload */}
            <View style={tw`my-6`}>
                <Text style={tw`text-white font-AvenirLTProBlack`}>Upload file</Text>
                <View style={tw`flex items-center bg-[#262329] mt-2 rounded-2xl py-8 border border-[#565358] justify-center`}>
                    <TouchableOpacity onPress={openFilePicker}>
                        <SvgXml xml={IconUpload} />
                    </TouchableOpacity>
                    <Text style={tw`text-white my-4`}>Upload file (50 mb maximum)</Text>
                    {selectedPdf?.name && (
                        <Text style={tw`text-gray-300 text-sm`}>{selectedPdf.name}</Text>
                    )}
                </View>
            </View>

            {/* Title */}
            <View style={tw`flex-row w-full items-center p-3`}>
                <TextInput
                    style={tw`w-full h-10 border text-white bg-[#262329] border-gray-400 rounded-2xl px-2`}
                    placeholder="Write title here"
                    placeholderTextColor={'white'}
                    defaultValue={services?.title}
                    // value={services.title}
                    onChangeText={text => setValue(prev => ({ ...prev, title: text }))}
                />
            </View>

            {/* Subtitle */}
            <View style={tw`flex-row w-full items-center p-3`}>
                <TextInput
                    style={tw`w-full h-10 border text-white bg-[#262329] border-gray-400 rounded-2xl px-2`}
                    placeholder="Write subtitle"
                    placeholderTextColor={'white'}
                    defaultValue={services?.subtitle}
                    onChangeText={text => setValue(prev => ({ ...prev, subtitle: text }))}
                />
            </View>

            {/* Currency */}
            <View style={tw`flex-row w-full items-center p-3`}>
                <TouchableOpacity style={tw`absolute right-6 z-30`}>
                    <SvgXml xml={IconDollar} width={20} height={20} />
                </TouchableOpacity>
                <TextInput
                    style={tw`w-full h-10 border text-white bg-[#262329] border-gray-400 rounded-2xl px-2`}
                    placeholder="Input currency"
                    placeholderTextColor={'white'}
                    defaultValue={services?.price?.toString()}
                    onChangeText={text => setValue(prev => ({ ...prev, currency: text }))}
                />
            </View>

            {/* Description */}
            <View style={tw`mt-8`}>
                <View style={tw`h-auto p-2 bg-[#FFFFFF] border border-[#565358] w-full rounded-lg`}>
                    <TextArea
                    
                        style={tw`text-left h-40 text-black`}
                        placeholder={'Write description here'}
                        placeholderTextColor={'#c7c7c7'}
                        underlineColorAndroid={'transparent'}
                        multiline
                        maxLength={9000}
                        defaultValue={services?.description}
                        // value={value?.description}
                        onChangeText={text => setValue(prev => ({ ...prev, description: text }))}
                        textAlignVertical="top"
                    />
                </View>
            </View>

            {/* Dropdown */}
            <View style={tw`mt-8`}>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
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
                            category: item.label,
                        }));
                        setIsFocus(false);
                    }}
                />
            </View>
            {/* Input Fields */}
            {fields.map((value, index) => (
                <View key={index} style={tw`flex-row w-[100%] items-center p-3`}>
                    <View style={tw`w-3 h-3 rounded-full bg-white mr-3`} />
                    <TextInput
                        placeholder="Write it here"
                        placeholderTextColor="#ccc"
                        value={value}
                        onChangeText={(text) => handleChange(text, index)}
                        style={tw`flex-1 bg-neutral-900 text-white px-4 py-3 rounded-lg`}
                    />
                </View>
            ))}

            {/* Add (+) Button */}
            <TouchableOpacity
                onPress={handleAddField}
                style={tw`self-center bg-neutral-900 w-10 h-10 rounded-full items-center justify-center my-5`}
            >
                <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
            {/* Save Button */}
            <TouchableOpacity
                onPress={handleSave}
                style={tw`bg-white rounded-xl py-4 items-center`}
            >
                <Text style={tw`text-black font-bold text-base`}>Save</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditService;

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: '#565358',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#262329',
    },
    placeholderStyle: {
        color: '#c7c7c7',
        fontSize: 16,
    },
    selectedTextStyle: {
        color: 'white',
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: 'white',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
});
