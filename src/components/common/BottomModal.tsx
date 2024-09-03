import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BottomModalProps } from '../../types';

const BottomView = ({ title, subTitle, customHeight, isVisible, children, onClose }: BottomModalProps) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      {/* overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}></View>
      </TouchableWithoutFeedback>
      {/* content */}
      <View style={[styles.modalContent, {height: customHeight}]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#000" size={22} />
          </Pressable>
        </View>
        <Text style={styles.subTitle}>{subTitle}</Text>
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
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 12,
  }
});

export default BottomView