import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import movieRoutes from './routes/movieRoutes.js';

const app = express();
const port = 8000;

app.use((req, res, next) => {
  // Perform any setup needed
  req.app = app; // Set up req.app
  next();
});

// Define the movie schema
const movieSchema = new mongoose.Schema({
  name: String,
  img: String,
  summary: String,
});

// Create a Movie model and register it
const Movie = mongoose.model('Movie', movieSchema);
app.set('Movie', Movie);

// Middleware to parse JSON
app.use(bodyParser.json());

// Use movie routes
app.use('/movies', movieRoutes);

// Connect to MongoDB and start the server
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://guptalucky8828:lucky123@cluster0.lmuoh4e.mongodb.net/crud?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
