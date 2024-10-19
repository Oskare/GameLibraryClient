import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ItemModalActions} from '../../components/items/items.component';

@Component({
  selector: 'app-item-detail-create-modal',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './item-detail-create-modal.component.html',
  styleUrl: './item-detail-create-modal.component.css'
})
export class ItemDetailCreateModalComponent {

  createForm: FormGroup = new FormGroup({
    detail: new FormControl('', [Validators.required]),
  });

  constructor(private dialogRef: MatDialogRef<ItemDetailCreateModalComponent>) {
  }

  createDetail() {
    this.dialogRef.close({
      action: ItemModalActions.CreateDetail,
      model: this.createForm.value
    });
  }
}
