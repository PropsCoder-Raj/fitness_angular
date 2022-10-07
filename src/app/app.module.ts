import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuardModule } from "@angular/fire/auth-guard"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MySessionComponent } from './pages/my-session/my-session.component';
import { MyPaymentHistoryComponent } from './pages/my-payment-history/my-payment-history.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './pages/login/login.component';
import { SpinnersAngularModule } from 'spinners-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UndeConstructionComponent } from './pages/unde-construction/unde-construction.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MySessionComponent,
    MyPaymentHistoryComponent,
    ProfileComponent,
    LoginComponent,
    UndeConstructionComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    SpinnersAngularModule,
    AuthGuardModule,
    ToastrModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
