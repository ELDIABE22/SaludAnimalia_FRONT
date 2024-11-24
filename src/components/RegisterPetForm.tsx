import { formRegisterPetSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
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
import { IPet } from './CardPet';

type Props = {
  dataUpdatePet: IPet | null;
  setSelectService: React.Dispatch<React.SetStateAction<string | null>>;
  setDataUpdatePet: React.Dispatch<React.SetStateAction<IPet | null>>;
};

const RegisterPetForm: React.FC<Props> = ({
  setSelectService,
  dataUpdatePet,
  setDataUpdatePet,
}) => {
  const [formLoading, setFormLoading] = useState(false);

  const { user } = useAuth();

  const form = useForm<z.infer<typeof formRegisterPetSchema>>({
    resolver: zodResolver(formRegisterPetSchema),
    defaultValues: {
      nombre: '',
      especie: '',
      raza: '',
      edad: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formRegisterPetSchema>) => {
    setFormLoading(true);
    try {
      if (!dataUpdatePet) {
        const { data, status } = await axiosInstance.post(
          `${import.meta.env.VITE_API_URL}/pet/new`,
          {
            ...values,
            idUsuario: user?.id,
          }
        );
        if (status === 201) {
          toast({
            className: 'bg-green-200',
            variant: 'default',
            title: data.message,
          });

          setSelectService('Consultar Mis Mascotas');

          form.reset();
        }
      } else {
        const { data, status } = await axiosInstance.put(
          `${import.meta.env.VITE_API_URL}/pet/update`,
          {
            ...values,
            id: dataUpdatePet.id,
            idUsuario: dataUpdatePet.idUsuario,
          }
        );
        if (status === 200) {
          toast({
            className: 'bg-green-200',
            variant: 'default',
            title: data.message,
          });

          setDataUpdatePet(null);

          setSelectService('Consultar Mis Mascotas');

          form.reset();
        }
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

  const onDelete = async () => {
    setFormLoading(true);
    try {
      const { data, status } = await axiosInstance.delete(
        `${import.meta.env.VITE_API_URL}/pet/delete/${dataUpdatePet?.id}`
      );
      if (status === 200) {
        toast({
          className: 'bg-green-200',
          variant: 'default',
          title: data.message,
        });

        setDataUpdatePet(null);

        setSelectService('Consultar Mis Mascotas');

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

  useEffect(() => {
    if (dataUpdatePet) {
      form.setValue('nombre', dataUpdatePet.nombre);
      form.setValue('especie', dataUpdatePet.especie);
      form.setValue('raza', dataUpdatePet.raza);
      form.setValue('edad', dataUpdatePet.edad.toString());
    }
  }, [dataUpdatePet]);

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
                    placeholder="Ingresa el nombre de la mascota"
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
            name="especie"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-primary">
                  Especie
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ingresa la especie de la mascota"
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
            name="raza"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-primary">Raza</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ingresa la raza de la mascota"
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
            name="edad"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-primary">Edad</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ingresa la edad de la mascota"
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
              {!dataUpdatePet && formLoading && <Loader2 className="animate-spin mr-2" />}
              {!dataUpdatePet && formLoading
                ? !dataUpdatePet
                  ? 'Registrando...'
                  : 'Actualizando...'
                : !dataUpdatePet
                ? 'Registrar'
                : 'Actualizar'}
            </Button>
          </motion.div>

          {dataUpdatePet && (
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
                type="button"
                disabled={formLoading}
                onClick={onDelete}
                className="w-full bg-red-100 text-red-500 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-red-100/50 transition duration-300 uppercase"
              >
                {formLoading && <Loader2 className="animate-spin mr-2" />}
                {formLoading ? 'Eliminando...' : 'Eliminar'}
              </Button>
            </motion.div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default RegisterPetForm;
