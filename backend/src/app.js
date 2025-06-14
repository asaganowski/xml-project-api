import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import xmlRoutes from './routes/xmlRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/xml', xmlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;