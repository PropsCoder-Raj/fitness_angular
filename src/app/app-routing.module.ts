import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MyPaymentHistoryComponent } from './pages/my-payment-history/my-payment-history.component';
import { MySessionComponent } from './pages/my-session/my-session.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent , canActivate: [AuthGuard]},
  { path: "my-session", component: MySessionComponent, canActivate: [AuthGuard] },
  { path: "my-payment-history", component: MyPaymentHistoryComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
