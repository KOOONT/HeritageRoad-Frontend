import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Skeleton, useTheme } from '@rneui/themed';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'

import { HeritageDetails, RelatedList } from '../../types';
import { setSelectedData } from '../../redux/slices/mapSlice';
import Images from '../../components/details/Images';
import Related from '../../components/details/Related';

const index = () => {
  const [expanded, setExpanded] = useState(false);  // '더보기' 상태 관리

  // Data for fetching details - ccbaAsno,ccbaMnm1,ccbaKdcd,ccbaCtcd
  const { id, name, kdcd, ctcd, cityName, guName } = useLocalSearchParams<{
    id: string, 
    name: string, 
    kdcd: string, 
    ctcd: string,
    cityName: string,
    guName: string
  }>(); 
  
  const { theme } = useTheme();
  const localStyles = StyleSheet.create({
    detailsContainer: {
      padding: 10,
      marginBottom: 10,
      backgroundColor: theme.colors.background
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
  const limitRelated = 10;
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

  const { isPending: isPending1, isError: isError1, isSuccess: isSuccess1, data: data1 } = useQuery({
    queryKey: ['details', id],
    queryFn: async (): Promise<HeritageDetails> => {
      const response = await fetch(`${apiBaseUrl}/api/heritage-detail/${id}/${kdcd}/${ctcd}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  })
  const { isPending: isPending2, isSuccess: isSuccess2, data: data2 } = useQuery({
    queryKey: ["related", cityName, guName],
    queryFn: async (): Promise<RelatedList> => {
      const response = await fetch(`${apiBaseUrl}/api/heritage-detail-related-attractions-area/${limitRelated}/${cityName}/${guName == '' ? null : guName}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  })

  useEffect(() => {
    navigation.setOptions({
      title: name
    });
  }, []);

  useEffect(() => {
    //위치값이 있는 경우에만 지도 아이콘 표시
    if(isSuccess1 && data1.latitude != '0' && data1.longitude != '0'){
      dispatch(setSelectedData(data1))
      navigation.setOptions({
        headerRight: () => 
          <TouchableOpacity
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel="지도에서 보기"
            style={[
              styles.mapButton,
              {
                backgroundColor: theme.colors.grey5,
                borderColor: theme.colors.grey4,
              },
            ]}
            onPress={() => {
              router.push({
                pathname: '/maps/[latP]',
                params: {
                  latP: data1.latitude,
                  lngP: data1.longitude,
                  idP: data1.ccbaAsno,
                  titleP: data1.ccbaMnm1,
                  subTitleP: data1.ccmaName,
                  imageP: data1.images?.[0]?.imageUrl ?? data1.imageUrl ?? '',
                },
              });
            }}
          >
            <Icon
              name="map"
              color={theme.colors.black}
              size={19}
              style={styles.mapIcon}
            />
          </TouchableOpacity>
      })
    }
  }, [isSuccess1]);

  if (isPending1) return (
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

  if (isError1) return (
    <View style={[styles.errorContainer, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.errorText, { color: theme.colors.black }]}>
        국가유산 상세 정보를 불러오지 못했습니다.
      </Text>
    </View>
  )

  const detailImages = data1?.images?.length
    ? data1.images
    : data1?.imageUrl
      ? [{ imageUrl: data1.imageUrl, description: data1.ccbaMnm1 }]
      : [];

  return (
    <>
      {isSuccess1 && 
        <View style={[styles.container, {backgroundColor: theme.colors.grey5}]}>
          <ScrollView style={styles.scrollContainer}>
            {(detailImages.length > 0) &&
              <Images imageArr={detailImages} videoUrl={data1.videoUrl == "" ? null : data1.videoUrl}/>
            }
            <View style={[styles.innerContainer, { backgroundColor: theme.colors.grey5 }]}>
              <View style={localStyles.detailsContainer}>
                <Text style={localStyles.title}>국가유산명</Text>
                <Text style={localStyles.content}>
                  {`${data1.ccbaMnm1}`}
                </Text>
              </View>
              <View style={localStyles.detailsContainer}>
                <Text style={localStyles.title}>분류</Text>
                <Text style={localStyles.content}>
                  {`${data1.gcodeName}${data1.bcodeName ? `/${data1.bcodeName}`: ''}${data1.mcodeName ? `/${data1.mcodeName}` : ''}${data1.scodeName ? `/${data1.scodeName}` : ''}`}
                </Text>
              </View>
              <View style={localStyles.detailsContainer}>
                <Text style={localStyles.title}>종목/시대</Text>
                <Text style={localStyles.content}>
                  {`${data1?.ccmaName} ${data1.crltsnoNm}호/${data1?.ccceName ? data1.ccceName : '미상'}`}
                </Text>
              </View>
              <View style={localStyles.detailsContainer}>
                <Text style={localStyles.title}>지정(등록)일</Text>
                <Text style={localStyles.content}>
                  {`${data1.ccbaAsdt.substring(0,4)}년 ${data1.ccbaAsdt.substring(4,6)}월  ${data1.ccbaAsdt.substring(6,8)}일`}
                </Text>
              </View>
              <View style={localStyles.detailsContainer}>
                <Text style={localStyles.title}>소재지</Text>
                <Text style={localStyles.content}>{data1?.ccbaLcad}</Text>
              </View>
              <View style={localStyles.detailsContainer}>
                <Text style={localStyles.title}>소개</Text>
                <Text style={localStyles.content}>
                  {expanded
                  ? data1?.content
                  : data1?.content.substring(0, data1.content.substring(0, limit).lastIndexOf(' ')) + '...'
                  }
                </Text>

                {data1?.content && data1.content.length > limit && (  // '더보기' 버튼은 내용이 길 때만 보여줌
                  <TouchableOpacity onPress={toggleExpanded}>
                    <Text style={localStyles.moreText}>
                      {expanded ? '간략히' : '더보기'}  {/* 상태에 따라 버튼 텍스트 변경 */}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <Related isPending={isPending2} isSuccess={isSuccess2} data={data2} />
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
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 15,
    textAlign: 'center',
  },
  mapButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },
  mapIcon: {
    lineHeight: 19,
    textAlign: 'center',
  },
})
export default index
