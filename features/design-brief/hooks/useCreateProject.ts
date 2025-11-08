import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/services/api/client';
import {ProjectEntity} from "@/features/design-brief/types/project.type";
import {ImagePickerAsset} from "expo-image-picker/src/ImagePicker.types";
import {Platform} from "react-native";

type CreateProjectInput = {
    image: ImagePickerAsset;
};
type ProjectResponse = { data: ProjectEntity };

const FormData = global.FormData;

async function createProjectRequest(input: CreateProjectInput): Promise<ProjectResponse> {
    const form = new FormData();
    const filePart = {
        uri: input.image.uri,
        name: input.image.fileName ?? input.image.uri.split('/').pop(),
        type: input.image.mimeType,
    };

    form.append('image', Platform.OS === 'web' ? input.image.file : filePart);

    const response = await apiFetch('/api/projects', {
        method: 'POST',
        body: form
    });

    const responseData = (await response.json()) as ProjectResponse;

    if (!responseData?.data?.id) {
        throw new Error('Unable to create user');
    }

    return responseData;
}

export function useCreateProject() {
    const client = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateProjectInput) => createProjectRequest(payload),
        onSuccess: async (data) => {
            client.setQueryData(['project'], data.data);
        },
    });
}
