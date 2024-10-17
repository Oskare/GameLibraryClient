import {Component, HostListener} from '@angular/core';
import {ItemsService} from '../../services/items.service';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Item, ItemPage} from '../../models/item'
import {StatusBadgeComponent} from '../../ui/status-badge/status-badge.component';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {debounceTime} from 'rxjs';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ItemDeleteModalComponent} from '../../modals/item-delete-modal/item-delete-modal.component';
import {ItemEditModalComponent} from '../../modals/item-edit-modal/item-edit-modal.component';


@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    StatusBadgeComponent,
    NgIf,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    MatDialogModule,
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {

  constructor(
    private itemsService: ItemsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  itemsPage: ItemPage | null = null;
  searchQuery: string | null = null;
  page: number | null = null;

  searchControl = new FormControl();  // Reactive form control for input
  dropdownOpenItem: number | null = null;

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(query => {
        this.search(query);
      });

    this.route.queryParams.subscribe(params => {
      this.readUrlParams();
      this.loadItems();
    });
  }

  readUrlParams(): void {
    const params = new URLSearchParams(window.location.search);
    this.searchQuery = params.get('search');
    this.page = Number(params.get('page') ?? 1);

    if (this.searchQuery && this.searchControl.value !== this.searchQuery)
      this.searchControl.setValue(this.searchQuery);
  }

  updateUrl() {
    const params = [];
    if (this.searchQuery) params.push(['search', this.searchQuery]);
    if (this.page) params.push(['page', this.page.toString()]);

    const newParams = new URLSearchParams(params);

    this.router.navigateByUrl(window.location.pathname + "?" + newParams.toString());
  }

  search(query: string): void {
    this.searchQuery = query;
    this.page = 1;
    this.updateUrl();
  }

  changePage(newPage: number): void {
    this.page = newPage;
    this.updateUrl();
  }

  loadItems() {
    this.itemsService.getItems(this.searchQuery, this.page).subscribe({
      next: results => this.itemsPage = results,
      error: error => console.log(error),
    });
  }

  toggleDropdown(item: any) {
    this.dropdownOpenItem = (this.dropdownOpenItem == item.id ? null : item.id);
  }

  editItem(item: Item) {
    this.dropdownOpenItem = null;

    this.dialog
      .open(ItemEditModalComponent, {
        data: item
      })
      .afterClosed()
      .subscribe(result => {
        if (result.action === ItemModalActions.Edit) {
          this.itemsService.updateItem(item.id, result.model).subscribe({
            next: result => this.loadItems(),
            error: error => console.log(error),
          });
        }
      });
  }

  deleteItem(item: Item) {
    this.dropdownOpenItem = null;

    this.dialog
      .open(ItemDeleteModalComponent)
      .afterClosed()
      .subscribe(result => {
        if (result === ItemModalActions.Delete) {
          this.itemsService.deleteItem(item.id).subscribe({
              next: _ => this.loadItems(),
              error: error => console.log(error),
            }
          );
        }
      });
  }

  // Close the dropdown if clicked outside
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!event.target.closest('.dropdown-menu')) {
      this.dropdownOpenItem = null;
    }
  }
}

export enum ItemModalActions {
  Delete = 'delete',
  Edit = 'edit',
}
