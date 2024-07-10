import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, debounceTime, distinct, filter, fromEvent, map, switchMap, tap } from 'rxjs';
import { Movie } from 'src/app/interfaces/movies';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit,OnDestroy {

  movies:Movie[]=[];
  @ViewChild ('movieSearchinput', { static:true}) movieSearchinput!: ElementRef;
  movieSuscription!: Subscription;

  constructor(private movieService:MovieService) { }

  ngOnInit(): void {
   this.movieSuscription = fromEvent<Event>(this.movieSearchinput.nativeElement, 'keyup').pipe(
        map((event:Event)=>{
          const searchTerm = (event.target as HTMLInputElement).value;
          return searchTerm
        }),

        debounceTime(500),
        distinct(),
        switchMap((searchTerm:string)=>this.movieService.getMovies(searchTerm)),
        tap((searchTerm:Movie[])=>console.log(searchTerm))
      ).subscribe((movies:Movie[])=>{
        this.movies= movies!== undefined ? movies: [];
      })

     }

     ngOnDestroy(): void {
      this.movieSuscription.unsubscribe();

     }









}
