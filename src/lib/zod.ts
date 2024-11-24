import { z } from 'zod';

export const formLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Se requiere')
    .email('El correo no es válido'),
  contrasena: z
    .string()
    .trim()
    .min(1, 'Se requiere')
    .min(6, 'Mínimo 6 caracteres')
    .max(15, 'Máximo 15 caracteres'),
});

export const formRegisterSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(1, 'Se requiere')
    .min(3, 'Mínimo 3 caracteres')
    .max(15, 'Máximo 15 caracteres')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'Inválido'),
  email: z
    .string()
    .trim()
    .min(1, 'Se requiere')
    .email('El correo no es válido'),
  telefono: z
    .string()
    .trim()
    .min(1, 'Se requiere')
    .min(10, 'Mínimo 10 caracteres')
    .max(10, 'Máximo 10 caracteres')
    .regex(/^\d+$/, 'Solo se permiten números'),
  contrasena: z
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .max(15, 'Máximo 15 caracteres')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Debe contener al menos un carácter especial'
    ),
});

export const formRegisterPetSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(1, 'Se requiere')
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'Inválido'),
  especie: z
    .string()
    .trim()
    .min(1, 'Se requiere')
    .min(3, 'Mínimo 3 caracteres')
    .max(30, 'Máximo 30 caracteres')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'Inválido'),
  raza: z
    .string()
    .trim()
    .min(1, 'Se requiere')
    .min(3, 'Mínimo 3 caracteres')
    .max(30, 'Máximo 30 caracteres')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'Inválido'),
  edad: z
    .string()
    .trim()
    .min(1, 'Se requiere')
    .max(20, 'Máximo 20 caracteres')
    .regex(/^\d+$/, 'Inválido'),
});

export const formUpdateUserSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(1, 'Se requiere')
    .min(3, 'Mínimo 3 caracteres')
    .max(15, 'Máximo 15 caracteres')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, 'Inválido'),
  email: z
    .string()
    .trim()
    .min(1, 'Se requiere')
    .email('El correo no es válido'),
  telefono: z
    .string()
    .trim()
    .min(1, 'Se requiere')
    .min(10, 'Mínimo 10 caracteres')
    .max(10, 'Máximo 10 caracteres')
    .regex(/^\d+$/, 'Solo se permiten números'),
});

export const formAppointmentSchema = z.object({
  idMascota: z.string().trim().min(1, 'Se requiere'),
  fechaCita: z.string().trim().min(1, 'Se requiere'),
  horaCita: z.string().trim().min(1, 'Se requiere'),
  motivo: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || val.length >= 3, 'Mínimo 3 caracteres')
    .refine((val) => !val || val.length <= 255, 'Máximo 255 caracteres'),
});
