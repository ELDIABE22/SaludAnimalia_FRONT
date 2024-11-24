import { toast } from '@/hooks/use-toast';
import { formLoginSchema, formRegisterSchema } from '@/lib/zod';
import axios from 'axios';
import Cookies from 'js-cookie';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { z } from 'zod';

export type Props = {
  children: ReactNode;
};

export interface IAuthUser {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
}

export interface IAuthContextValue {
  user: IAuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  formLoading: boolean;
  signin: (values: z.infer<typeof formLoginSchema>) => Promise<void>;
  signup: (values: z.infer<typeof formRegisterSchema>) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContextValue | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const signin = async (values: z.infer<typeof formLoginSchema>) => {
    setFormLoading(true);

    try {
      const { data, status } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        values
      );
      if (status === 200) {
        toast({
          className: 'bg-green-200',
          variant: 'default',
          title: data.message,
        });

        Cookies.set('token', data.data.token, {
          expires: 1,
          sameSite: 'Strict',
        });

        Cookies.set('userData', JSON.stringify(data.data.usuario), {
          expires: 1,
          sameSite: 'Strict',
        });

        window.location.href = '/virtual-office';
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response?.status !== undefined &&
          error.response?.status >= 400 &&
          error.response?.status <= 499
        ) {
          toast({
            variant: 'destructive',
            title:
              error.response?.data.message ||
              error.response?.data.mensaje ||
              'Error interno, intenta más tarde!',
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Error interno, intenta más tarde!',
          });
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Error interno, intenta más tarde!',
        });
      }
    } finally {
      setFormLoading(false);
    }
  };

  const signup = async (values: z.infer<typeof formRegisterSchema>) => {
    setFormLoading(true);

    try {
      const { data, status } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        values
      );

      if (status === 201) {
        toast({
          className: 'bg-green-200',
          variant: 'default',
          title: data.message,
        });

        window.location.href = '/auth/login';
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response?.status !== undefined &&
          error.response?.status >= 400 &&
          error.response?.status <= 499
        ) {
          toast({
            variant: 'destructive',
            title:
              error.response?.data.message ||
              error.response?.data.mensaje ||
              'Error interno, intenta más tarde!',
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Error interno, intenta más tarde!',
          });
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Error interno, intenta más tarde!',
        });
      }
    } finally {
      setFormLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('userData');

    window.location.href = '/';

    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get('token');
      const userData = Cookies.get('userData');

      if (!token || !userData) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
      setLoading(false);
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        formLoading,
        signin,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
