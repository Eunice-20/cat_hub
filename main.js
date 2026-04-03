const express = require('express');
const path = require('path');
const app = express();
const PORT = 3030;

// Définir le répertoire des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route pour le fichier HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/About', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'About.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
  console.log(`http://localhost:3030 sur le serveur port ${PORT}`);
});
