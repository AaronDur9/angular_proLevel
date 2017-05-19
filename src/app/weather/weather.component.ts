import { Component, OnInit, Input } from '@angular/core';
import { Weather } from '../models/weather';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  @Input() weather: Weather;
  
  
  constructor() { }

  ngOnInit() {
    
  }

}
