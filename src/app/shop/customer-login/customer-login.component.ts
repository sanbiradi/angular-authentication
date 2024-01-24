import { Component, Renderer2 } from '@angular/core';
import { ShophttpService } from '../services/shophttp/shophttp.service';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { StorageHandlerService } from '../services/storage-handler/storage-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss']
})
export class CustomerLoginComponent {
  email?: string;
  password?: string;

  message: any;
  type: any;
  captcha: any;
  siteKey: any;
  dom = document.querySelector('.grecaptcha-badge') as HTMLElement;
  constructor(private renderer: Renderer2,private storageService: StorageHandlerService, private shophttp: ShophttpService, private reCaptchaV3Service: ReCaptchaV3Service, private router: Router) {
    this.siteKey = '6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI';
  }

  ngAfterViewInit(): void {
    // Hide reCAPTCHA badge after the component has been loaded
    this.hideRecaptchaBadge();
  }
  private hideRecaptchaBadge(): void {
    const badge = document.querySelector('.grecaptcha-badge');
    if (badge) {
      this.renderer.setStyle(badge, 'display', 'block');
    }
  }

  onSubmit() {
    if (this.email && this.password) {
      this.reCaptchaV3Service.execute(this.siteKey, "login", (token) => {
        let payload = {
          email: this.email,
          password: this.password,
          captcha: token
        }
        this.shophttp.loginCustomerRequest(payload).subscribe(data => {
          this.message = "Account Has been login";
          this.type = true;
          this.dom.style.display = 'none';
          this.dom.style.visibility = 'hidden'
          this.storageService.set("userLogined", data.token);
          this.router.navigate(["shop"]);
        }, error => {
          this.message = error;
          this.type = false;
        })
      }, {
        useGlobalDomain: false
      })
    }
  }
}
