import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RateService } from 'src/app/services/rate.service';
import * as alertify from 'alertifyjs';
import { CesStoreApi } from 'src/app/enums/ces-store-api.enum';
@Component({
  selector: 'app-setup-rate',
  templateUrl: './setup-rate.component.html',
  styleUrls: ['./setup-rate.component.scss']
})
export class SetupRateComponent implements OnInit {
  get CurrencySymbol() { return this.RateForm.get('CurrencySymbol'); }
  get CurrencyName() { return this.RateForm.get('CurrencyName'); }
  get Value() { return this.RateForm.get('Value'); }
  Rate = {
    id: 0,
    currencySymbol: "P",
    organisationId: CesStoreApi.API,
    currencyName: "Pula",
    value: 10.96,
    dateModified: new Date,
    dateCreated: new Date
  };

  public RateForm = new FormGroup({
    Id: new FormControl(0),
    DateModified: new FormControl(Date),
    DateCreated: new FormControl(Date),
    CurrencySymbol: new FormControl('', Validators.required),
    OrganisationId: new FormControl('', Validators.required),
    CurrencyName: new FormControl('', Validators.required),
    Value: new FormControl(0, Validators.required)
  });

  PatchRateValues() {
    this.RateForm.controls['Id'].patchValue(this.Rate.id);
    this.RateForm.controls['DateModified'].patchValue(new Date);
    this.RateForm.controls['DateCreated'].patchValue(new Date);
    this.RateForm.controls['CurrencySymbol'].patchValue(this.Rate.currencySymbol);
    this.RateForm.controls['OrganisationId'].patchValue(CesStoreApi.API);
    this.RateForm.controls['CurrencyName'].patchValue(this.Rate.currencyName);
    this.RateForm.controls['Value'].patchValue(this.Rate.value);
  }

  constructor(private service: RateService) { }

  ngOnInit(): void {
    this.GetRateData();
  }
  GetRateData() {
    this.service.GetRates(CesStoreApi.API).subscribe((rates: any) => {
      if (rates.length > 0) {
        this.Rate = rates[0];
      }      
      this.PatchRateValues();
    });
  }

  SaveRateData() {
    if (this.Rate.id === 0) {      
      this.service.AddRate(this.RateForm.getRawValue()).subscribe(() => {
        alertify.success('Saved Successfully!');
        this.GetRateData();
      }, error => {
        alertify.error(error.error);
      });
    } else {
      this.service.EditRate(this.RateForm.getRawValue()).subscribe(() => {
        alertify.success('Updated Successfully!');
      }, error => {
        console.log(error);
        alertify.error(error.error);
      });
    }

  }


}
