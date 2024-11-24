import { motion } from 'framer-motion';
import { Stethoscope, Syringe, Hospital, Bone } from 'lucide-react';

const services = [
  {
    icon: Stethoscope,
    title: 'Consulta General',
    description: 'Exámenes de rutina y diagnósticos',
  },
  {
    icon: Syringe,
    title: 'Vacunación',
    description: 'Protección contra enfermedades comunes',
  },
  {
    icon: Bone,
    title: 'Odontología',
    description: 'Cuidado dental para mascotas',
  },
  {
    icon: Hospital,
    title: 'Cirugía',
    description: 'Procedimientos quirúrgicos avanzados',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const ServicesSection = () => {
  return (
    <section className="py-20 bg-white">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Nuestros Servicios
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-green-50 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300"
              variants={cardVariants}
            >
              <service.icon className="text-green-500 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
