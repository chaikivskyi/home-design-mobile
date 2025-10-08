import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/services/api/client';

export type Me = { id: string; name: string; email: string };

async function fetchMe(): Promise<Me> {
  const res = await apiFetch('/api/me');
  return res.json();
}

export function useMe() {
  return useQuery({ queryKey: ['me'], queryFn: fetchMe, enabled: true });
}
