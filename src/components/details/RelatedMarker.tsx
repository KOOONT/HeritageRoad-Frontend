import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Callout, MapMarker, Marker } from 'react-native-maps';

import { MapProps, RelatedItem } from '../../types';
import { TYPES_NAME } from '../../constants/options';

const images = {
  '12': require('../../../assets/Placeholder.png'),
  '32': require('../../../assets/Hotel.png'),
  '39': require('../../../assets/Cutlery.png'),
} as const;

const RelatedMarker = ({ relatedMarkers, setModalData, markerRefs } : { 
  relatedMarkers: RelatedItem[], 
  setModalData: React.Dispatch<React.SetStateAction<MapProps>>,
  markerRefs: React.MutableRefObject<{
    [key: string]: MapMarker | null;
  }>;
}) => {
  return (
    relatedMarkers?.map((marker) => (
      <Marker
        key={marker.contentId}
        ref={ref => { markerRefs.current[marker.contentId] = ref; }} // Store ref in markerRefs
        icon={images[marker.contentTypeId as keyof typeof images]}
        useLegacyPinView
        opacity={0.8}
        coordinate={{
          latitude: parseFloat(marker.mapY),
          longitude: parseFloat(marker.mapX)
        }}
        calloutAnchor={{x: 0.5, y:-0.2}}
        onPress={() => 
          setModalData({
            lat: marker.mapY,
            lng: marker.mapX,
            title: marker.title, 
            subTitle: TYPES_NAME[marker.contentTypeId],
            image: marker.firstImage
          })
        }
      >
        <Callout tooltip>
          <Text style={styles.markerTitle}>{marker.title}</Text>
        </Callout>
      </Marker>
    ))
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  markerTitle: {
    width: 'auto',
    fontWeight: 'bold',
    backgroundColor: '#191919',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
});

export default RelatedMarker;
