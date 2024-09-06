//home
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, GestureResponderEvent, FlatList, TouchableHighlight } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import BottomModal from '../../components/common/BottomModal';
import { DISTANCE_OPTIONS } from '../../constants/options';
import { DistanceOption } from '../../types';
import { useTheme } from '@rneui/themed';

const Index = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [distance, setDistance] = useState(1);
  const { theme } = useTheme();
  
  const onModalOpen = (event: GestureResponderEvent) => {
    setIsModalVisible(!isModalVisible);
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  const handleDistance = (result: number) => {
    setDistance(result);
    onModalClose();

    //TO DO: Call API
  }
  // 아이템 렌더링 함수
  const renderButton = ({ item }: {item: DistanceOption}) => (
    <View style={styles.buttonContainer}>
      <TouchableHighlight
        onPress={() =>handleDistance(item.value)}
        accessibilityLabel={item.label}
        style={[styles.button, {borderColor: theme.colors.grey2}]}
        underlayColor={theme.colors.grey4}
      >
        <Text style={styles.buttonText}>{item.label}</Text>
      </TouchableHighlight>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TouchableWithoutFeedback onPress={onModalOpen}>                                            
        <View style={styles.distanceContainer}>
          <Text style={{ color: theme.colors.black }}>내 주변 거리&nbsp;
            {distance}km&nbsp; 
            <Icon name="caretdown" color={theme.colors.black} size={10} />
          </Text>
        </View>
      </TouchableWithoutFeedback>
     
      {/* bottom modal view */}
      <BottomModal 
        title='반경 선택'
        subTitle ='조회할 주변 반경을 선택해주세요.'
        isVisible={isModalVisible} 
        customHeight='20%'
        onClose={onModalClose}
        loading={false}
      >
      <FlatList
        data={DISTANCE_OPTIONS}
        renderItem={renderButton}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
      </BottomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  distanceContainer: {
    marginBottom: 8,
    padding: 8,
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  buttonContainer:{
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 18,
  },
  buttonText: {
    fontSize: 12,
  }
});

export default Index;