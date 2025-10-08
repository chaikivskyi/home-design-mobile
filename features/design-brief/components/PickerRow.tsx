import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@/components/ui/Button';

type Props = {
  onPickFromGallery: () => void;
  onTakePhoto: () => void;
};

export function PickerRow({ onPickFromGallery, onTakePhoto }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.flex1}>
        <Button title="Pick from Gallery" onPress={onPickFromGallery} />
      </View>
      <View style={styles.flex1}>
        <Button title="Take Photo" onPress={onTakePhoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  flex1: { flex: 1 },
});
