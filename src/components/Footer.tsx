import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.footer
      className="bg-gray-800 text-white py-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
      >
        <div className="flex flex-wrap justify-between items-center">
          <motion.div
            className="w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold">Salud Animalia</h3>
            <p className="mt-2">Cuidando a tus mascotas desde 2024</p>
          </motion.div>
          <motion.div
            className="w-full md:w-1/3 text-center mb-6 md:mb-0"
            variants={itemVariants}
          >
            <h4 className="text-lg font-semibold mb-2">Contáctanos</h4>
            <p>+1 (555) 123-4567</p>
            <p>info@saludanimalia.com</p>
          </motion.div>
          <motion.div
            className="w-full md:w-1/3 text-center md:text-right"
            variants={itemVariants}
          >
            <h4 className="text-lg font-semibold mb-2">Síguenos</h4>
            <motion.div
              className="flex justify-center md:justify-end space-x-4"
              variants={containerVariants}
            >
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="hover:text-green-400 transition duration-300"
                  variants={itemVariants}
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="mt-8 text-center text-sm"
          variants={itemVariants}
        >
          <p>&copy; 2024 Salud Animalia. Todos los derechos reservados.</p>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
