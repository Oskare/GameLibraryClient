import {Component, inject} from '@angular/core';
import {ItemsService} from '../services/items.service';
import {NgForOf} from '@angular/common';
import {ItemPage} from '../types'

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {

  constructor(private itemsService: ItemsService) {}

  itemsPage: ItemPage | null = null;

  ngOnInit(): void {
    this.itemsService.getItems().subscribe({
      next: results => this.itemsPage = results,
      error: error => console.log(error),
    });
  }
}
