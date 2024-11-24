import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import {
  ArrowLeftToLine,
  CalendarClock,
  CalendarRange,
  Cat,
  NotebookPen,
  PawPrint,
  PencilLine,
  UserPen,
  UserRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import CardPet, { IPet } from '@/components/CardPet';
import ServiceCard from '@/components/ServiceCard';
import RegisterPetForm from '@/components/RegisterPetForm';
import EditProfileForm from '@/components/EditProfileForm';
import CardAppointment, { IAppointment } from '@/components/CardAppointment';
import RegisterAppointmentForm from '@/components/RegisterAppointmentForm';

const cardItem = [
  {
    title: 'Editar Perfil',
    icon: UserPen,
    href: '#',
  },
  {
    title: 'Mascotas',
    icon: PawPrint,
    href: '#',
    children: [
      {
        title: 'Registrar Mascota',
        icon: PencilLine,
        href: '#',
      },
      {
        title: 'Consultar Mis Mascotas',
        icon: Cat,
        href: '#',
      },
    ],
  },
  {
    title: 'Citas',
    icon: CalendarClock,
    href: '#',
    children: [
      {
        title: 'Solicitar Cita',
        icon: NotebookPen,
        href: '#',
      },
      {
        title: 'Consular O Cancelar Citas',
        icon: CalendarRange,
        href: '#',
      },
    ],
  },
];

const VirtualOffice = () => {
  const [appointment, setAppointment] = useState<IAppointment[]>([]);
  const [selectService, setSelectService] = useState<string | null>(null);
  const [dataUpdatePet, setDataUpdatePet] = useState<IPet | null>(null);
  const [dataUpdatAppointments, setDataUpdatAppointments] =
    useState<IAppointment | null>(null);

  const { user, logout, isAuthenticated, loading } = useAuth();

  const fetchAppointmentUser = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/appointment/${user?.id}`
      );
      const appointmentsPending = data.filter(
        (item: IAppointment) => item.estado === 'Programado'
      );
      setAppointment(appointmentsPending);
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
      fetchAppointmentUser();
    }
  }, [user, isAuthenticated, loading]);

  if (!isAuthenticated && !loading) {
    return (window.location.href = '/auth/login');
  }

  return (
    <section className="min-h-screen flex flex-col">
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-2 px-4 py-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <PawPrint className="text-green-500" size={60} />
            <span className="text-4xl font-bold text-white">
              Oficina Virtual
            </span>
          </motion.div>

          <motion.div
            className="flex items-center gap-x-5 bg-green-50 px-4 py-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <UserRound size={60} className="text-green-500" />
            <div className="flex flex-col">
              <p className="uppercase font-bold text-green-600">
                {user?.nombre}
              </p>
              <p className="text-sm">
                TIENES{' '}
                <span className="text-green-600 font-bold">
                  {appointment.length}
                </span>{' '}
                CITAS PENDIENTES
              </p>
              <Link
                to="#"
                onClick={logout}
                className="text-green-500 hover:underline"
              >
                Cerrar Sesión
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      <motion.section
        className="relative h-[300px] md:h-[500px] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div className="relative h-[300px] md:h-[500px] w-full">
          <img
            src="/fondo.png"
            alt="fondo"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </motion.section>

      <section className="space-y-5 mb-10">
        {selectService !== null && (
          <motion.div
            className="flex w-full border-b"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Link
              to="#"
              className="w-full max-w-[500px] flex justify-center gap-x-2 p-5 bg-green-500 text-white font-bold uppercase hover:underline"
              onClick={() => {
                if (dataUpdatePet) setDataUpdatePet(null);
                if (dataUpdatAppointments) setDataUpdatAppointments(null);
                setSelectService(null);
              }}
            >
              <ArrowLeftToLine color="#FFFF" />
              Volver atrás
            </Link>
            <div className="w-full flex justify-center items-center">
              <p className="text-green-600 font-bold text-xl uppercase">
                {selectService}
              </p>
            </div>
          </motion.div>
        )}

        <div className="border-b p-5">
          <p className="text-center text-lg font-medium">
            Selecciona el servicio
          </p>
        </div>

        {selectService === 'Registrar Mascota' ||
        selectService === 'Actualizar Datos' ? (
          <RegisterPetForm
            dataUpdatePet={dataUpdatePet}
            setDataUpdatePet={setDataUpdatePet}
            setSelectService={setSelectService}
          />
        ) : selectService === 'Solicitar Cita' ||
          selectService === 'Actualizar Cita' ? (
          <RegisterAppointmentForm
            dataUpdatAppointments={dataUpdatAppointments}
            setDataUpdatAppointments={setDataUpdatAppointments}
            setSelectService={setSelectService}
          />
        ) : selectService === 'Consultar Mis Mascotas' ? (
          <CardPet
            setDataUpdatePet={setDataUpdatePet}
            setSelectService={setSelectService}
          />
        ) : selectService === 'Editar Perfil' ? (
          <EditProfileForm setSelectService={setSelectService} />
        ) : selectService === 'Consular O Cancelar Citas' ? (
          <CardAppointment
            setSelectService={setSelectService}
            setDataUpdatAppointments={setDataUpdatAppointments}
          />
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-10"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {selectService === null
              ? cardItem.map(({ href, icon, title }, index) => (
                  <ServiceCard
                    key={index}
                    href={href}
                    icon={icon}
                    title={title}
                    onClick={() => setSelectService(title)}
                  />
                ))
              : cardItem
                  .find((item) => item.title === selectService)
                  ?.children?.map(({ href, icon, title }, index) => (
                    <ServiceCard
                      key={index}
                      href={href}
                      icon={icon}
                      title={title}
                      onClick={() => setSelectService(title)}
                    />
                  ))}
          </motion.div>
        )}
      </section>

      <Footer />
    </section>
  );
};

export default VirtualOffice;
