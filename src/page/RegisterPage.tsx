import { useAuth } from '@/hooks/useAuth';
import { formRegisterSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
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
import Loading from '@/components/Loading';
import { useEffect } from 'react';

const RegisterPage = () => {
  const { signup, formLoading, loading, isAuthenticated } = useAuth();

  const form = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      nombre: '',
      email: '',
      telefono: '',
      contrasena: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated && !loading) {
      window.location.href = '/virtual-office';
    }
  }, [isAuthenticated, loading]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
                    width={200}
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
                    onSubmit={form.handleSubmit(signup)}
                    className="space-y-5 sm:space-x-0"
                  >
                    <FormField
                      control={form.control}
                      name="nombre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-primary">
                            Nombre
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Juan Pérez"
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
                      name="telefono"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-primary">
                            Teléfono
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="(###)-###-###"
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
                        className="w-full bg-green-100 text-green-500 uppercase font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-green-100/50 transition duration-300"
                      >
                        {formLoading && (
                          <Loader2 className="animate-spin mr-2" />
                        )}
                        {formLoading ? 'Registrando...' : 'Registrarse'}
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
                    to="/auth/login"
                    className="text-sm text-green-600 hover:underline"
                  >
                    ¿Ya tienes cuenta? Ingresa aquí
                  </Link>
                </motion.div>
              </div>
              <div className="bg-green-100 px-6 py-4 flex justify-between items-center">
                <span className="text-xs text-gray-600">
                  © {new Date().getFullYear()} Tu Clínica Veterinaria
                </span>
                <Link to="#" className="text-xs text-green-600 hover:underline">
                  Política de privacidad
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}
    </>
  );
};

export default RegisterPage;
