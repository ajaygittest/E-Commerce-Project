import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormServiceService } from '../../services/form-service.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  
  checkoutFormGroup!: FormGroup;

  totalPrice:number=0;
  totalQuantity:number=0;

  creditCardYears: number[]=[];
  creditCardMonths:number[]=[];

  countries:Country[]=[];

  shippingAddressState:State[]=[];

  billingAddressState:State[]=[];

  constructor(private formBuilder:FormBuilder, private formService: FormServiceService){}
  
  ngOnInit(): void {
    this.checkoutFormGroup=this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      }),
      shippingAddress:this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      billingAddress:this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      creditCard:this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:['']
      }),
    });

    const startMonth:number =new Date().getMonth()+1;

    this.formService.getCreditCardMonths(startMonth).subscribe((data:any)=>{
      this.creditCardMonths=data;
    });

    this.formService.getCreditCardYears().subscribe((data:any)=>{
      console.log(data)
      this.creditCardYears=data;
    })

    this.formService.getCountries().subscribe(
      data =>{
        this.countries=data;
      }
    );
  }


  onSubmit() {
    
    }

    copyShippingAddressToBillingAddress(event:any) {
     if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      this.billingAddressState=this.shippingAddressState
    }else{
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressState=[];
     }
      }

      handleMonthsAndYears() {
        const creditCardFormGroup= this.checkoutFormGroup.get('creditCard');
        const currentYear:number=new Date().getFullYear();
        const selectedYear:number=Number(creditCardFormGroup?.value.expirationYear);

        let startMonth:number;

        if(currentYear === selectedYear){
          startMonth= new Date().getMonth()+1;

        }else{
          startMonth=1;
        }
        this.formService.getCreditCardMonths(startMonth).subscribe((data:any)=>{
          this.creditCardMonths=data;
        })

        }

        getStates(formGroupName: string) {
          const formGroup=this.checkoutFormGroup.get(formGroupName);
          const countryCode=formGroup!.value.country.code;
          const countryName=formGroup!.value.country.name;

          this.formService.getStates(countryCode).subscribe(
            (data:any) =>{
              console.log(data)
                if(formGroupName ==='shippingAddress'){
                  this.shippingAddressState=data;
              }else{
                this.billingAddressState=data;
              }
            }
          );
          }
          

}
