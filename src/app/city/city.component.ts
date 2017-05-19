import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { City } from '../models/city';
import { ActivatedRoute } from '@angular/router';
import { CitiesService } from '../services/cities.service';



@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  

  @Output() favCity: EventEmitter<City> = new EventEmitter();

  pathBroken: string = "assets/Images/broken-heart.png";
  //Cambiar por other-heart.png
  pathNormal: string = "assets/Images/other-heart.png";
  fav: boolean;
  path: string;
  city: City;
  coordinates: string;

  constructor(private _activatedRoute: ActivatedRoute,
  private _citiesService: CitiesService) { }


  //AL principio de todo se cogerá de 
  ngOnInit() {
    //debugger;
    this._activatedRoute.data.forEach((data: { city: City}) => {
      this.city = data.city;
      console.log(this.city.coordinates);
      //this.coordinates = `${this.city.latitude}, ${this.city.longitude}`;
    
  });

    //Si devuelve true significa que ya ha dado fav
    this.fav = this._citiesService.isFav(this.city);
    if(this.fav)
      this.path = this.pathNormal;
      
    else
      this.path = this.pathBroken;

      //this.coordinates = `${this.city.latitude}, ${this.city.longitude}`;
      //this.coordinates = "39.9605435, -4.8331904";
    
  }


  


  // Método que se llama cuando una persona selecciona una ciudad como favorita

  //Cuando me pulsen en una ciudad se lo comunico a mi padre(home), y este se lo dice a sideBar que tiene una lista de ciudades.
  notifyFav(): void {
    
    this.fav = !this.fav;
    if(!this.fav) {
      //Crear función que elimina un favorito
      this.path = this.pathBroken;
      this._citiesService.removeFavCity(this.city);
      
    }
    else {
      
      this.path = this.pathNormal;
      this._citiesService.addFavCity(this.city);
      
      
    }

    

    

  }



}
