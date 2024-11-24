import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <PawPrint className="text-green-500 text-3xl" />
          <span className="text-2xl font-bold text-white">Salud Animalia</span>
        </motion.div>

        {!isAuthenticated && (
          <motion.div
            className="flex space-x-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          >
            <Link to={'/auth/login'}>
              <Button className="hidden md:flex bg-green-100 text-green-500 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-green-100/80 transition duration-300">
                Iniciar Sesión
              </Button>
            </Link>
            <Link to={'/auth/register'}>
              <Button className="bg-white text-green-500 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-green-100 transition duration-300">
                Registrarse
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
