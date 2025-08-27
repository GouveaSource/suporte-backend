import { PrismaClient } from '@prisma/client';

// Cria uma nova instância do PrismaClient
const prismaClient = new PrismaClient();

// Exporta a instância para que possa ser usada em outros arquivos
export default prismaClient;