const mongoose = require('mongoose');

// Proje şeması
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: String, required: true },
  image: { type: String }, // İstenirse projeye görsel eklenebilir
});

// Model oluşturuluyor
const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
