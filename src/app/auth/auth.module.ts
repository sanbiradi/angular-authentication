import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UtilityModule } from '../usablemodules/utility.module';
import { ResetchangepasswordComponent } from './resetchangepassword/resetchangepassword.component';
import { GoogleLoginProvider,SocialLoginModule, SocialAuthServiceConfig,GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    VisualizerComponent,
    ForgotpasswordComponent,
    ResetchangepasswordComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxCaptchaModule,
    SocialLoginModule,
    UtilityModule,
    GoogleSigninButtonModule,
    RouterModule
  ],
  exports:[
    RegisterComponent,
    LoginComponent,

  ],
  providers:[
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '893913805202-rg7o6somctq21ike6dk1u0d696t64e0q.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
    ]
})
export class AuthModule { }
