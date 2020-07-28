import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class UserFormService {
  getForm(model?: User): FormGroup {
    const form = new FormGroup({});
    this.build(form);
    if (model) {
      form.patchValue(model);
    }
    return form;
  }

  protected build(form: FormGroup) {
    form.setControl('uid', new FormControl('', Validators.required));
    form.setControl('name', new FormControl('', Validators.required));
    form.setControl(
      'orgUnit',
      new FormGroup({
        uid: new FormControl(undefined, Validators.required),
      })
    );
  }
}
