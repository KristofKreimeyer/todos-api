import index from './index.js';
const PORT = process.env.PORT || 3000;

index.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
