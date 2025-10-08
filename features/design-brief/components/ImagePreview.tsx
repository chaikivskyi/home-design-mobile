import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  uri?: string | null;
  onChangePress?: () => void;
};

export function ImagePreview({ uri, onChangePress }: Props) {
  return (
    <View style={styles.box}>
      {uri ? (
        <>
          <Image source={{ uri }} style={styles.img} resizeMode="contain" />
          <Pressable onPress={onChangePress} style={styles.centerBtn} hitSlop={10}>
            <Text style={styles.centerBtnText}>Change image</Text>
          </Pressable>
        </>
      ) : (
        <Text style={styles.placeholder}>No image selected</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    minHeight: 220,
    maxHeight: 420,
    backgroundColor: '#fafafa',
  },
  img: { width: '100%', height: '100%' },
  placeholder: { color: '#888' },
  centerBtn: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBtnText: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
});
