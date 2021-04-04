import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ContentComponent } from './components/content/content.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// STYLES
import {MatCardModule} from '@angular/material/card';
import { AuthControlService } from '../app/services/auth-control.service';
import { NavComponent } from './nav/nav.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { CompletedComponent } from './components/completed/completed.component';
import { CheckedComponent } from './components/checked/checked.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoComponent } from './components/info/info.component';
import { DestinationCardComponent } from './components/destination/destination-card/destination-card.component';
import { AddDestinationComponent } from './components/destination/add-destination/add-destination.component';
import { AddDestinationNavComponent } from './components/destination/add-destination-nav/add-destination-nav.component';
import { DestinationDetailsComponent } from './components/destination/destination-details/destination-details.component';
import { EditDestinationComponent } from './components/destination/edit-destination/edit-destination.component';
import { ViewDestinationComponent } from './components/destination/view-destination/view-destination.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    SideNavComponent,
    ContentComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    FavouritesComponent,
    CompletedComponent,
    CheckedComponent,
    ProfileComponent,
    SearchComponent,
    InfoComponent,
    DestinationCardComponent,
    AddDestinationComponent,
    AddDestinationNavComponent,
    DestinationDetailsComponent,
    EditDestinationComponent,
    ViewDestinationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
