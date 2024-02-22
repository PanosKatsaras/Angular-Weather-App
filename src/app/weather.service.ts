import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
// Main service that is using the Angular HttpClient module for making HTTP requests to the API.
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  constructor(private http: HttpClient) { }

  getWeatherData(cityName:string) {
    return this.http.get("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+environment.API_KEY+"&units=metric")
  }
}

