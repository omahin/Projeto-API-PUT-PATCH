// const { response } = require("../app");
const movies = require("../models/filmes.json") // importando meu arquivo json dos filmes (que nesse projeto, são os meus dados)

// definir uma rota padrão
// const home = (request, response) => {
//     response.status(200).send(
//         {
//             "message": "Olá pessoa, seja bem vinda ao {reprograma}flix <3 <3 <3"
//         }
//     )
// };

const getAll = (request, response) => {
    response.status(200).send(movies);
};

const getById = (request, response) => {
    // id solicitado na requição (request)
    const requestedId = request.params.id;

    // find((elemento) => elemento + a lógica)
    const filteredId = movies.find(movie => movie.id == requestedId);

    //enviar reposta
    response.status(200).send(filteredId);
};

const getByTitle = (request, response) => {
    // acessando o título solicitado na request
    const requestedTitle = request.query.title.toLowerCase()

    // filtrar os títulos do json
    const filteredTitle = movies.find(movie => movie.title.toLowerCase().includes(requestedTitle))

    // adicionar um condição para retornar o título
    if (requestedTitle === "" || filteredTitle === undefined) {
        response.status(404).send({
            "message": "Por favor, insira um título válido."
        })
    } else {
        response.status(200).send(filteredTitle)
    }
};

// pesquisa por gênero
const getByGenre = (request, response) => {
    // acessar qual o gênero requisitado
    const requestedGenre = request.query.genre;
    // criar lista para armazenar dados do loop
    let movieList = [];

    // comparar todos os itens da lista que são daquele gênero
    movies.forEach(movie => {
        // separar elementos
        let genreList = movie.genre.split(",")

        for (genre of genreList) {
            if (genre.includes(requestedGenre)) {
                console.log(movie)
                movieList.push(movie)
            }
        };

    });

    // retornar a resposta
    response.status(200).send(movieList)
};

const createMovie = (req, res) => {
    let requestedTitle = req.body.title;
    let requestedYear = req.body.year;
    let requestRated = req.body.rated;
    let requestedReleased = req.body.released;
    let requestedRuntime = req.body.runtime;
    let requestedGenre = req.body.genre;
    let requestedDirector = req.body.director;
    let requestedWriter = req.body.writer;
    let requestedActors = req.body.actors;
    let requestedPlot = req.body.plot;
    let requestedLanguage = req.body.language;
    let requestedCountry = req.body.country;
    let requestedAwards = req.body.awards;

    let newMovie = {
        "id": Math.random().toString(32).substr(2, 6),
        "title": requestedTitle,
        "year": requestedYear,
        "rated": requestRated,
        "released": requestedReleased,
        "runtime": requestedRuntime,
        "genre": requestedGenre,
        "director": requestedDirector,
        "writer": requestedWriter,
        "actors": requestedActors,
        "plot": requestedPlot,
        "language": requestedLanguage,
        "country": requestedCountry,
        "awards": requestedAwards,
    };

    movies.push(newMovie);

    res.status(201).send({
        "mensagem": "New movie criado com sucesso!",
        newMovie,
    });
};  
 
const deleteMovie = (request, response) => {
     const requestedId = request.params.id;
     const filteredMovie = movies.find(movie => movie.id == requestedId);

     const index = movies.indexOf(filteredMovie);

        movies.splice(index,1);

     response.status(200).json({
         "mensagem": "Movie deletado com sucesso",
         movies,
     });
 };   

 const replaceMovie = (req, res) => {

    let requestedId = req.params.id;
    let movieFromBody = req.body;

    let filteredMovie = movies.find(movies => movies.id == requestedId);

    let updateMovie = {
        "id": movieFromBody.id,
        "title": movieFromBody.title,
        "year": movieFromBody.year,
        "rated": movieFromBody.rated,
        "released": movieFromBody.released,
        "runtime": movieFromBody.runtime,
        "genre": movieFromBody.genre,
        "director": movieFromBody.director,
        "writer": movieFromBody.writer,
        "actors": movieFromBody.actors,
        "plot": movieFromBody.plot,
        "language": movieFromBody.language,
        "country": movieFromBody.country,
        "awards": movieFromBody.awards,
    };

    const indice = movies.indexOf(filteredMovie);

    movies.splice(indice, 1, movies);

    res.status(200).send({
        "mensagem": "Movie substituido com sucesso",
        updateMovie,
    });
 };

const updateTitle = (req, res) => {
    let requestedId = req.params.id;
    let newTitle = req.body.titulo;

    let filteredMovie = movies.find(movies => movies.id == requestedId);

    filteredMovie.titulo = newTitle;

    res.status(200).send({
        "mensagem": "Movie atualizado com sucesso",
        filteredMovie
    });
};

const updateAll = (req, res) => {
    let requestedId = req.params.id;
    let filteredMovie = movies.find(movies => movies.id == requestedId);
    let updateMovie = req.body;
    let keyList = Object.keys(updateMovie)

    keyList.forEach((key) => {
        filteredMovie[key] = updateMovie[key];
    });

    res.status(200).send({
        "message": "Movie atualizado com sucesso!",
        filteredMovie
    });

};

module.exports = {
    home, 
    getAll, 
    getById, 
    getByTitle, 
    getByGenre, 
    createMovie, 
    deleteMovie, 
    replaceMovie,
    updateTitle,
    updateAll
}