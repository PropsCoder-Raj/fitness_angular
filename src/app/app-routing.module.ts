import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyPaymentHistoryComponent } from './pages/my-payment-history/my-payment-history.component';
import { MySessionComponent } from './pages/my-session/my-session.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  // { path: "home", component: HomeComponent },
  // { path: "my-session", component: MySessionComponent },
  // { path: "my-payment-history", component: MyPaymentHistoryComponent },
  // { path: "profile", component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
