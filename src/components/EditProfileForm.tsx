import { formUpdateUserSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import axiosInstance from '@/lib/axios';
import { useAuth } from '@/hooks/useAuth';
import Cookies from 'js-cookie';

type Props = {
  setSelectService: React.Dispatch<React.SetStateAction<string | null>>;
};

const EditProfileForm: React.FC<Props> = ({ setSelectService }) => {
  const [formLoading, setFormLoading] = useState(false);
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formUpdateUserSchema>>({
    resolver: zodResolver(formUpdateUserSchema),
    defaultValues: {
      nombre: user?.nombre || '',
      email: user?.email || '',
      telefono: user?.telefono || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formUpdateUserSchema>) => {
    setFormLoading(true);
    try {
      const { data, status } = await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/auth/update/${user?.id}`,
        values
      );
      if (status === 200) {
        toast({
          className: 'bg-green-200',
          variant: 'default',
          title: data.message,
        });

        Cookies.set('userData', JSON.stringify(data.data), {
          sameSite: 'Strict',
        });

        window.location.reload();

        setSelectService(null);
        form.reset();
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

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 sm:space-x-0 mx-10 w-full max-w-[600px]"
        >
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-primary">Nombre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ingresa tu nombre"
                    disabled={formLoading}
                    className="border-green-300 p-5 border-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-primary">
                  Correo Eletrónico
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ingresa tu correo"
                    disabled
                    className="border-green-300 p-5 border-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-primary">
                  Teléfono
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ingresa tu teléfono"
                    disabled={formLoading}
                    className="border-green-300 p-5 border-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.6, ease: 'easeOut' },
              },
            }}
            className="w-full"
          >
            <Button
              type="submit"
              disabled={formLoading}
              className="w-full bg-green-100 text-green-500 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-green-100/50 transition duration-300 uppercase"
            >
              {formLoading && <Loader2 className="animate-spin mr-2" />}
              {formLoading ? 'Actualizando...' : 'Actualizar'}
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  );
};

export default EditProfileForm;
