import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/services/api/client';
import { TokenEntity } from '@/features/auth/types/token.type';

type LoginInput = { email: string; password: string };
type LoginResponse = { data: TokenEntity };

async function loginRequest(input: LoginInput): Promise<LoginResponse> {
  const response = await apiFetch('/api/tokens', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  const responseData = (await response.json()) as LoginResponse;

  if (!responseData?.data?.access_token) {
    throw new Error('Unable to login');
  }

  return responseData;
}

export function useLogin() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginInput) => loginRequest(payload),
    onSuccess: async (data) => {
      await client.invalidateQueries({ queryKey: ['me'] });
    },
  });
}
