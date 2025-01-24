import { FormControl, ValidationErrors, Validators } from "@angular/forms";

export class FormValidators {

    static notOnlyWhiteSpace(control: FormControl): ValidationErrors{


        if((control.value !=null)&&(control.value.trim().length ===0)){
            return {'notOnlyWhiteSpace':true}
        }else{
            
        return null;
        }
    }
}
