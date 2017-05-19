import { Weather } from './weather';
export class City {

    public constructor(
        public id: number,
        public fqcn: string,
        public name: string,
        public code: string,
        public region: string,
        public population: number,
        public currency: string,
        public longitude: number,
        public latitude: number,
        public weather: Weather,
        public coordinates: string
    ) {}
    

     static fromJson(json: any): City {
        return new City(
            json.geobytescityid,
            json.geobytesfqcn,
            json.geobytescity,
            json.geobyteslocationcode,
            json.geobytesregion,
            json.geobytespopulation,
            json.geobytescurrency,
            json.geobyteslongitude,
            json.geobyteslatitude,
            null,
            `${json.geobyteslatitude}, ${json.geobyteslongitude}`
        );
    }



}