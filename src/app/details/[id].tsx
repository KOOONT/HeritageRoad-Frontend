import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Skeleton, useTheme } from '@rneui/themed';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import Icon from 'react-native-vector-icons/Ionicons'
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { HeritageDetails } from '../../types';
import { setSelectedData } from '../../redux/slices/mapSlice';
import Images from '../../components/details/Images';

const index = () => {
  const [expanded, setExpanded] = useState(false);  // '더보기' 상태 관리
  // Data for fetching details - ccbaAsno,ccbaMnm1,ccbaKdcd,ccbaCtcd
  const { id, name, kdcd, ctcd } = useLocalSearchParams<{id: string, name: string, kdcd: string, ctcd: string}>(); 
  
  const { theme } = useTheme();
  const localStyles = StyleSheet.create({
    detailsContainer: {
      padding: 10,
      marginBottom: 10,
      backgroundColor: theme.colors.grey5
    },
    title: {
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.black
    }, 
    content: {
      color: theme.colors.black
    },
    moreText: {
      textAlign: 'right',
      marginTop: 10,
      color: theme.colors.black
    },
    skeletonContainer: {
      backgroundColor: theme.colors.background,
      flexDirection: 'column',
      alignItems: 'center',
    },
    skeleton: {
      width: '100%',
      marginTop: 10
    }
  })

  const router = useRouter();
  const navigation = useNavigation();
  
  const dispatch = useDispatch();

  const toggleExpanded = () => setExpanded(!expanded);

  const limit = 150;
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
            color={theme.colors.black}
            size={20} 
            onPress={() => {
              router.push('/maps');
            }} 
          />
      })
    }
  }, [isSuccess]);

  if (isPending) return (
    <View style={localStyles.skeletonContainer}>
      <Skeleton
        animation="pulse"
        height={300}
        style={localStyles.skeleton}
      />
      {[...Array(5)].map((_, index) => (
        <Skeleton
          key={index}
          animation="pulse"
          height={60}
          style={localStyles.skeleton}
        />
      ))}
      <Skeleton
        animation="pulse"
        height={100}
        style={localStyles.skeleton}
      />
    </View>
  )

  return (
    <>
      {isSuccess && 
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
          <ScrollView style={styles.scrollContainer}>
            {(data.images.length > 0) &&
              <Images imageArr={data?.images || []} videoUrl={data.videoUrl == "" ? null : data.videoUrl}/>
            }
            <View style={[styles.innerContainer, { backgroundColor: theme.colors.background }]}>
              <View style={localStyles.detailsContainer}>
                <Text style={localStyles.title}>국가유산명</Text>
                <Text style={localStyles.content}>
                  {`${data.ccbaMnm1}`}
                </Text>
              </View>
              <View style={localStyles.detailsContainer}>
                <Text style={localStyles.title}>분류</Text>
                <Text style={localStyles.content}>
                  {`${data.gcodeName}/${data.bcodeName}/${data.mcodeName}/${data.scodeName}`}
                </Text>
              </View>
              <View style={localStyles.detailsContainer}>
                <Text style={localStyles.title}>종목/시대</Text>
                <Text style={localStyles.content}>
                  {`${data?.ccmaName}/${data?.ccceName}`}
                </Text>
              </View>
              <View style={localStyles.detailsContainer}>
                <Text style={localStyles.title}>지정(등록)일</Text>
                <Text style={localStyles.content}>
                  {`${data.ccbaAsdt.substring(0,4)}년 ${data.ccbaAsdt.substring(4,6)}월  ${data.ccbaAsdt.substring(6,8)}일`}
                </Text>
              </View>
              <View style={localStyles.detailsContainer}>
                <Text style={localStyles.title}>소재지</Text>
                <Text style={localStyles.content}>{data?.ccbaLcad}</Text>
              </View>
              <View style={localStyles.detailsContainer}>
                <Text style={localStyles.title}>소개</Text>
                <Text style={localStyles.content}>
                  {expanded
                  ? data?.content
                  : data?.content.substring(0, data.content.substring(0, limit).lastIndexOf(' ')) + '...'
                  }
                </Text>

                {data?.content && data.content.length > 155 && (  // '더보기' 버튼은 내용이 길 때만 보여줌
                  <TouchableOpacity onPress={toggleExpanded}>
                    <Text style={localStyles.moreText}>
                      {expanded ? '간략히' : '더보기'}  {/* 상태에 따라 버튼 텍스트 변경 */}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  innerContainer:{
    marginTop: 10
  },
})
export default index