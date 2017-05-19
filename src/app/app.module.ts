import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { NguiMapModule} from '@ngui/map';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './home/home.component';
import { CityComponent } from './city/city.component';
import { WeatherComponent } from './weather/weather.component';
import { CitiesResolverService } from './services/cities-resolver.service';
import { CitiesService } from './services/cities.service';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBUIehCmCTVhegd5XBwzNQ2FK0AUWm-dl4'})

  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    CityComponent,
    WeatherComponent
  ],
  
  providers: [
    CitiesResolverService,
    CitiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
