import React, { useEffect, useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import tw from '../../lib/tailwind';
import { SvgXml } from 'react-native-svg';
import { Avatar } from 'react-native-ui-lib';
import Notification from '../(drawer)/Notification';
import InputText from '../../components/InputText';
import { IconBack, IconGeneralSearch, IconRightArrow } from '../../assets/icons/icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useGetAllServiceQuery, } from '@/src/redux/apiSlice/serviceSlice';
import { imageUrl } from '@/src/redux/baseApi';
import { lStorage, setServiceData } from '@/src/utils';

type ItemData = {
  id: string;
  image: string;
};

const DiscoverResult = () => {
  const [titles, setTitles] = useState()
  const { title } = useLocalSearchParams();
  console.log(title, "Title+++++++")
  const [page, setPage] = useState(1);
const [services, setServices] = useState([]);
const [hasMore, setHasMore] = useState(true);

// Optional: use limit state too
const limit = 10;

  const { data, isLoading, isFetching } = useGetAllServiceQuery({
    search: title,
    title: titles,
    page,
    limit
  });
  console.log(data?.data?.result, "data++++++");
  const fullImageUrl = data?.data?.image ? `${imageUrl}/${data.data.image}` : null;
  
  useEffect(() => {
    if (data?.data?.result) {
      if (page === 1) {
        setServices(data?.data?.result); // first page
      } else {
        setServices(prev => [...prev, ...data?.data?.result]); // next pages
      }
  
      // Set hasMore based on totalPages
      setHasMore(page < data.data.totalPages);
    }
  }, [data]);
  
  // console.log(JSON.stringify(data, null, 2));

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      data: {
        creator_image: require('../../assets/images/alteravater.png'),
        message: 'John Doe commented on your post.',
        creator_name: 'John Doe',
      },
      created_at: new Date().toISOString(),
      read_at: null,
    },
    {
      id: 2,
      data: {
        creator_image: require('../../assets/images/alteravater.png'),
        message: 'Your profile picture was liked.',
        creator_name: 'User',
      },
      created_at: new Date().toISOString(),
      read_at: new Date().toISOString(),
    },
    // Add other notifications here...
  ]);

  const handleRead = item => {
    router.push('chatScreen', {
      id: item?.id,
      is_active: item?.is_active,
      receiverId: item?.receiver_id,
      receiverName: item?.name,
      reeciverImage: item?.avatar,
    });
  };

  const handleMessage = item => {
    router.push('chatScreen', {
      receiverId: item?.id,
      receiverName: item?.first_name + item?.last_name,
      reeciverImage: item?.avatar,
    });
  };
const handleService = item => {
  console.log(item, "item++++++")
    router.push('/screens/ProfileScreen', {id:item?.id})
    setServiceData(item);
}
  
  return (
    <View style={tw`flex-1 bg-black px-[4%]`}>
      <View style={tw`flex-row w-full justify-between mt-4`}>
        <TouchableOpacity
          onPress={() => {
            router.back()
          }}
          style={tw`bg-PrimaryFocus rounded-full p-1`}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <Text style={tw`text-white font-AvenirLTProBlack text-2xl`}>
          Search Result
        </Text>
        {/* Placeholder view for symmetry */}
        <View style={tw`w-8`} />
      </View>

      <View style={tw`my-8`}>
        <InputText
        style={tw`text-white`}
          containerStyle={tw`bg-[#262329] border h-14 border-[#565358]`}
          labelStyle={tw`text-white font-AvenirLTProBlack mt-3`}
          placeholder={'Boxing'}
          placeholderColor={'white'}
          //   label={'Password'}
          iconLeft={IconGeneralSearch}
        // iconRight={isShowConfirmPassword ? iconLock : iconLock}
          onChangeText={(text: any) => setTitles(text)}
        //   isShowPassword={!isShowConfirmPassword}
        //   rightIconPress={() =>
        //     setIsShowConfirmPassword(!isShowConfirmPassword)
        //   }
        />
      </View>
      <FlatList
        data={services}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const contributorImage = item?.contributor?.image
            ? { uri: `${imageUrl}/${item?.contributor?.image}` }
            : require('../../assets/images/logo.png'); // fallback image

          return (
            <TouchableOpacity
            onPress={()=>handleService(item)}
              // onPress={() => router.push('/screens/ProfileScreen', {id:item?.id})}
              style={tw`flex-row items-center bg-[#262329] my-1 rounded-2xl gap-2 p-2`}>

              <View style={tw`flex-row items-center`}>
                <View style={tw`relative items-center mr-2`}>
                  <Image
                    source={contributorImage}
                    style={tw`w-12 h-12 rounded-full`}
                    resizeMode="cover"
                  />
                </View>

                <View style={tw`flex-1 pb-2`}>
                  <View style={tw`flex-row justify-between mr-2 items-center`}>
                    <Text style={tw`text-white font-AvenirLTProBlack`}>
                      {item?.title}
                    </Text>
                  </View>

                  <View style={tw`flex-row justify-between mt-2`}>
                    <Text style={tw`text-white font-AvenirLTProBlack`}>
                      {item?.subtitle}
                    </Text>
                  </View>
                </View>

                <SvgXml xml={IconRightArrow} />
              </View>
            </TouchableOpacity>
          );
        }}
        onEndReached={() => {
          if (!isFetching && hasMore) {
            setPage(prev => prev + 1);
          }
        }}
        ListFooterComponent={
          isFetching && hasMore ? (
            <ActivityIndicator size="large" color="white" />
          ) : null
        }
      />


      <StatusBar backgroundColor="black" translucent={false} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DiscoverResult;
