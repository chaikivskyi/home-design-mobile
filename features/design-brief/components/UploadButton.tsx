import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import { Button } from '@/components/ui/Button';
import type { Picked } from '@/features/design-brief/hooks/useImagePicker';

type Props = {
  picked: Picked;
  uploading: boolean;
  setUploading: (v: boolean) => void;
  uploadUrl: string;
  onSuccess?: () => void;
  onError?: (message: string) => void;
  title?: string;
};

async function safeText(res: Response) {
  try {
    return await res.text();
  } catch {
    return '';
  }
}

export function UploadButton({
  picked,
  uploading,
  setUploading,
  uploadUrl,
  onSuccess,
  onError,
  title,
}: Props) {
  const doUpload = useCallback(async () => {
    if (!picked) return;

    try {
      setUploading(true);

      const form = new FormData();
      const filename = picked.fileName ?? picked.uri.split('/').pop() ?? 'upload.jpg';
      const mime = picked.mimeType ?? 'image/jpeg';

      form.append('file', {
        // @ts-ignore RN file
        uri: picked.uri,
        name: filename,
        type: mime,
      });

      const res = await fetch(uploadUrl, {
        method: 'POST',
        headers: { ...(Platform.OS === 'web' ? {} : { Accept: 'application/json' }) },
        body: form,
      });

      if (!res.ok) {
        const msg = await safeText(res);
        throw new Error(`Upload failed: ${res.status} ${msg}`);
      }

      onSuccess?.();
    } catch (e: any) {
      onError?.(e?.message ?? 'Unable to upload image.');
    } finally {
      setUploading(false);
    }
  }, [picked, setUploading, uploadUrl, onSuccess, onError]);

  return (
    <Button
      title={uploading ? 'Uploading...' : (title ?? 'Upload')}
      onPress={doUpload}
      disabled={!picked || uploading}
    />
  );
}
