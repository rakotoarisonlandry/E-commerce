import { ERROR_MESSAGES } from '@/error-handling/error-handling-utils';
import validator from 'validator';
import { z } from 'zod';

export const shippingInfoSchema = z.object({
  continentId: z.string().min(1, ERROR_MESSAGES.required('Continent')),
  regionId: z.string().min(1, ERROR_MESSAGES.required('Region')),
  cityId: z.string().min(1, ERROR_MESSAGES.required('City')),
  address: z.string().trim().min(1, ERROR_MESSAGES.required('Address')),
  phone: z
    .string(),

  email: z.string().email(ERROR_MESSAGES.invalid('E-mail')),
});

export type ShippingInfo = z.infer<typeof shippingInfoSchema>;
