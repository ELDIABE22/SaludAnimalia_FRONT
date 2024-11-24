import { useForm } from 'react-hook-form';
import { IAppointment } from './CardAppointment';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { formAppointmentSchema } from '@/lib/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { IPet } from './CardPet';
import axiosInstance from '@/lib/axios';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

type Props = {
  dataUpdatAppointments: IAppointment | null;
  setSelectService: React.Dispatch<React.SetStateAction<string | null>>;
  setDataUpdatAppointments: React.Dispatch<
    React.SetStateAction<IAppointment | null>
  >;
};

const RegisterAppointmentForm: React.FC<Props> = ({
  dataUpdatAppointments,
  setSelectService,
  setDataUpdatAppointments,
}) => {
  const [formLoading, setFormLoading] = useState(false);
  const [pets, setPets] = useState<IPet[]>([]);

  const { user, isAuthenticated, loading } = useAuth();

  const form = useForm<z.infer<typeof formAppointmentSchema>>({
    resolver: zodResolver(formAppointmentSchema),
    defaultValues: {
      idMascota: '',
      fechaCita: '',
      horaCita: '',
      motivo: '',
    },
  });

  const fetchPet = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/pet/${user?.id}`
      );
      setPets(data);
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
    }
  };

  const onSubmit = async (values: z.infer<typeof formAppointmentSchema>) => {
    setFormLoading(true);

    const dataAppointment = {
      ...values,
      idUsuario: user?.id,
      idMascota: parseInt(values.idMascota),
      horaCita: !dataUpdatAppointments
        ? `${values.horaCita}:00`
        : dataUpdatAppointments.horaCita === values.horaCita
        ? values.horaCita
        : `${values.horaCita}:00`,
    };

    try {
      if (!dataUpdatAppointments) {
        const { data, status } = await axiosInstance.post(
          `${import.meta.env.VITE_API_URL}/appointment/new`,
          dataAppointment
        );
        if (status === 201) {
          toast({
            className: 'bg-green-200',
            variant: 'default',
            title: data.message,
          });

          setSelectService('Consular O Cancelar Citas');

          form.reset();
        }
      } else {
        const { data, status } = await axiosInstance.put(
          `${import.meta.env.VITE_API_URL}/appointment/update/${
            dataUpdatAppointments.id
          }`,
          {
            ...dataAppointment,
            estado: dataUpdatAppointments.estado,
          }
        );
        if (status === 200) {
          toast({
            className: 'bg-green-200',
            variant: 'default',
            title: data.message,
          });

          setDataUpdatAppointments(null);

          setSelectService('Consular O Cancelar Citas');

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

  useEffect(() => {
    if (user && isAuthenticated && !loading) {
      fetchPet();
    }
  }, [user, isAuthenticated, loading]);

  useEffect(() => {
    if (dataUpdatAppointments) {
      form.setValue('idMascota', dataUpdatAppointments.mascota.id.toString());
      form.setValue('fechaCita', dataUpdatAppointments.fechaCita);
      form.setValue('horaCita', dataUpdatAppointments.horaCita);
      form.setValue('motivo', dataUpdatAppointments.motivo);
    }
  }, [dataUpdatAppointments]);

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 sm:space-x-0 mx-10 w-full max-w-[600px]"
        >
          <FormField
            control={form.control}
            name="idMascota"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="uppercase text-primary">
                  Mascota
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        disabled={formLoading}
                        className={cn(
                          'justify-between border-green-300 p-5 border-2',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? pets.find(
                              (item) => item.id.toString() === field.value
                            )?.nombre
                          : 'Seleccionar la mascota'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          {pets.map((item) => (
                            <CommandItem
                              disabled={formLoading}
                              value={item.id.toString()}
                              key={item.id}
                              onSelect={() => {
                                form.setValue('idMascota', item.id.toString());
                              }}
                            >
                              {item.nombre}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  item.id.toString() === field.value
                                    ? 'opacity-100 text-green-600'
                                    : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-x-5">
            <FormField
              control={form.control}
              name="fechaCita"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="uppercase text-primary">
                    Fecha
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      placeholder="Ingresa la fecha de la cita"
                      disabled={formLoading}
                      className="border-green-300 p-5 border-2 w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="horaCita"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className="uppercase text-primary">Hora</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="time"
                      placeholder="Ingresa la hora de la cita"
                      disabled={formLoading}
                      className="border-green-300 p-5 border-2 w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="motivo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-primary">Motivo</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Ingresa el motivo de la cita"
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
              {!dataUpdatAppointments && formLoading && (
                <Loader2 className="animate-spin mr-2" />
              )}
              {!dataUpdatAppointments && formLoading
                ? !dataUpdatAppointments
                  ? 'Creando...'
                  : 'Actualizando...'
                : !dataUpdatAppointments
                ? 'Crear'
                : 'Actualizar'}
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterAppointmentForm;
