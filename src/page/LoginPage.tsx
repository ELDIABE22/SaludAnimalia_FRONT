import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { formLoginSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

const LoginPage = () => {
  const { signin, formLoading, isAuthenticated, loading } = useAuth();

  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      contrasena: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated && !loading) {
      window.location.href = '/virtual-office';
    }
  }, [isAuthenticated, loading]);

  return (
    <section className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            >
              <img
                src="/logo.png"
                alt="Veterinary Clinic Logo"
                width={120}
                height={120}
                className="rounded-full bg-green-100 p-2"
              />
            </motion.div>
            <motion.h1
              className="text-2xl font-bold text-center text-gray-800 mb-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            >
              Bienvenido a tu Clínica Veterinaria
            </motion.h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(signin)}
                className="space-y-5 sm:space-x-0"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-primary">
                        Correo Electrónico
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="info@saludanimalia.com"
                          disabled={formLoading}
                          className="border-green-100 p-5 border-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contrasena"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-primary">
                        Contraseña
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="*********"
                          disabled={formLoading}
                          className="border-green-100 border-2 p-5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.6, ease: 'easeOut' },
                    },
                  }}
                  className="w-full"
                >
                  <Button
                    type="submit"
                    disabled={formLoading}
                    className="w-full bg-green-100 uppercase text-green-500 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-green-100/50 transition duration-300"
                  >
                    {formLoading && <Loader2 className="animate-spin mr-2" />}
                    {formLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                  </Button>
                </motion.div>
              </form>
            </Form>

            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            >
              <Link
                to="/auth/register"
                className="text-sm text-green-600 hover:underline"
              >
                ¿No tienes una cuenta? Regístrate aquí
              </Link>
            </motion.div>
          </div>
          <div className="bg-green-100 px-6 py-4 flex justify-between items-center">
            <span className="text-xs text-gray-600">
              © 2024 Tu Clínica Veterinaria
            </span>
            <Link to="#" className="text-xs text-green-600 hover:underline">
              Política de privacidad
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LoginPage;
