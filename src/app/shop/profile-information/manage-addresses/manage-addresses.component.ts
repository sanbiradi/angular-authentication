import { Component } from '@angular/core';
import { ShophttpService } from '../../services/shophttp/shophttp.service';

@Component({
  selector: 'app-manage-addresses',
  templateUrl: './manage-addresses.component.html',
  styleUrls: ['./manage-addresses.component.scss']
})
export class ManageAddressesComponent {


  savedAddress: any;
  message: any = false;
  type = false;


  updateObjectId: any;

  address = {
    street: '',
    addressLine2: '',
    city: '',
    state: '',
    pin: ''
  }


  updateAddress = {
    street: '',
    addressLine2: '',
    city: '',
    state: '',
    pin: ''
  }

  isUpdateFormEnabled = false;

  isFormEnabled = false;
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


  constructor(private shophttp: ShophttpService) {

  }


  ngOnInit() {
    this.getUserAddresses();
  }

  getUserAddresses() {
    this.shophttp.getAddresses().subscribe(data => {
      this.savedAddress = data;
    }, error => {
      this.message = error;
      this.type = true;
    })
  }

  addNewAddressForm() {
    this.isFormEnabled = true;
    this.address = {
      street: '',
      addressLine2: '',
      city: '',
      state: '',
      pin: ''
    }


  }

  closeNewAddressForm() {
    this.isFormEnabled = false;
    this.isUpdateFormEnabled = false
  }

  addNewAddressSubmit() {
    if (this.address.addressLine2 && this.address.city && this.address.pin && this.address.state && this.address.street) {
      this.shophttp.addNewAddress(this.address).subscribe(data => {
        this.message = `New address is added successfully!`;
        this.type = true;
        this.getUserAddresses();
        this.isFormEnabled = false;
      }, error => {
        this.message = error;
        this.type = false;
      })
    }
  }

  editOnAddress(addressObject: any, id: any) {
    this.isUpdateFormEnabled = true;
    this.isFormEnabled = false;
    this.address = addressObject;
    this.updateObjectId = id;
  }

  closeUpdateAddressForm() {
    this.isUpdateFormEnabled = false;
    this.updateObjectId = '';
    this.address = {
      street: '',
      addressLine2: '',
      city: '',
      state: '',
      pin: ''
    }
  }

  deleteOnAddress(id: any) {
    if (confirm("Do you want to delete this address?"))
      this.shophttp.deleteAddressRequest(id).subscribe(data => {
        this.getUserAddresses();
        this.message = `Address has been deleted successfully!`;
        this.type = true;
      }, error => {
        this.message = error;
        this.type = true;
      })
  }

  UpdateAddressSubmit() {
    if (this.isUpdateFormEnabled && this.isFormEnabled == false && this.address) {
      this.shophttp.udpateAddressRequest(this.address, this.updateObjectId).subscribe(data => {
        this.message = 'Address Updated Successfully!';
        this.type = true;
        this.isUpdateFormEnabled = false;
        this.getUserAddresses();
      },
        error => {
          this.message = error;
          this.type = false;
        })
    }
  }
}
