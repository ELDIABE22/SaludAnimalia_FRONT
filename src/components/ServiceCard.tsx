import { Link } from 'react-router-dom';
import { Card, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  href: string;
  icon: React.ElementType;
  title: string;
  onClick?: () => void;
};

const ServiceCard: React.FC<Props> = ({ href, icon: Icon, title, onClick }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }}
    whileHover={{ scale: 1.05 }}
  >
    <Link to={href} className="block lg:flex justify-center" onClick={onClick}>
      <Card className="h-[250px] lg:w-[450px] rounded-none border-none shadow-lg bg-green-50 hover:bg-green-200 cursor-pointer">
        <CardHeader className="justify-center items-center h-full">
          <Icon className="text-green-500" size={100} />
          <p className="text-2xl uppercase">{title}</p>
        </CardHeader>
      </Card>
    </Link>
  </motion.div>
);

export default ServiceCard;
