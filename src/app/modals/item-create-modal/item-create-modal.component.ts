import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ItemModalActions} from '../../components/items/items.component';

@Component({
  selector: 'app-item-create-modal',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './item-create-modal.component.html',
  styleUrl: './item-create-modal.component.css'
})
export class ItemCreateModalComponent {

  createForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    youtubeURL: new FormControl(''),
  });

  constructor(private dialogRef: MatDialogRef<ItemCreateModalComponent>) {
  }

  createItem() {
    this.dialogRef.close({
      action: ItemModalActions.Create,
      model: this.createForm.value
    });
  }
}
