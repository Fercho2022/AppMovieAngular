import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../interfaces/apiResponse';
import { Movie } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // key dbe3f5b9

  private API_URL:string= 'https://www.omdbapi.com/?apikey=dbe3f5b9';

  constructor( private http: HttpClient) { }

  getMovies(searchTerm:string): Observable<Movie[]>{
    // utilizando template string para concatenar se puede hacer el return de la siguiente manera:
    // return this.http.get(`${this.API_URL}&s=${searchTerm}`)
    return this.http.get<ApiResponse>(this.API_URL + '&s=' + searchTerm).pipe(map(response=>{
      return response.Search;
    }))
  }
}
