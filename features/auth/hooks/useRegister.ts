import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch, setAuthToken } from "@/services/api/client";
import { saveToken } from "@/features/auth/services/authStorage";
import {UserEntity} from "@/features/auth/types/user.type";
import {TokenEntity} from "@/features/auth/types/token.type";

type RegisterInput = { name: string, email: string; password: string, password_confirmation: string };
type RegisterResponse = { data: UserEntity, meta: {token: TokenEntity} };

async function registerRequest(input: RegisterInput): Promise<RegisterResponse> {
    const response = await apiFetch("/api/users", {
        method: "POST",
        body: JSON.stringify(input),
    });
    const responseData = (await response.json()) as RegisterResponse;

    if (!responseData?.data?.id) {
        throw new Error("Unable to create user");
    }

    return responseData;
}

export function useRegister() {
    const client = useQueryClient();

    return useMutation({
        mutationFn: (payload: RegisterInput) => registerRequest(payload),
        onSuccess: async (data) => {
            client.setQueryData(["me"], data.data);
        },
    });
}
