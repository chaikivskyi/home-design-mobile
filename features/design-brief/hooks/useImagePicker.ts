import { useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';

export type Picked = ImagePicker.ImagePickerAsset | null;

function ensureImage(asset?: ImagePicker.ImagePickerAsset) {
  if (!asset) return null;
  const mime = asset.mimeType ?? '';
  const uri = asset.uri.toLowerCase();
  const isImage =
    mime.startsWith('image/') ||
    uri.endsWith('.jpg') ||
    uri.endsWith('.jpeg') ||
    uri.endsWith('.png') ||
    uri.endsWith('.heic') ||
    uri.endsWith('.webp');
  return isImage ? asset : null;
}

export function useImagePicker() {
  const requestMediaLibraryPerm = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') throw new Error('Gallery permission denied');
  }, []);

  const requestCameraPerm = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') throw new Error('Camera permission denied');
  }, []);

  const pickFromGallery = useCallback(async () => {
    await requestMediaLibraryPerm();
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.9,
      exif: false,
    });
    if (res.canceled) return null;
    return ensureImage(res.assets?.[0]);
  }, [requestMediaLibraryPerm]);

  const takePhoto = useCallback(async () => {
    await requestCameraPerm();
    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.9,
      exif: false,
    });
    if (res.canceled) return null;
    return ensureImage(res.assets?.[0]);
  }, [requestCameraPerm]);

  return { pickFromGallery, takePhoto };
}
