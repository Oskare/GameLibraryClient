import {Component} from '@angular/core';
import {ItemsService} from '../../../services/items.service';
import {Item, ItemDetail} from '../../../models/item';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {StatusBadgeComponent} from '../../../ui/status-badge/status-badge.component';
import {ItemEditModalComponent} from '../../../modals/item-edit-modal/item-edit-modal.component';
import {ItemModalActions} from '../items.component';
import {MatDialog} from '@angular/material/dialog';
import {
  ItemDetailCreateModalComponent
} from '../../../modals/item-detail-create-modal/item-detail-create-modal.component';
import {DatePipe, NgIf} from '@angular/common';
import {
  ItemDetailDeleteModalComponent
} from '../../../modals/item-detail-delete-modal/item-detail-delete-modal.component';
import {YouTubePlayer} from '@angular/youtube-player';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [
    RouterLink,
    StatusBadgeComponent,
    DatePipe,
    NgIf,
    YouTubePlayer
  ],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent {

  itemId: number = 0;
  item: Item | undefined = undefined;
  itemDetails: ItemDetail[] = [];
  youtubeVideoId: string | undefined;

  constructor(private itemsService: ItemsService,
              private route: ActivatedRoute,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!Number.isNaN(id)) {
      this.itemId = Number(id);
      this.loadItem();
      this.loadItemDetails();
    }
  }

  loadItem() {
    this.itemsService.getItem(this.itemId).subscribe({
      next: results => {
        this.item = results

        if (this.item.youtubeUrl)
          this.youtubeVideoId = new URL(this.item!.youtubeUrl!).searchParams.get('v') ?? undefined
        console.log(this.youtubeVideoId);
      },
      error: error => console.log(error),
    });
  }

  loadItemDetails() {
    this.itemsService.getItemDetails(this.itemId).subscribe({
      next: results => this.itemDetails = results,
      error: error => console.log(error),
    });
  }

  setFinished() {
    if (this.item) {
      this.item.status = 2;
      this.itemsService.updateItem(this.item.id, this.item).subscribe({
        error: error => console.log(error),
      });
    }
  }

  editItem() {
    if (this.item) {
      this.dialog
        .open(ItemEditModalComponent, {
          data: this.item
        })
        .afterClosed()
        .subscribe(result => {
          if (result.action === ItemModalActions.Edit && this.item) {
            this.itemsService.updateItem(this.item.id, result.model).subscribe({
              next: result => this.loadItem(),
              error: error => console.log(error),
            });
          }
        });
    }
  }

  createDetail() {
    this.dialog
      .open(ItemDetailCreateModalComponent)
      .afterClosed()
      .subscribe(result => {
        if (result.action === ItemModalActions.CreateDetail && this.item) {
          this.itemsService.createItemDetail(this.item.id, result.model).subscribe({
            next: result => this.loadItemDetails(),
            error: error => console.log(error),
          });
        }
      });
  }

  deleteDetail(detailId: number) {
    this.dialog
      .open(ItemDetailDeleteModalComponent)
      .afterClosed()
      .subscribe(result => {
        if (result.action === ItemModalActions.DeleteDetail && this.item) {
          this.itemsService.deleteItemDetail(this.item.id, detailId).subscribe({
            next: result => this.loadItemDetails(),
            error: error => console.log(error),
          });
        }
      });
  }
}
