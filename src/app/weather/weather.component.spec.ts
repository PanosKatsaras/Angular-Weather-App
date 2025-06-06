import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { WeatherService } from '../weather.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let mockWeatherService: jasmine.SpyObj<WeatherService>;

  // Sample mock weather data
  const mockWeatherData = {
    sys: { country: 'GR' },
    main: {
      temp: 25,
      feels_like: 27,
      temp_max: 28,
      temp_min: 20,
      humidity: 65,
      pressure: 1012
    },
    wind: { speed: 5 },
    weather: [{ main: 'Clear', icon: '01d' }]
  };

  beforeEach(async () => {
    // Create a spy object for WeatherService
    mockWeatherService = jasmine.createSpyObj('WeatherService', ['getWeatherData']);

    await TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [FormsModule], // Needed if you use [(ngModel)]
      providers: [{ provide: WeatherService, useValue: mockWeatherService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
  });

  // ✅ Test 1: Component should be created
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Test 2: Should call getWeatherData on init and populate fields
  it('should fetch weather data on ngOnInit', () => {
    mockWeatherService.getWeatherData.and.returnValue(of(mockWeatherData));
    fixture.detectChanges(); // triggers ngOnInit

    expect(mockWeatherService.getWeatherData).toHaveBeenCalledWith('Athens');
    expect(component.temperature).toBe(25);
    expect(component.country).toBe('GR');
    expect(component.icon).toBe('https://openweathermap.org/img/wn/01d@2x.png');
  });

  // ✅ Test 3: Should fetch weather data when user submits a new city
  it('should fetch new weather data on onSubmit()', () => {
    mockWeatherService.getWeatherData.and.returnValue(of(mockWeatherData));
    component.cityName = 'Thessaloniki';
    component.onSubmit();

    expect(mockWeatherService.getWeatherData).toHaveBeenCalledWith('Thessaloniki');
    expect(component.country).toBe('GR');
  });

  // ✅ Test 4: Should log error if service fails
  it('should handle error if weather API fails', () => {
    spyOn(console, 'log');
    mockWeatherService.getWeatherData.and.returnValue(throwError(() => new Error('API failure')));

    fixture.detectChanges(); // triggers ngOnInit

    expect(console.log).toHaveBeenCalledWith('API failure');
  });
});
