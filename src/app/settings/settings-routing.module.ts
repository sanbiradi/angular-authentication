import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';


const routes: Routes = [
    {
        path: 'settings', component: SettingsComponent, canActivate: [AuthGuard],
        children: [
            { path: 'change-password', component: ChangePasswordComponent },
            { path: 'email-verification', component: EmailVerificationComponent }
        ]
    },
];





@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class settingsRoutingModule { }
