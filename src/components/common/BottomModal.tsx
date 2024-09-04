import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BottomModalProps } from '../../types';
import { useTheme } from '@rneui/themed';

const BottomView = ({ title, subTitle, customHeight, isVisible, children, onClose }: BottomModalProps) => {
  const { theme } = useTheme();

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      {/* overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}></View>
      </TouchableWithoutFeedback>
      {/* content */}
      <View style={[styles.modalContent, {height: customHeight, backgroundColor: theme.colors.grey5}]}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.colors.black }]}>
            {title}
            </Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color={theme.colors.black} size={22} />
          </Pressable>
        </View>
        <Text style={[styles.subTitle, { color: theme.colors.black }]}>
          {subTitle}
        </Text>
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