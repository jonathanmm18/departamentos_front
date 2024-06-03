const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

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