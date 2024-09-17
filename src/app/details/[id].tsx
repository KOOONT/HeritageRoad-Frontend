import React, { useEffect } from 'react'
import { Text, View } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import Icon from 'react-native-vector-icons/Ionicons'
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { HeritageDetails } from '../../types';
import { setSelectedData } from '../../redux/slices/mapSlice';

const index = () => {
  // Data for fetching details
  // ccbaAsno,ccbaMnm1,ccbaKdcd,ccbaCtcd
  const { id, name, kdcd, ctcd } = useLocalSearchParams<{id: string, name: string, kdcd: string, ctcd: string}>(); 

  const router = useRouter();
  const navigation = useNavigation();
  
  const dispatch = useDispatch();

  const apiBaseUrl = process.env.API_BASE_URL;
  const { isPending, isSuccess, error, data } = useQuery({
    queryKey: ['details', id],
    queryFn: async (): Promise<HeritageDetails> => {
      const response = await fetch(`${apiBaseUrl}/api/heritage-detail/${id}/${kdcd}/${ctcd}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });

  useEffect(() => {
    navigation.setOptions({
      title: name
    });
  }, []);

  useEffect(() => {
    //위치값이 있는 경우에만 지도 아이콘 표시
    if(isSuccess && data.latitude != '0' && data.longitude != '0'){
      dispatch(setSelectedData(data))
      navigation.setOptions({
        headerRight: () => 
          <Icon 
            name="map" 
            size={20} 
            onPress={() => {
              router.push({
                pathname: '/maps/[data]', 
                params: { 
                  data1: data?.latitude, 
                  data2: data?.longitude, 
                  id: id
                }
              });
            }} 
          />
      })
    }
  }, [isSuccess]);

  if (isPending) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      {isSuccess && 
        <View>
          <Text>{data.ccbaMnm1}</Text>
        </View>
      }
    </>
  )
}

export default index