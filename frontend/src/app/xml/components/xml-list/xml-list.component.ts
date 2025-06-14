import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataGridComponent } from '../../../shared/components/data-grid/data-grid.component';
import { ListViewComponent } from '../../../shared/components/list-view/list-view.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoadingService } from '../../../shared/services/loading/loading.service';

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
    LoadingService
  ],
  templateUrl: './xml-list.component.html',
  styleUrl: './xml-list.component.scss'
})
export class XmlListComponent {

}
