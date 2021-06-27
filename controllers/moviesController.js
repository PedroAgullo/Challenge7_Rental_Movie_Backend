const { Movie } = require('../models'); //No necesita indicarle el archivo, solo la carpeta, ya que lo desestructura desde index.js
const axios = require("axios");

class Pelicula{

    // Métodos controladores
    async findTopRated(){
        let res = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&page=1');
        console.log(res.data);
        return res.data;
    }

    //Find popular movies
    async findPopular(){
        
        let res = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&page=1');
        console.log(res.data);
        return res.data;
    }

    //Search movie by ID
    async searchById(id){
        let res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US`)
        return res.data;
    }

    //Search videos of a movie by ID
    async searchById(id){
        let res = await axios.get(`https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US`)
        return res.data;
    }

    //Trae una lista de películas recomendadas para uan película sobre su ID
    async searchRecommendations(id){
        let res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&page=1`)
        return res.data;
    }

    // Method for "Getting movie by title"
    async searchByTitle(title){
        let res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&query=${title}&page=1&include_adult=false`)
        return res.data;
    }

    async searchByGenre(movieGenre){
        
        let listId = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US')
        
        let genreId = listId.data.genres;
        
        
        for (let i in genreId){
            if (movieGenre === genreId[i].name) {
                let res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=210d6a5dd3f16419ce349c9f1b200d6d&with_genres=${genreId[i].id}`);
                return res.data;
            }
        }
        
    }

    async searchByAct(act){
        let res = await axios.get(`http://api.themoviedb.org/3/search/person?query=${act}&api_key=210d6a5dd3f16419ce349c9f1b200d6d`);
        return res.data;
    }


    //FUNCIONES PARA ACCEDER A LA BASE DE DATOS DE WORKBENCH

    //Añade una nueva película a la base de datos.
    async newMovie(body){
        return Movie.create(body);
    }

    async movieId(movieId){
        return Movie.findOne({
            where: {movieId}
        })
    }

    //Modifica el número de reproducciones de la película.
    async playMovie(attributes){ 

        let search = this.movieId(attributes.movieId);

        if (search != null){   
            let numPlay = search.numPlay + 1;
                 
        await  Movie.update(
             //Datos que cambiamos
             {numPlay: numPlay},
             //Donde..
             {where: {movieId: attributes.movieId}}
         ) 
        }else {
            attributes.numBuy=0;
            attributes.numRent=0;
            this.newMovie(attributes);
        }

        let resultado = this.movieId(attributes.movieId); 
        return resultado;
     }

    //Modifica el número de alquileres de la película.
        async rentMovie(attributes){

        let numRent = attributes.numRent + 1;


        if (search != null){        
            let numRent = search.numRent + 1;
            await  Movie.update(
                 //Datos que cambiamos
                 {numRent: numRent},
                 //Donde..
                {where: {movieId: attributes.movieId}}
            ) 
        }else {
            attributes.numBuy=0;
            attributes.numPlay=0;
            this.newMovie(attributes);
        }

         let resultado = this.movieId(attributes.movieId); 
         return resultado;
     }

    //Modifica el número de compras de la película.
     async buyMovie(attributes){     

        let search = await this.movieId(attributes.movieId);
       console.log("Busqueda de la pelicula: ",search);
        if (search != null){        
            let numBuy = search.numBuy + 1;

            await  Movie.update(
                //Datos que cambiamos
                {numBuy: numBuy},
                //Donde..
                {where: {movieId: attributes.movieId}}
            ) 
        
        }else {
            attributes.numPlay=0;
            attributes.numRent=0;
            this.newMovie(attributes);
        }

         let resultado = this.movieId(attributes.movieId); 
         return resultado;
     }

}









let moviesController = new Pelicula();
module.exports = moviesController;