import { z } from 'zod';

// /api/makes/years
export const MakeYearsQuerySchema = z.object({
  make: z.string().trim().min(1),
});

// /api/makes/search
export const MakeSearchQuerySchema = z.object({
  make: z.string().trim().min(1),
});

// /api/models
export const ModelsQuerySchema = z.object({
  make: z.string().trim().min(1),
  year: z.coerce.number().int().positive(),
});

// /api/submodels
export const SubmodelsQuerySchema = z.object({
  make: z.string().trim().min(1),
  year: z.coerce.number().int().positive(),
  model: z.string().trim().min(1),
});

// /api/vehicles/[id]
export const VehicleByIdQuerySchema = z.object({
  id: z.coerce.number().int().positive(),
});

// /api/vehicles/search
export const VehicleSearchQuerySchema = z.object({
  query: z.string().trim().min(1),
});
