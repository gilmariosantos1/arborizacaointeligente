import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { login as loginService } from '../services/AuthService';

export type User = {
  id?: number | string;
  email?: string;
  nome?: string;
  [key: string]: unknown;
} | null;

type AuthContextValue = {
  signed: boolean;
  user: User;
  loading: boolean;
  login: (email: string, senha: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storagedUser = localStorage.getItem('@ArborizacaoInteligente:user') || localStorage.getItem('usuario');

    if (storagedUser) {
      try {
        setUser(JSON.parse(storagedUser));
      } catch (error) {
        console.error('Erro ao recuperar usuário do localStorage:', error);
        localStorage.removeItem('@ArborizacaoInteligente:user');
        localStorage.removeItem('usuario');
      }
    }

    setLoading(false);
  }, []);

  const login = async (email: string, senha: string) => {
    if (!email?.trim() || !senha?.trim()) {
      return { success: false, message: 'E-mail e senha são obrigatórios.' };
    }

    try {
      const response = await loginService(email, senha);
      const loggedUser = response.user || response.usuario || {
        email,
        nome: email.split('@')[0] || 'Usuário',
      };

      setUser(loggedUser);
      localStorage.setItem('@ArborizacaoInteligente:user', JSON.stringify(loggedUser));
      localStorage.setItem('usuario', JSON.stringify(loggedUser));

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Erro ao realizar login.',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('@ArborizacaoInteligente:user');
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({ signed: !!user, user, loading, login, logout }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }

  return context;
}
