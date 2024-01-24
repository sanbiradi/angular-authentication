import { Component, Renderer2 } from '@angular/core';
import customer from '../customer';
import { ShophttpService } from '../services/shophttp/shophttp.service';
import { ReCaptchaV3Service } from 'ngx-captcha';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss']
})
export class CustomerRegistrationComponent {

  customer: customer = {
    email: '',
    password: '',
    name: '',
    address: {
      street: '',
      addressLine2: '',
      city: '',
      state: '',
      pin: ''
    },
    captcha: ''
  }

  password: string | undefined;
  confirmPassword: string | undefined;
  errors = [];
  message: any;
  type: boolean | undefined;

  states = [
    {
      "code": "AN",
      "name": "Andaman and Nicobar Islands"
    },
    {
      "code": "AP",
      "name": "Andhra Pradesh"
    },
    {
      "code": "AR",
      "name": "Arunachal Pradesh"
    },
    {
      "code": "AS",
      "name": "Assam"
    },
    {
      "code": "BR",
      "name": "Bihar"
    },
    {
      "code": "CG",
      "name": "Chandigarh"
    },
    {
      "code": "CH",
      "name": "Chhattisgarh"
    },
    {
      "code": "DH",
      "name": "Dadra and Nagar Haveli"
    },
    {
      "code": "DD",
      "name": "Daman and Diu"
    },
    {
      "code": "DL",
      "name": "Delhi"
    },
    {
      "code": "GA",
      "name": "Goa"
    },
    {
      "code": "GJ",
      "name": "Gujarat"
    },
    {
      "code": "HR",
      "name": "Haryana"
    },
    {
      "code": "HP",
      "name": "Himachal Pradesh"
    },
    {
      "code": "JK",
      "name": "Jammu and Kashmir"
    },
    {
      "code": "JH",
      "name": "Jharkhand"
    },
    {
      "code": "KA",
      "name": "Karnataka"
    },
    {
      "code": "KL",
      "name": "Kerala"
    },
    {
      "code": "LD",
      "name": "Lakshadweep"
    },
    {
      "code": "MP",
      "name": "Madhya Pradesh"
    },
    {
      "code": "MH",
      "name": "Maharashtra"
    },
    {
      "code": "MN",
      "name": "Manipur"
    },
    {
      "code": "ML",
      "name": "Meghalaya"
    },
    {
      "code": "MZ",
      "name": "Mizoram"
    },
    {
      "code": "NL",
      "name": "Nagaland"
    },
    {
      "code": "OR",
      "name": "Odisha"
    },
    {
      "code": "PY",
      "name": "Puducherry"
    },
    {
      "code": "PB",
      "name": "Punjab"
    },
    {
      "code": "RJ",
      "name": "Rajasthan"
    },
    {
      "code": "SK",
      "name": "Sikkim"
    },
    {
      "code": "TN",
      "name": "Tamil Nadu"
    },
    {
      "code": "TS",
      "name": "Telangana"
    },
    {
      "code": "TR",
      "name": "Tripura"
    },
    {
      "code": "UP",
      "name": "Uttar Pradesh"
    },
    {
      "code": "UK",
      "name": "Uttarakhand"
    },
    {
      "code": "WB",
      "name": "West Bengal"
    }
  ];

  siteKey: any;
  constructor(private renderer: Renderer2,private shophttp: ShophttpService, private reCaptchaV3Service: ReCaptchaV3Service) {
    this.siteKey = '6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI';
  }

  private hideRecaptchaBadge(): void {
    const badge = document.querySelector('.grecaptcha-badge');
    if (badge) {
      this.renderer.setStyle(badge, 'display', 'none');
    }
  }

  
  onSubmit() {
    if (this.password === this.confirmPassword) {
  
      this.reCaptchaV3Service.execute(this.siteKey, 'login', (token) => {
        this.customer.captcha = token;
        this.customer.password = this.confirmPassword;
        this.shophttp.registerCustomerRequest(this.customer).subscribe(data => {
      
          this.hideRecaptchaBadge();
          this.message = true;
          this.message = "You account has been created! ";
          this.type = true;

        }, error => {
          this.message = error;
          this.type = false;
        })
      }, {
        useGlobalDomain: false
      })

    } else {
      this.message = "please confirm your password";
      this.type = false;
    }

  }
}
