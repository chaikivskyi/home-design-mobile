import React, { createContext, useContext } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useRegister } from '@/features/auth/hooks/useRegister';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { useLogout } from '@/features/auth/hooks/useLogout';

type AuthContextValue = {
  authenticated: boolean | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  setToken: (token: string | null) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { authenticated, setToken } = useAuth();
  const { mutateAsync: logoutMutate } = useLogout();
  const { mutateAsync: loginMutate } = useLogin();
  const { mutateAsync: registerMutate } = useRegister();

  async function login(email: string, password: string) {
    const response = await loginMutate({ email, password });
    setToken(response.data.access_token);
  }

  async function register(
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) {
    const response = await registerMutate({ name, email, password, password_confirmation });
    setToken(response.meta.token.access_token);
  }

  async function logout() {
    await logoutMutate();
    setToken(null);
  }

  const value = useMemo<AuthContextValue>(
    () => ({ authenticated, login, register, logout, setToken }),
    [authenticated, login, register, logout, setToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('AuthProvider missing');
  }

  return ctx;
}
