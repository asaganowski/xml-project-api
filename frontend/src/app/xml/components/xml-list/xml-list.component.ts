import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { DataGridComponent } from '../../../shared/components/data-grid/data-grid.component';
import { ListViewComponent } from '../../../shared/components/list-view/list-view.component';
import { LoadingService } from '../../../shared/services/loading/loading.service';
import { XmlService } from '../../../shared/services/xml/xml.service';

@Component({
  selector: 'app-xml-list',
  standalone: true,
  imports: [
    DataGridComponent,
    ListViewComponent,
    MatDialogModule,
    CommonModule,
    LoadingComponent
  ],
  providers: [
    LoadingService,
    XmlService
  ],
  templateUrl: './xml-list.component.html',
  styleUrl: './xml-list.component.scss'
})
export class XmlListComponent implements OnInit {
  xmlDocuments: any[] = [];
  searchQuery: string = '';
  xpathQuery: string = '';
  showXmlForm = false;
  selectedXml: any = null;
  selectedXmlId: string | null = null;
  modifyXpath: string = '';
  newValue: string = '';

  constructor(
    private xmlService: XmlService,
    private matDialog: MatDialog,
    private _loadingService: LoadingService,
    private _authService: AuthService) { }

  ngOnInit(): void {
    this.loadXmlDocuments();
  }

  loadXmlDocuments() {
    this.xmlService.getAllXml().subscribe(docs => {
      this.xmlDocuments = docs;
    });
  }

  onSearch() {
    if (!this.searchQuery) {
      this.loadXmlDocuments();
      return;
    }
    this.xmlService.searchXml(this.searchQuery).subscribe(results => {
      this.xmlDocuments = results;
    });
  }

  onXPathSearch() {
    if (!this.xpathQuery) return;
    this.xmlService.searchByXPath(this.xpathQuery).subscribe(results => {
      this.xmlDocuments = results;
    });
  }

  openXmlForm() {
    this.selectedXml = null;
    this.showXmlForm = true;
  }

  closeXmlForm() {
    this.showXmlForm = false;
    this.selectedXml = null;
  }

  onSaveXml(xmlContent: string) {
    if (this.selectedXml) {
      this.xmlService.modifyXml(this.selectedXml.id, { XmlContent: xmlContent }).subscribe(() => {
        this.loadXmlDocuments();
        this.closeXmlForm();
      });
    } else {
      // Dodawanie
      this.xmlService.saveXml({ XmlContent: xmlContent }).subscribe(() => {
        this.loadXmlDocuments();
        this.closeXmlForm();
      });
    }
  }

  editXml(row: any) {
    this.selectedXml = row;
    this.showXmlForm = true;
  }

  deleteXml(id: string) {
    if (confirm('Czy na pewno chcesz usunąć ten dokument?')) {
      this.xmlService.deleteXml(id).subscribe(() => {
        this.loadXmlDocuments();
      });
    }
  }

  onModifyNodeByXPath() {
    if (!this.selectedXmlId || !this.modifyXpath || typeof this.newValue === 'undefined') return;
    this.xmlService.modifyNodeByXPath(this.selectedXmlId, this.modifyXpath, this.newValue).subscribe(() => {
      this.loadXmlDocuments();
      this.modifyXpath = '';
      this.newValue = '';
      this.selectedXmlId = null;
    });
  }

  displayedColumns: TableColumnNames<EventDto> = ['Id', 'Name', 'Content'];

  changedColumnHeaderNames: ChangedTableColumnNames<EventDto> = {
    Id: 'Id',
    Name: 'Nazwa',
    Content: 'Treść',
  }

  rowButtonAction: TableAction<EventDto>[] = [
    { key: TABLE_ACTION_KEY.ADD, name: "Kup bilet", icon: "add", color: "button-green", availabilityFn: el => !!el, callback: (el) => this.onSaveXml(el!) },
    { key: TABLE_ACTION_KEY.EDIT, name: "Edytuj", icon: "edit", color: "button-yellow", availabilityFn: el => !!el, callback: () => { } },
    { key: TABLE_ACTION_KEY.DELETE, name: "Usuń", icon: "delete", color: "button-red", availabilityFn: el => el?.location != 'Krk', callback: el => this.onDeleteClicked(el!) },
  ]

}
