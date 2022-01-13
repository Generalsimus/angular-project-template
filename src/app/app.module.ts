import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListViewComponent } from './pages/users-list-view/users-list-view.component'; 
import { HttpClientModule } from "@angular/common/http";
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { HeaderComponent } from './widgets/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListViewComponent, 
    UserProfileComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
