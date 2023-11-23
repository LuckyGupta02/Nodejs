import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.json())
// CRUD operations

// Create a new movie
router.post('/', async (req, res) => {
  const Movie = req.app.get('Movie'); // Get the Movie model from the app

  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).send(movie);
  } catch (error) {
    console.log("server got error");
    res.status(400).send(error);
  }
});

// Read all movies
router.get('/', async (req, res) => {
  const Movie = req.app.get('Movie'); // Get the Movie model from the app
  try {
    const movies = await Movie.find();
    res.send(movies);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a specific movie by ID
router.get('/:id', async (req, res) => {
  const Movie = req.app.get('Movie'); // Get the Movie model from the app
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send({ error: 'Movie not found' });
    }
    res.send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a movie by ID
router.patch('/:id', async (req, res) => {
  const Movie = req.app.get('Movie'); // Get the Movie model from the app
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'img', 'summary'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!movie) {
      return res.status(404).send({ error: 'Movie not found' });
    }
    res.send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a movie by ID
router.delete('/:id', async (req, res) => {
  const Movie = req.app.get('Movie'); // Get the Movie model from the app
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).send({ error: 'Movie not found' });
    }
    res.send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
