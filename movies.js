const express = require('express');

const router = express.Router();

//Temporary data store
let movies = [
    {id:1, name:'Lagaan', genre:'Drama',actor:'Amir'},
    {id:2, name:'3 idiot', genre:'Drama',actor:'Amir'},
    {id:3, name:'Golmaal', genre:'Comedy', actor:'Ajay'}
];

// Get method for all the movies
router.get('/',(req, res) => {
    res.status(200).send(movies);
});


router.get('/:id',(req,res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie) return res.status(404).send('Movie not found');
    res.send(movie);
});

router.post('/', (req, res) => {

    const movie ={
        id: movies.length+1,
        name:req.body.name,
        genre:req.body.genre,
        actor:req.body.actor
    };

    const {error} = isValidRequest(req.body);
    if(error) {
        return res.send(error.details[0].message);
    } else{
        movies.push(movie);
        return res.send(movie);
    }
})

router.put('/', (req,res) => {
    const id = req.body.id;
    let movie = movies.find(m => m.id === parseInt(req.body.id));
    if(!movie) return res.status(400).send('Incorrect movie details');

    const {error} = isValidRequest(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    movie.name = req.body.name;
    movie.genre = req.body.genre;
    movie.actor = req.body.actor;

    res.status(200).send(movie);
})


router.delete('/:id', (req,res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie) return res.status(400).send('Incorrect movie details');
    const index = movies.indexOf(movie);
    movies.splice(index,1);
    res.status(200).send(movie);
});

function isValidRequest(message) {
    const schema = {
        id: Joi.string().min(1),
        name:Joi.string().min(3).required(),
        genre:Joi.string().required().min(3),
        actor:Joi.string()
    };
    return Joi.validate(message, schema);
};

module.exports = router;