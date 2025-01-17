import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        className="w-12 h-12 bg-green-500 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default Loading;
