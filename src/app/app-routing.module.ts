import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './home/profile/profile.component';
import { AuthGuard } from './auth/auth-guard.service';
import { VisualizerComponent } from './auth/visualizer/visualizer.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'visualizer', component: VisualizerComponent,},
  { path: 'my-profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
