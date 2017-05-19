import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { CityComponent } from './city/city.component';
import { CitiesResolverService } from './services/cities-resolver.service';




const routes: Routes = [
    {
        path: "home",
        component: HomeComponent,
    },
    {
        path: "city/:fqcn",
        component: CityComponent,
        resolve: {
            city: CitiesResolverService
        }
    },
    {
        path: "**",
        redirectTo: "/home"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
