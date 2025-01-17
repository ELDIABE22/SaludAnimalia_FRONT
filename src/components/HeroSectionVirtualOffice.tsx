import { useState } from 'react';
import { motion } from 'framer-motion';
import { Logs, PawPrint, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IAppointment } from './CardAppointment';
import { IAuthUser } from '@/contexts/AuthContext';

type HeroSectionVirtualOfficeProps = {
  appointment: IAppointment[];
  user: IAuthUser | null;
  logout: () => void;
};

const HeroSectionVirtualOffice: React.FC<HeroSectionVirtualOfficeProps> = ({
  appointment,
  user,
  logout,
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <header className="bg-gray-800 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          className="flex items-center space-x-2 px-4 py-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <PawPrint className="text-green-500" size={60} />
          <span className="text-4xl font-bold text-white">Oficina Virtual</span>
        </motion.div>

        <div className="sm:hidden flex items-center px-4 py-8">
          <Logs
            color="#22c55e"
            className="cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>

        {showMenu && (
          <motion.div
            className="sm:hidden absolute z-50 top-full right-0 flex flex-col items-center gap-y-5 bg-green-50 px-4 py-8 rounded-bl-xl"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <UserRound size={60} className="text-green-500" />
            <div className="flex flex-col items-center">
              <p className="uppercase font-bold text-green-600">
                {user?.nombre}
              </p>
              <p className="text-sm text-center">
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
        )}

        <motion.div
          className="hidden sm:flex items-center gap-x-5 bg-green-50 px-4 py-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <UserRound size={60} className="text-green-500" />
          <div className="flex flex-col">
            <p className="uppercase font-bold text-green-600">{user?.nombre}</p>
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
  );
};

export default HeroSectionVirtualOffice;
