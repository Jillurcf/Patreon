import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc'; // if using tailwind-rn
import { getExplainMemberValue, loadMediaPromptData } from '@/src/utils';
import { SvgXml } from 'react-native-svg';
import { IconBack } from '@/src/assets/icons/icons';
import { router } from 'expo-router';
import { usePostBecmeAContibutorMutation } from '@/src/redux/apiSlice/serviceSlice';
// OR
// import { useTailwind } from 'nativewind';

const ExplainMembershipScreen = () => {
    const [fields, setFields] = useState(['', '', '']);
    const [value, setValue] = useState({
        title: '',
        subtitle: '',
        currency: '',
        price: '',
        description: "",
        category: "",
    });
    const [promptInput, setPromptInput] = useState<string>("");
    const [selectedImages, setSelectedImages] = useState();
    const [postBecmeAContibutor, { isLoading, isError }] = usePostBecmeAContibutorMutation();
    console.log(fields, "fields data +++++++++++++++++++++++++")

    useEffect(() => {
        const savedValue = getExplainMemberValue();
        console.log(savedValue?.category, "savedValue+++++++++++++")
        setValue(savedValue);
        const promptInput = loadMediaPromptData();
        const mediaData = loadMediaPromptData(); // returns an object
        setPromptInput(mediaData.promptInput);   // assigns only the string part
        setSelectedImages(mediaData?.selectedImages)
        console.log(promptInput, selectedImages, "promptInput+++++++++++++")
    }, []);


    const handleAddField = () => {
        setFields([...fields, '']);
    };

    const handleChange = (text: string, index: number) => {
        const updatedFields = [...fields];
        updatedFields[index] = text;
        setFields(updatedFields);
    };

    const handleSave =async () => {
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
            const res =await  postBecmeAContibutor(formData).unwrap();
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
        <SafeAreaView style={tw`flex-1 bg-black`}>
            <ScrollView contentContainerStyle={tw` flex-col justify-between h-full`} style={tw`px-5 pt-5`}>
                {/* Header */}
                <View>
                    <View style={tw`flex-row items-center mb-6`}>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={tw`bg-PrimaryFocus rounded-full p-1`}>
                            <SvgXml xml={IconBack} />
                        </TouchableOpacity>
                        <Text style={tw`text-white text-lg font-bold ml-2`}>
                            Explain Membership
                        </Text>
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
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    onPress={handleSave}
                    style={tw`bg-white rounded-xl py-4 items-center`}
                >
                    <Text style={tw`text-black font-bold text-base`}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ExplainMembershipScreen;
