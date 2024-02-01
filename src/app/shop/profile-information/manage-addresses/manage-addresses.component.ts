import { Component } from '@angular/core';
import { ShophttpService } from '../../services/shophttp/shophttp.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
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

 
  constructor(private toastr:ToastrService,private shophttp: ShophttpService) {

  }


  ngOnInit() {
    this.getUserAddresses();
  }

  getUserAddresses() {
    this.shophttp.getAddresses().subscribe(data => {
      this.savedAddress = data;
    }, error => {
      // this.message = error;
      // this.type = true;
      this.toastr.error(error,"Error",{
        timeOut:3000
      })
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
        // this.message = `New address is added successfully!`;
        // this.type = true;
        this.toastr.success("New address is added successfully!","Error",{
          timeOut:3000
        })
        this.getUserAddresses();
        this.isFormEnabled = false;
      }, error => {
        this.toastr.error(error,"Error",{
          timeOut:3000
        })
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
  showSweetAlert(): Promise<boolean> {
    return Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this address.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  async deleteOnAddress(id: any) {
    const isConfirmed = await this.showSweetAlert();
    if (isConfirmed)
      this.shophttp.deleteAddressRequest(id).subscribe(data => {
        this.getUserAddresses();
        // this.message = `Address has been deleted successfully!`;
        // this.type = true;
        this.toastr.success("","Address has been deleted successfully!",{
          timeOut:3000
        })
        Swal.fire("Deleted successfully!","success");
      }, error => {
        this.toastr.error(error,"Error",{
          timeOut:3000
        })
        Swal.fire(error,"error");
      })
  }

  UpdateAddressSubmit() {
    if (this.isUpdateFormEnabled && this.isFormEnabled == false && this.address) {
      this.shophttp.udpateAddressRequest(this.address, this.updateObjectId).subscribe(data => {
        // this.message = 'Address Updated Successfully!';
        // this.type = true;
        this.toastr.success("","Address Updated Successfully!",{
          timeOut:3000
        })
        this.isUpdateFormEnabled = false;
        this.getUserAddresses();
      },
        error => {
          this.toastr.error(error,"Error",{
            timeOut:3000
          })
        })
    }
  }
}
