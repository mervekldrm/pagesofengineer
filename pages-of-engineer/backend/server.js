const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projects'); // Proje API'sini dahil et

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Bağlantısı
mongoose.connect('mongodb+srv://merve:<plmQAZ1.>@cluster0.kbxlygm.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Error: ', err));

// API Yönlendirmeleri
app.use('/api/projects', projectRoutes); // Projeler API'si buradan çalışacak

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor...`);
});
