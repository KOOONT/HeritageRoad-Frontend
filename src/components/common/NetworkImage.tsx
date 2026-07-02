import React, { ReactNode, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageResizeMode,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { toImageProxyUrl } from '../../utils/imageUrl';

type NetworkImageProps = {
  uri?: string | null;
  style: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
  proxyWidth?: number;
  children?: ReactNode;
};

const NetworkImage = ({
  uri,
  style,
  imageStyle,
  resizeMode = 'cover',
  proxyWidth = 640,
  children,
}: NetworkImageProps) => {
  const imageUri = toImageProxyUrl(uri, proxyWidth);
  const [isLoading, setIsLoading] = useState(Boolean(imageUri));
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(imageUri) && !hasError;

  useEffect(() => {
    setIsLoading(Boolean(imageUri));
    setHasError(false);
  }, [imageUri]);

  return (
    <View style={[styles.container, style]}>
      {showImage ? (
        <Image
          style={[styles.image, imageStyle]}
          source={{ uri: imageUri as string }}
          resizeMode={resizeMode}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
      ) : (
        <View style={styles.fallback}>
          <Icon name="image-outline" size={28} color="#8A8F98" />
        </View>
      )}
      {children}
      {showImage && isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator color="#0AAAB8" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#ECEFF3',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECEFF3',
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default NetworkImage;
