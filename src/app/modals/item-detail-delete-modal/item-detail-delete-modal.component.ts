import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {ItemModalActions} from '../../components/items/items.component';

@Component({
  selector: 'app-item-detail-delete-modal',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose
  ],
  templateUrl: './item-detail-delete-modal.component.html',
  styleUrl: './item-detail-delete-modal.component.css'
})
export class ItemDetailDeleteModalComponent {

  constructor(public dialogRef: MatDialogRef<ItemDetailDeleteModalComponent>) { }

  deleteDetail() {
    this.dialogRef.close({action: ItemModalActions.DeleteDetail});
  }
}
