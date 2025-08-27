import express from 'express';
import routes from './routes'; // Importa nossas rotas

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(routes); // Diz para o Express usar o nosso arquivo de rotas

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});