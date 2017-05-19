export class Weather {

    public constructor(
        public humidity: number,
        public pressure: number,
        public temp: number,
        public temp_max: number,
        public temp_min: number,
        public description: string,
        public icon: string
    ) {}



     static fromJson(json: any): Weather {
        return new Weather(
            json.main.humidity,
            json.main.pressure,
            json.main.temp,
            json.main.temp_max,
            json.main.temp_min,
            json.weather[0].description,
            "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png"
        );
    }



}