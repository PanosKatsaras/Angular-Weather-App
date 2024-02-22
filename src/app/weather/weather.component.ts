import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

// Weather component.
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  // All the properties with a default city name.
  weatherData: any;
  cityName: string = "Athens";
  country: string = "";
  temperature: number = 0;
  feels_like: number = 0;
  humidity: number = 0;
  wind: number = 0;
  description: string = "";
  pressure: number = 0;
  icon: string = "";
  temp_max: number = 0;
  temp_min: number = 0;

  // Injecting service to constructor.
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    // Fetching the weather data from API for default city with the method of the service.
    this.weatherService.getWeatherData(this.cityName).subscribe({
      next: (response) => {
        this.weatherData = response;
        this.country = this.weatherData.sys.country;
        this.temperature = this.weatherData.main.temp;
        this.temp_max = this.weatherData.main.temp_max;
        this.temp_min = this.weatherData.main.temp_min;
        this.humidity = this.weatherData.main.humidity;
        this.wind = this.weatherData.wind.speed;
        this.description = this.weatherData.weather[0].main;
        this.feels_like = this.weatherData.main.feels_like;
        this.pressure = this.weatherData.main.pressure;
        this.icon = "https://openweathermap.org/img/wn/"+this.weatherData.weather[0].icon+"@2x.png";
      },
      error: (error) => {
        console.log(error.message)
      },
      complete() {
        console.info("API call completed!")
      }
    })
  }
  // On submit method that implements getWeatherData method with the searching city name.
  onSubmit(){
    this.weatherService.getWeatherData(this.cityName).subscribe({
      next: (response) => {
        this.weatherData = response;
        this.country = this.weatherData.sys.country;
        this.temperature = this.weatherData.main.temp;
        this.temp_max = this.weatherData.main.temp_max;
        this.temp_min = this.weatherData.main.temp_min;
        this.humidity = this.weatherData.main.humidity;
        this.wind = this.weatherData.wind.speed;
        this.description = this.weatherData.weather[0].main;
        this.feels_like = this.weatherData.main.feels_like;
        this.pressure = this.weatherData.main.pressure;
        this.icon = "https://openweathermap.org/img/wn/"+this.weatherData.weather[0].icon+"@2x.png";
      },
      error: (error) => {
        console.log(error.message)
      },
      complete() {
        console.info("API call completed!")
      }
    })
  }
}



