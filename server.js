import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import {  fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', createProxyMiddleware({
    target: 'https://app-departamentos-fdba2e12deac.herokuapp.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '',
    },
}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
}
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);