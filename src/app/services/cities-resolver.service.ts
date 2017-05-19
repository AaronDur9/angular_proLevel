import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { CitiesService } from './cities.service';
import { City } from '../models/city';


@Injectable()
export class CitiesResolverService {

  constructor(private _citiesService: CitiesService ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<City> {
        return this._citiesService.cityDetailsSearch(route.params["fqcn"]);
    }


}





