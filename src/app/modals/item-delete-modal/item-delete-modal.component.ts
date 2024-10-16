import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {ItemModalActions} from '../../components/items/items.component';

@Component({
  selector: 'app-item-delete-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    MatDialogClose
  ],
  templateUrl: './item-delete-modal.component.html',
  styleUrl: './item-delete-modal.component.css'
})
export class ItemDeleteModalComponent {

  constructor(public dialogRef: MatDialogRef<ItemDeleteModalComponent>) { }

  deleteItem() {
    this.dialogRef.close(ItemModalActions.Delete);
  }
}
