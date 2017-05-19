import { Component, OnInit, Input } from '@angular/core';
import { City } from '../models/city';
import { CitiesService } from '../services/cities.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  cities: Array<string> = [];
  
  
  constructor(private _citiesService: CitiesService,
              private _router: Router) { }



  ngOnInit() {
    this.cities = this._citiesService.getFavCities();
    this._citiesService.getEmitter().subscribe((city) => {
      
      let index:number;
      index = this.cities.findIndex((c) => { return c === city});
      //Si no existía lo mete
      if(index == -1)
        this.cities.push(city);
      else {
        this.cities.splice(index,1);
      }
    
  
});
  }

  navToHome(): void {
    this._router.navigateByUrl('/home');
  }


  showCity(city: string) {
    this._router.navigateByUrl(`city/${city}`);
  }

}
