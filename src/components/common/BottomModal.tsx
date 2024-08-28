import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BottomModalProps } from '../../types';

const BottomView = ({ title, isVisible, children, onClose }: BottomModalProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      {/* overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}></View>
      </TouchableWithoutFeedback>
      {/* content */}
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#000" size={22} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darkened background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    height: '20%',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default BottomView