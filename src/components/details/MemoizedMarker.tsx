import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RelatedItem } from '../../types';

type ContentType = '12' | '32' | '39';

const typeColors: Record<ContentType, string> = {
  '12': '#023FDD', // 파랑
  '32': '#6202DD', // 보라
  '39': '#DD0293'  // 핑크
};

// 국가유산 외 기타 마커 최적화
const MemoizedMarker = React.memo(({ marker } : { marker: RelatedItem}) => {
  const renderIcon = () => {
    const id = marker.contentTypeId;
    switch (id) {
      case '12':
        return <FontAwesome5 name="map-marker-alt" size={30} color={typeColors[id]} />;
      case '32':
        return <MaterialIcons name="hotel" size={30} color={typeColors[id]} />;
      case '39':
        return <Icon name="restaurant" size={30} color={typeColors[id]} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.markerContainer}>
      <Text style={styles.markerTitle}>{marker.title}</Text>
      {renderIcon()}
    </View>
  );
});

const styles = StyleSheet.create({
  markerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    borderRadius: 5,
    padding: 5,
  },
  markerTitle: {
    width: 'auto',
    backgroundColor: '#191919',
    padding: 4,
    fontWeight: '600',
    color: '#fff',
    borderRadius: 20,
    textAlign: 'center',
    marginBottom: 5, // 아이콘과 텍스트 간격
  }
});

export default MemoizedMarker;
