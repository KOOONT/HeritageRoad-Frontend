//home
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, GestureResponderEvent } from 'react-native';
import BottomView from '../../components/common/BottomModal';

const Index = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onModalOpen = (event: GestureResponderEvent) => {
    setIsModalVisible(!isModalVisible);
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onModalOpen}>
        <View style={styles.distanceContainer}>
          <Text>내 주변 거리 v</Text>
        </View>
      </TouchableWithoutFeedback>
     
      {/* bottom modal view */}
      <BottomView 
        title='반경 선택'
        isVisible={isModalVisible} 
        onClose={onModalClose}
      >
        <Text>반경 선택</Text>
      </BottomView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  distanceContainer: {
    marginBottom: 8,
  }
});

export default Index;