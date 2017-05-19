import { Injectable, Output, EventEmitter } from '@angular/core';
import { RequestOptions, Response, URLSearchParams, Http } from '@angular/http';
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatmap';
import { Observable } from "rxjs/Observable";
import { City } from '../models/city';
import { Weather } from '../models/weather';
import { Router } from '@angular/router';

@Injectable()
export class CitiesService {


   city: City;
   //favCities: City[] = [];

   //City name
  fqcn: string; 
  miStorage : Storage;
  @Output() favCity: EventEmitter<string> = new EventEmitter();
  //@Output()  filterByCategory: EventEmitter<Category> = new EventEmitter();

  constructor(private _http: Http
  ,private _router: Router) {

      this.miStorage = localStorage;
  }


  //Devuelve un observable de tipo ciudad al componente city
  cityDetailsSearch(fqcn: string): Observable<City> {
      const params: URLSearchParams = new URLSearchParams();
      params.set('fqcn', fqcn);
      
      let options: RequestOptions = new RequestOptions();
      options.search = params;
      

        return this._http.get('http://gd.geobytes.com/GetCityDetails',options)
          .map((res: Response): City => {
              return City.fromJson(res.json());
          //Concatmap concatena las llamadas map de obsrvables y te asegura que se ejecutan en orden
          //Además nos llega por parámetro lo que ha devuelto el map del anterior observable
        }).concatMap((city: City) => {
            //Al realizarse esta llamada nos aseguramos que la ciudad ya tiene el tiempo incluido
            return this.weatherSearch(city);
        });
  }




        
    weatherSearch(city: City): Observable<City> {
        const params: URLSearchParams = new URLSearchParams();
        //params.set('id', city.id.toString());
        params.set('lat', city.latitude.toString());
        params.set('lon', city.longitude.toString());
        //Id para que no rechace la conexión.
        params.set('appid' ,'fdd6a867780382130d26cd4b7b788e8e');
        let options: RequestOptions = new RequestOptions();
        options.search = params;
        
        return this._http.get('http://api.openweathermap.org/data/2.5/weather?units=metric',options)
        .map((res: Response): City => {
            city.weather = Weather.fromJson(res.json());
            return city;
        });
           
    }



    //Buscar la api de ciudades
    searchPetition(palabra: string): Observable<string[]> {
        const params: URLSearchParams = new URLSearchParams();
        //Estos parametros.set están incluyendo parámetros en la url
        //http://algo/?search=palabra&action=opensearch...
        params.set('q', palabra);
        let options: RequestOptions = new RequestOptions();
        options.search = params;

    
      return  this._http
                    .get("http://gd.geobytes.com/AutoCompleteCity", options)
                    .map((res: Response): Array<string> => {
                        //debugger;
                        //console.log(res.json()[0]);
                        //Si la búsqueda es insuficiente devuelve %s
                        if(res.json()[0] === "%s")
                            return null;
                        //console.log(res.json());
                        return res.json();
                    })
                    
        }



    //Método que pregunta si esta ciudad ya había sido marcada como favorita
    isFav(city: City): boolean {

        if(this.miStorage.getItem(city.id.toString())) {
            return true;
        }
        return false;

    }
 
        //Recibe el fqcn
    addFavCity(city: City):void {
        
        this.miStorage.setItem(city.id.toString(), city.fqcn);
        
        this.favCity.emit(city.fqcn);
        

    }

    removeFavCity(city: City): void {
        this.miStorage.removeItem(city.id.toString());
        this.favCity.emit(city.fqcn);
        

    }

    


    getEmitter(): EventEmitter<string> {
        return this.favCity;
    }




    getFavCities(): Array<string> {

        let favCities: string[] = [];

        for(let i =0; i < this.miStorage.length;i++) {
            favCities.push(this.miStorage.getItem(this.miStorage.key(i)));
        }

        return favCities;

        
    }



}
