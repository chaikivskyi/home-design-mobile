import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useImagePicker, Picked } from '@/features/design-brief/hooks/useImagePicker';
import { ImagePreview } from '@/features/design-brief/components/ImagePreview';
import { PickerRow } from '@/features/design-brief/components/PickerRow';
import { UploadButton } from '@/features/design-brief/components/UploadButton';

export default function DesignScreen() {
  const [picked, setPicked] = useState<Picked>(null);
  const [uploading, setUploading] = useState(false);
  const { pickFromGallery, takePhoto } = useImagePicker();

  const uploadUrl = 'https://your.api/upload';

  const changePhoto = () => {
    Alert.alert('Change photo', 'Pick a source', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Gallery', onPress: async () => handlePick('gallery') },
      { text: 'Camera', onPress: async () => handlePick('camera') },
    ]);
  };

  const handlePick = async (source: 'gallery' | 'camera') => {
    try {
      const asset = source === 'gallery' ? await pickFromGallery() : await takePhoto();
      if (!asset) return;
      setPicked(asset);
    } catch (e: any) {
      Alert.alert(
        source === 'gallery' ? 'Gallery error' : 'Camera error',
        e?.message ?? 'Something went wrong',
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Upload an image</Text>

        <ImagePreview uri={picked?.uri} onChangePress={changePhoto} />

        <PickerRow
          onPickFromGallery={() => handlePick('gallery')}
          onTakePhoto={() => handlePick('camera')}
        />

        <UploadButton
          picked={picked}
          uploading={uploading}
          setUploading={setUploading}
          uploadUrl={uploadUrl}
          onSuccess={() => {
            Alert.alert('Success', 'Image uploaded successfully.');
            setPicked(null);
          }}
          onError={(msg) => Alert.alert('Upload error', msg)}
          title="Continue"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 16, gap: 16, flexGrow: 1 },
  title: { fontSize: 20, fontWeight: '600' },
  note: { color: '#666', fontSize: 12 },
});
