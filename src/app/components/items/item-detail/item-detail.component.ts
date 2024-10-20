import {Component} from '@angular/core';
import {ItemsService} from '../../../services/items.service';
import {Item, ItemDetail, SteamDetail} from '../../../models/item';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {StatusBadgeComponent} from '../../../ui/status-badge/status-badge.component';
import {ItemEditModalComponent} from '../../../modals/item-edit-modal/item-edit-modal.component';
import {ItemModalActions} from '../items.component';
import {MatDialog} from '@angular/material/dialog';
import {
  ItemDetailCreateModalComponent
} from '../../../modals/item-detail-create-modal/item-detail-create-modal.component';
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {
  ItemDetailDeleteModalComponent
} from '../../../modals/item-detail-delete-modal/item-detail-delete-modal.component';
import {YouTubePlayer} from '@angular/youtube-player';
import {FormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [
    RouterLink,
    StatusBadgeComponent,
    DatePipe,
    NgIf,
    YouTubePlayer,
    NgForOf,
    FormsModule,
    NgOptimizedImage,
    MatTooltipModule,
    MatButton
  ],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent {

  itemId: number = 0;
  item: Item | undefined = undefined;
  itemDetails: ItemDetail[] = [];
  youtubeVideoId: string | undefined;

  selectedStatus: string | undefined;
  statusOptions: string[] = ['Backlog', 'In Progress', 'Finished'];

  steamDetails: SteamDetail[] = [];

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

        this.selectedStatus = this.resolveStatus(this.item.status);

        if (this.item.youtubeUrl)
          this.youtubeVideoId = new URL(this.item!.youtubeUrl!).searchParams.get('v') ?? undefined

        this.itemsService.getSteamDetails(this.item.id).subscribe({
          next: results => this.steamDetails = results,
          error: error => console.log(error)
        });
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
    this.setStatus(2);
  }

  selectStatus() {
    if (this.selectedStatus) {
      const status = this.statusOptions.indexOf(this.selectedStatus);
      this.setStatus(status);
    }
  }

  setStatus(status: number) {
    if (this.item) {
      this.item.status = status;
      this.selectedStatus = this.resolveStatus(this.item.status);
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

  resolveStatus(status: number): string {
    return this.statusOptions[status];
  }

  protected readonly encodeURIComponent = encodeURIComponent;
}
