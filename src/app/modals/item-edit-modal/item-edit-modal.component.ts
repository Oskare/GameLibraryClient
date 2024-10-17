import {Component, Inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {ItemModalActions} from '../../components/items/items.component';
import {LabelComponent} from '../../ui/label/label.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Item, ItemUpdateModel} from '../../models/item';

@Component({
  selector: 'app-item-edit-modal',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    LabelComponent,
    ReactiveFormsModule
  ],
  templateUrl: './item-edit-modal.component.html',
  styleUrl: './item-edit-modal.component.css'
})
export class ItemEditModalComponent {

  editForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    youtubeURL: new FormControl(''),
  });

  constructor(private dialogRef: MatDialogRef<ItemEditModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Item) {

    this.editForm.get('name')?.setValue(data.name);
    this.editForm.get('description')?.setValue(data.description);
    this.editForm.get('youtubeURL')?.setValue(data.youtubeUrl);
  }

  saveItem() {
    this.dialogRef.close({action: ItemModalActions.Edit, model: this.editForm.value});
  }
}
