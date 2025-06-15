import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DataGridComponent, TABLE_ACTION_KEY, TableAction } from '../../../shared/components/data-grid/data-grid.component';
import { ListViewComponent } from '../../../shared/components/list-view/list-view.component';
import { TableColumnNames, ChangedTableColumnNames } from '../../../shared/models/tableColumn.type';
import { XmlService } from '../../services/xml-api.service';
import { XmlFormComponent } from '../xml-form/xml-form.component';
import { FormsModule } from '@angular/forms';

export interface XMLDocumentsListModel {
  Id: number;
  Name: string;
  Content: XMLDocument;
  MatchedFragment: string;
}

@Component({
  selector: 'app-xml-list',
  standalone: true,
  imports: [
    DataGridComponent,
    ListViewComponent,
    MatDialogModule,
    CommonModule,
    FormsModule
  ],
  providers: [
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
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.loadXmlDocuments();
  }

  loadXmlDocuments() {
    this.xmlService.getAllXml().subscribe((docs: any) => {
      this.xmlDocuments = docs;
    });
  }

  onXPathSearch() {
    if (!this.xpathQuery) {
      this.loadXmlDocuments();
      return;
    }

    this.xmlService.searchByXPath(this.xpathQuery).subscribe(results => {
      this.xmlDocuments = results;
    });
  }

  deleteXml(id: number) {
    if (confirm('Czy na pewno chcesz usunąć ten dokument?')) {
      this.xmlService.deleteXml(id).subscribe(() => {
        this.loadXmlDocuments();
      });
    }
  }

  private openDialog(el: XMLDocumentsListModel | undefined){
    const questionDialogRef = this.matDialog.open(XmlFormComponent, {
      data: el,
      minWidth: '90vw'
    })

    questionDialogRef.afterClosed().subscribe(el => {
      this.loadXmlDocuments();
    })
  }

  onModifyNodeByXPath(el: XMLDocumentsListModel | undefined) {
    this.openDialog(el);
  }

  onAddNew(){
    this.openDialog(undefined);
  }

  displayedColumns: TableColumnNames<XMLDocumentsListModel> = ['Id', 'Name', 'Content', 'MatchedFragment'];

  changedColumnHeaderNames: ChangedTableColumnNames<XMLDocumentsListModel> = {
    Id: 'Id',
    Name: 'Nazwa',
    Content: 'Treść',
    MatchedFragment: 'XPath'
  }

  rowButtonAction: TableAction<XMLDocumentsListModel>[] = [
    { key: TABLE_ACTION_KEY.ADD, name: "Dodaj nowy", icon: "add", color: "button-green", availabilityFn: el => true, callback: (el) => this.onAddNew() },
    { key: TABLE_ACTION_KEY.EDIT, name: "Edytuj", icon: "edit", color: "button-yellow", availabilityFn: el => !!el, callback: (el) => this.onModifyNodeByXPath(el) },
    { key: TABLE_ACTION_KEY.DELETE, name: "Usuń", icon: "delete", color: "button-red", availabilityFn: el => !!el, callback: el => this.deleteXml(el?.Id!) },
  ]

}
