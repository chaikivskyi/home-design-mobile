import React, { useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import type { Picked } from '@/features/design-brief/hooks/useImagePicker';
import {useCreateProject} from "@/features/design-brief/hooks/useCreateProject";

type Props = {
  picked: Picked;
  uploading: boolean;
  setUploading: (v: boolean) => void;
  onSuccess?: () => void;
  onError?: (message: string) => void;
  title?: string;
};

export function UploadButton({
  picked,
  uploading,
  setUploading,
  onSuccess,
  onError,
  title,
}: Props) {
    const { mutateAsync: createProject } = useCreateProject();

    const doUpload = useCallback(async () => {

    if (!picked) return;

    try {
      setUploading(true);
      await createProject({image: picked});
    } catch (e: any) {
        console.log(e);
      onError?.(e?.message ?? 'Unable to upload image.');
    } finally {
      setUploading(false);
    }
  }, [picked, setUploading, onSuccess, onError]);

  return (
    <Button
      title={uploading ? 'Uploading...' : (title ?? 'Upload')}
      onPress={doUpload}
      disabled={!picked || uploading}
    />
  );
}
