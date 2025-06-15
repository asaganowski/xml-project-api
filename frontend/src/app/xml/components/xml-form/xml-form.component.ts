import { Component } from '@angular/core';

@Component({
  selector: 'app-xml-form',
  standalone: true,
  imports: [],
  templateUrl: './xml-form.component.html',
  styleUrl: './xml-form.component.scss'
})
export class XmlFormComponent {
  
  xmlForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.xmlForm = this.fb.group({
      xmlContent: [this.xml || '', Validators.required]
    });
  }

  ngOnChanges() {
    if (this.xmlForm && this.xml !== null) {
      this.xmlForm.patchValue({ xmlContent: this.xml });
    }
  }

  onSubmit() {
    if (this.xmlForm.valid) {
      this.submitXml.emit(this.xmlForm.value.xmlContent);
    }
  }

}
