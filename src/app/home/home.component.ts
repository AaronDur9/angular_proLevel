import { Component, OnInit, Input } from '@angular/core';
import { RequestOptions, Jsonp, Response, URLSearchParams, Http } from '@angular/http';
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { City } from '../models/city';
import { Weather } from '../models/weather';
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


 private _searchBoxFlow: Subject<string> = new Subject();

//De momento muestro una lista de strings como ciudades

  city: City;
  fqcnList: string[] = [];
  _subscriptionSearchBox: Subscription; 

  constructor(private _http: Http,
                private _router: Router,
                private _citiesService: CitiesService) {
        this._searchBoxFlow
            .debounceTime(500)
            .distinctUntilChanged()
            .switchMap((cityName: string) => this._citiesService.searchPetition(cityName))
            .subscribe((results: string[]) => {
                if(results !== null && results.length > 0)
                    this.fqcnList = results;
            });
    }


      
    searchCities(evento: KeyboardEvent) {
        // hacemos emisión de eventos
        

        // Para indicar el tipo de target en medio de una instrucción
        const cityName = (evento.target as HTMLInputElement).value;
        this._searchBoxFlow.next(cityName);
    }




    


    navToCity(fqcn: string): void {
        this._router.navigateByUrl(`city/${fqcn}`);
    }
        

  ngOnDestroy(): void {
               // Nos desuscribimos del observable
            this._searchBoxFlow.unsubscribe();  
        }



}
