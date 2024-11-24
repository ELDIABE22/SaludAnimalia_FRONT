import { useAuth } from '@/hooks/useAuth';
import axiosInstance from '@/lib/axios';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import { PawPrint } from 'lucide-react';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

type Props = {
  setSelectService: React.Dispatch<React.SetStateAction<string | null>>;
  setDataUpdatePet: React.Dispatch<React.SetStateAction<IPet | null>>;
};

export interface IPet {
  id: number;
  idUsuario: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
}

const CardPet: React.FC<Props> = ({ setSelectService, setDataUpdatePet }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const [pets, setPets] = useState<IPet[]>([]);

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

  useEffect(() => {
    if (user && isAuthenticated && !loading) {
      fetchPet();
    }
  }, [user, isAuthenticated, loading]);

  return (
    <div
      className={`${
        pets.length > 0
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-around gap-6'
          : 'flex justify-center items-center'
      } mx-10`}
    >
      {pets.length > 0 ? (
        pets.map((pet) => (
          <motion.div
            key={pet.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Card
              className="w-full lg:w-[450px] bg-green-50 hover:bg-green-200 rounded-none border-none shadow-lg cursor-pointer"
              onClick={() => {
                setSelectService('Actualizar Datos');
                setDataUpdatePet(pet);
              }}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="h-16 w-16 flex items-center justify-center border-2 border-green-600 rounded-full">
                  <PawPrint size={40} />
                </div>
                <div className="flex flex-col gap-y-1">
                  <CardTitle className="text-primary">{pet.nombre}</CardTitle>
                  <Badge
                    variant="outline"
                    className="text-primary bg-green-300 border-none"
                  >
                    {pet.especie}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <dt className="font-semibold text-primary">Raza:</dt>
                    <dd>{pet.raza}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-primary">Edad:</dt>
                    <dd>{pet.edad}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </motion.div>
        ))
      ) : (
        <p className="text-center text-lg font-medium">
          No tienes mascotas registradas.
        </p>
      )}
    </div>
  );
};

export default CardPet;
