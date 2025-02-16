import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormServiceService } from '../../services/form-service.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { FormValidators } from '../../validators/form-validators';

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
        firstName:new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
        lastName:new FormControl('', [Validators.required, Validators.minLength(2),FormValidators.notOnlyWhiteSpace]),
        email:new FormControl('',
              [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
        )
      }),
      shippingAddress:this.formBuilder.group({
        street:new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
        city:new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
        state:new FormControl('',Validators.required),
        country:new FormControl('',Validators.required),
        zipCode:new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
      }),
      billingAddress:this.formBuilder.group({
        street:new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
        city:new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
        state:new FormControl('',Validators.required),
        country:new FormControl('',Validators.required),
        zipCode:new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
      }),
      creditCard:this.formBuilder.group({
        cardType:new FormControl('',Validators.required),
        nameOnCard:new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
        cardNumber:new FormControl('',[Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode:new FormControl('',[Validators.required, Validators.pattern('[0-9]{3}')]),
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

    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }
    
    }

    get firstName(){ return this.checkoutFormGroup.get('customer.firstName'); }
    get lastName(){ return this.checkoutFormGroup.get('customer.lastName'); }
    get email(){ return this.checkoutFormGroup.get('customer.email'); }

    get shippingAddressStreet(){ return this.checkoutFormGroup.get('shippingAddress.street'); }
    get shippingAddressCity(){ return this.checkoutFormGroup.get('shippingAddress.city'); }
    get shippingAddressStates(){ return this.checkoutFormGroup.get('shippingAddress.state'); }
    get shippingAddressCountry(){ return this.checkoutFormGroup.get('shippingAddress.country'); }
    get shippingAddressZipCode(){ return this.checkoutFormGroup.get('shippingAddress.zipCode'); }

    get billingAddressStreet(){ return this.checkoutFormGroup.get('billingAddress.street'); }
    get billingAddressCity(){ return this.checkoutFormGroup.get('billingAddress.city'); }
    get billingAddressStates(){ return this.checkoutFormGroup.get('billingAddress.state'); }
    get billingAddressCountry(){ return this.checkoutFormGroup.get('billingAddress.country'); }
    get billingAddressZipCode(){ return this.checkoutFormGroup.get('billingAddress.zipCode'); }


    get creditCardType(){ return this.checkoutFormGroup.get('creditCard.cardType'); }
    get creditCardNameonCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
    get creditCardNumber(){ return this.checkoutFormGroup.get('creditCard.cardNumber'); }
    get creditCardSecurityCode(){ return this.checkoutFormGroup.get('creditCard.securityCode'); }


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
