import app from './app';
import { initializeDatabase } from './db';

const PORT = process.env.PORT || 3001;

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} 🦄`);
  });
});
