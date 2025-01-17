import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import axiosInstance from '@/lib/axios';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Loading from './Loading';

export interface IAppointment {
  id: number;
  usuario: {
    id: number;
    nombre: string;
    correo: string;
    telefono: string;
  };
  mascota: {
    id: number;
    idUsuario: number;
    nombre: string;
    especie: string;
    raza: string;
  };
  fechaCita: string;
  horaCita: string;
  motivo: string;
  estado: 'Programado' | 'Atendido' | 'Cancelado';
}

type Props = {
  setSelectService: React.Dispatch<React.SetStateAction<string | null>>;
  setDataUpdatAppointments: React.Dispatch<
    React.SetStateAction<IAppointment | null>
  >;
};

const CardAppointment: React.FC<Props> = ({
  setSelectService,
  setDataUpdatAppointments,
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAppointment = async () => {
    setIsLoading(true);

    try {
      const { data } = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/appointment/${user?.id}`
      );
      setAppointments(data);
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
      setIsLoading(false);
    }
  };

  const onDelete = async (id: number) => {
    try {
      const { data, status } = await axiosInstance.delete(
        `${import.meta.env.VITE_API_URL}/appointment/delete/${id}`
      );
      if (status === 200) {
        toast({
          className: 'bg-green-200',
          variant: 'default',
          title: data.message,
        });

        fetchAppointment();

        setSelectService('Consular O Cancelar Citas');
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
    }
  };

  useEffect(() => {
    if (user && isAuthenticated && !loading) {
      fetchAppointment();
    }
  }, [user, isAuthenticated, loading]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-10">
          {appointments.map(
            ({ id, estado, fechaCita, horaCita, mascota, usuario, motivo }) => (
              <Card
                key={id}
                onClick={() => {
                  setSelectService('Actualizar Cita');
                  setDataUpdatAppointments({
                    id,
                    estado,
                    fechaCita,
                    horaCita,
                    mascota,
                    usuario,
                    motivo,
                  });
                }}
                className="w-full lg:max-w-[450px] bg-green-50 rounded-none border-none shadow-lg cursor-pointer"
              >
                <CardHeader className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-primary">Cita #{id}</CardTitle>
                    <Badge
                      variant="outline"
                      className={`${
                        estado === 'Programado'
                          ? 'text-yellow-500 border-yellow-500'
                          : estado === 'Atendido'
                          ? 'text-green-500 border-green-500'
                          : 'text-red-500 border-red-500'
                      }`}
                    >
                      {estado}
                    </Badge>
                  </div>
                  <div className="flex flex-col">
                    <p>
                      <strong>Fecha:</strong> {fechaCita}
                    </p>
                    <p>
                      <strong>Hora:</strong> {horaCita}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Motivo:</strong> {motivo}
                  </p>
                  <p>
                    <strong>Mascota:</strong> {mascota.nombre} (
                    {mascota.especie}, {mascota.raza})
                  </p>
                  <p>
                    <strong>Dueño:</strong> {usuario.nombre}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {usuario.telefono}
                  </p>
                </CardContent>
                {estado === 'Programado' && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(id);
                    }}
                    className="w-full bg-red-100 text-red-500 font-bold py-2 px-4 rounded-none text-lg shadow-lg hover:bg-red-100/50 transition duration-300 uppercase"
                  >
                    Cancelar Cita
                  </Button>
                )}
              </Card>
            )
          )}
        </div>
      )}
    </>
  );
};

export default CardAppointment;
