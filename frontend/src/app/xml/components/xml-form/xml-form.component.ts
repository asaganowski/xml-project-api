import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionButtonsModal, ModalViewComponent } from '../../../shared/components/modal-view/modal-view.component';
import { XMLDocumentsListModel } from '../xml-list/xml-list.component';
import { XmlService } from '../../services/xml-api.service';

@Component({
  selector: 'app-xml-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ModalViewComponent
  ],
  templateUrl: './xml-form.component.html',
  styleUrl: './xml-form.component.scss',
  providers: [
    XmlService
  ]
})
export class XmlFormComponent {
  
  xmlForm: FormGroup;
  actionButtons: ActionButtonsModal[] = [];

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<XmlFormComponent>,
    @Inject(MAT_DIALOG_DATA) public xml: XMLDocumentsListModel | undefined,
    private xmlService: XmlService
  ) {
    this.xmlForm = this.fb.group({
      name: [this.xml ? this.xml.Name : '', !this.xml ? Validators.required : []],
      xmlContent: [this.xml?.Content || '', Validators.required],
      xpath: [null],
      newValue: [null],
      attributeName: [''],
      operation: [''],
      position: ['']
    });
    if(xml)
    this.xmlForm.get('xmlContent')?.disable();

    this.actionButtons = [
      {
        disabledFn: () => this.xmlForm.invalid,
        title: 'Zapisz',
        primary: true,
        actionFn: () => this.onSubmit()
      },
      {
        disabledFn: () => false,
        title: 'Wyjdź',
        primary: false,
        actionFn: () => dialogRef.close()
      }
    ]
  }

  ngOnChanges() {
    if (this.xmlForm && this.xml !== null) {
      this.xmlForm.patchValue({ xmlContent: this.xml });
    }
  }

  onSubmit() {
  if (this.xml) {
      const { xpath, newValue, attributeName, operation, position } = this.xmlForm.value;
      const id = this.xml.Id;

      switch (operation) {
        case 'insert-node':
          this.xmlService.insertNode({ id, xpath, newNodeXml: newValue, position }).subscribe(() => this.dialogRef.close());
          break;
        case 'delete-node':
          this.xmlService.deleteNode({ id, xpath }).subscribe(() => this.dialogRef.close());
          break;
        case 'replace-value':
          this.xmlService.replaceValue({ id, xpath, newValue }).subscribe(() => this.dialogRef.close());
          break;
        case 'insert-attribute':
          this.xmlService.insertAttribute({ id, xpath, attributeName, value: newValue }).subscribe(() => this.dialogRef.close());
          break;
        case 'delete-attribute':
          this.xmlService.deleteAttribute({ id, xpath, attributeName }).subscribe(() => this.dialogRef.close());
          break;
        default:
          console.warn('Nie wybrano operacji lub operacja nieobsługiwana.');
          break;
      }

    } else {
      const { name, xmlContent } = this.xmlForm.value;
      this.xmlService.saveXml({ name, xmlContent }).subscribe(() => this.dialogRef.close());
    }
}

}
