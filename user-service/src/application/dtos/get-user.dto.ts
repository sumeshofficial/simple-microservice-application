import { z } from 'zod';

export const GetUserSchema = z.object({
	userId: z.string().min(1, 'User ID is required'),
});

export type GetUserDto = z.infer<typeof GetUserSchema>;