// src/schemas/formSchemas.ts
import { z } from 'zod';

// 1. Nombre
export const nameSchema = z
  .string()
  .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  .regex(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, { message: 'El nombre solo puede contener letras' });

// 2. Email
export const emailSchema = z
  .email({ message: 'Correo inválido' });

// 3. Contraseña
export const passwordSchema = z
  .string()
  .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  .regex(/[A-Za-z]/, { message: 'Debe contener al menos una letra' })
  .regex(/[0-9]/, { message: 'Debe contener al menos un número' });

// 4. Número Entero
export const integerSchema = z
  .string()
  .min(1, { message: 'El número es requerido' })
  .refine((val) => /^-?\d+$/.test(val), {
    message: 'Debe ser un número entero válido',
  })
  .transform((val) => Number.parseInt(val, 10));

// 5. Número con máximo 2 decimales
export const decimalSchema = z
  .string()
  .min(1, { message: 'El número decimal es requerido' })
  .refine((val) => /^-?\d+(\.\d{1,2})?$/.test(val), {
    message: 'Debe ser un número con máximo 2 decimales (usa punto "." para separar)',
  })
  .transform((val) => Number.parseFloat(val));

// 6. Fecha
export const dateSchema = z
  .string()
  .min(1, { message: 'La fecha es requerida' })
  .refine((val) => !Number.isNaN(Date.parse(val)), {
    message: 'Fecha inválida',
  })
  .transform((val) => new Date(val));