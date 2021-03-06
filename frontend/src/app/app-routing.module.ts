import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckedComponent } from './components/checked/checked.component';
import { CompletedComponent } from './components/completed/completed.component';
import { ContentComponent } from './components/content/content.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
{ path: '', redirectTo:'/login', pathMatch:'full'},
{
  path: 'login', component: LoginComponent,
},
{
  path: 'register', component: RegisterComponent,
},
{
  path: 'main', component: MainComponent, children: [
    { path: '', redirectTo: "home", pathMatch: 'full' },
    { path: 'home', component: ContentComponent},
    { path: 'favourites', component: FavouritesComponent },
    { path: 'completed', component: CompletedComponent },
    { path: 'checked', component: CheckedComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'info', component: InfoComponent }
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, RegisterComponent, MainComponent];
