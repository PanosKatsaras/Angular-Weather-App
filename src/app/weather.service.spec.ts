import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure no outstanding requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather data for given city', () => {
    const mockResponse = {
      // mock your expected API response structure here
      sys: { country: 'GR' },
      main: { temp: 25, temp_max: 27, temp_min: 22, humidity: 50, feels_like: 26, pressure: 1012 },
      wind: { speed: 5 },
      weather: [{ main: 'Clear', icon: '01d' }]
    };

    service.getWeatherData('Athens').subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    // Expect one HTTP GET request with the correct URL (adjust URL if needed)
    const req = httpMock.expectOne((req) => req.url.includes('weather'));
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockResponse);
  });
});
