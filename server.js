import index from './index.js';
import mongoose from 'mongoose';
const PORT = process.env.PORT || 3000;

index.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB verbunden');
  })
  .catch((error) => {
    console.error('Fehler beim Verbinden mit MongoDB:', error);
  });
