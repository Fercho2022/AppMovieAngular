import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movies';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.css']
})
export class CardMovieComponent implements OnInit {

  @Input ('movie') pelicula!:Movie;

  constructor() { }

  ngOnInit(): void {


  }

    getImagen(){

      return this.pelicula.Poster !=='N/A' ? this.pelicula.Poster : 'https://via.placeholder.com/600';
    }
}
