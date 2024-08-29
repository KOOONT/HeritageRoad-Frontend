//home
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, GestureResponderEvent, FlatList, TouchableHighlight } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import BottomView from '../../components/common/BottomModal';
import { DISTANCE_OPTIONS } from '../../constants/options';
import { DistanceOption } from '../../types';

const Index = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [distance, setDistance] = useState(1);

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
        style={styles.button}
        underlayColor='#e0e0e0'
      >
        <Text style={styles.buttonText}>{item.label}</Text>
      </TouchableHighlight>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onModalOpen}>                                            
        <View style={styles.distanceContainer}>
          <Text>내 주변 거리&nbsp;
            {distance}km&nbsp; 
            <Icon name="caretdown" color="#000" size={10} />
          </Text>
        </View>
      </TouchableWithoutFeedback>
     
      {/* bottom modal view */}
      <BottomView 
        title='반경 선택'
        isVisible={isModalVisible} 
        onClose={onModalClose}
      >
      <FlatList
        data={DISTANCE_OPTIONS}
        renderItem={renderButton}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
      </BottomView>
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
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 18,
  },
  buttonText: {
    fontSize: 12,
  }
});

export default Index;