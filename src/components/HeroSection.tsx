import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-green-400 text-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-6">
            Bienvenido a Salud Animalia
          </h1>
          <p className="text-xl mb-8">
            Cuidamos de tus mascotas como si fueran nuestras
          </p>
          <Link to="/virtual-office">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-500 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-green-100 transition duration-300"
            >
              Agenda una cita
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
