import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { Post } from './post.interface';

@Component({
  selector: 'app-posts',
  template: `
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <dx-data-grid
        [dataSource]="posts"
        [showBorders]="true"
        [columnAutoWidth]="true"
        [rowAlternationEnabled]="true"
        [showColumnLines]="true"
        [showRowLines]="true"
        class="dark:text-white dark:bg-gray-800">
        
        <dxo-paging [pageSize]="10"></dxo-paging>
        <dxo-pager
          [showPageSizeSelector]="true"
          [allowedPageSizes]="[5, 10, 20]"
          [showNavigationButtons]="true">
        </dxo-pager>
        
        <dxo-search-panel
          [visible]="true"
          [highlightCaseSensitive]="false"
          class="dark:bg-gray-700 dark:text-gray-200">
        </dxo-search-panel>

        <dxo-header-filter
          [visible]="true"
          class="dark:bg-gray-700">
        </dxo-header-filter>

        <dxi-column 
          dataField="id" 
          caption="ID" 
          width="100"
          [allowFiltering]="false"
          class="dark:text-gray-200">
        </dxi-column>

        <dxi-column 
          dataField="title" 
          caption="Title"
          [allowFiltering]="true"
          class="dark:text-gray-200">
        </dxi-column>

        <dxi-column 
          dataField="body" 
          caption="Content"
          [allowFiltering]="true"
          class="dark:text-gray-200">
        </dxi-column>
        
        <dxi-column 
          type="buttons" 
          width="100"
          caption="Actions"
          [allowFiltering]="false">
          <dxi-button
            name="delete"
            hint="Delete"
            icon="trash"
            [visible]="true"
            stylingMode="text"
            [onClick]="onDeleteClick">
          </dxi-button>
        </dxi-column>

        <dxo-filter-row
          [visible]="true"
          class="dark:bg-gray-700">
        </dxo-filter-row>
      </dx-data-grid>

      <!-- Delete Confirmation Popup -->
      <dx-popup
        [(visible)]="isDeleteConfirmationVisible"
        [dragEnabled]="false"
        [hideOnOutsideClick]="true"
        [showCloseButton]="false"
        [showTitle]="true"
        title="Confirm Delete"
        width="300"
        height="auto"
        class="dark:bg-gray-800">
        <div class="p-4">
          <p class="text-gray-700 dark:text-gray-200 mb-4">
            Are you sure you want to delete this post?
          </p>
          <div class="flex justify-end space-x-2">
            <dx-button
              text="Cancel"
              (click)="cancelDelete()"
              class="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
            </dx-button>
            <dx-button
              text="Delete"
              type="danger"
              (click)="confirmDelete()"
              class="dark:bg-red-600 dark:text-white dark:hover:bg-red-700">
            </dx-button>
          </div>
        </div>
      </dx-popup>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      margin: 20px 0;
    }

    ::ng-deep .dx-datagrid {
      @apply dark:bg-gray-800;
    }

    ::ng-deep .dx-datagrid-headers {
      @apply dark:bg-gray-700 dark:text-gray-200;
    }

    ::ng-deep .dx-datagrid-rowsview {
      @apply dark:bg-gray-800 dark:text-gray-200;
    }

    ::ng-deep .dx-datagrid-borders > .dx-datagrid-headers,
    ::ng-deep .dx-datagrid-borders > .dx-datagrid-rowsview {
      @apply dark:border-gray-600;
    }

    ::ng-deep .dx-datagrid-filter-row {
      @apply dark:bg-gray-700 dark:text-gray-200;
    }

    ::ng-deep .dx-datagrid-filter-row .dx-texteditor-input {
      @apply dark:bg-gray-600 dark:text-gray-200;
    }

    ::ng-deep .dx-datagrid-search-panel {
      @apply dark:bg-gray-700;
    }

    ::ng-deep .dx-datagrid-search-panel .dx-texteditor-input {
      @apply dark:bg-gray-600 dark:text-gray-200;
    }

    ::ng-deep .dx-datagrid-pager {
      @apply dark:bg-gray-700 dark:text-gray-200;
    }

    ::ng-deep .dx-pager .dx-pages .dx-page {
      @apply dark:text-gray-200;
    }

    ::ng-deep .dx-pager .dx-pages .dx-selection {
      @apply dark:bg-gray-600;
    }

    ::ng-deep .dx-datagrid-header-panel {
      @apply dark:bg-gray-700;
    }

    ::ng-deep .dx-datagrid-header-panel .dx-toolbar {
      @apply dark:bg-gray-700;
    }

    ::ng-deep .dx-datagrid-filter-panel {
      @apply dark:bg-gray-700 dark:text-gray-200;
    }

    ::ng-deep .dx-overlay-content {
      @apply dark:bg-gray-700;
    }

    ::ng-deep .dx-overlay-content .dx-popup-content {
      @apply dark:bg-gray-700 dark:text-gray-200;
    }

    ::ng-deep .dx-overlay-content .dx-popup-title {
      @apply dark:bg-gray-800 dark:text-gray-200;
    }

    ::ng-deep .dx-popup-content {
      @apply dark:bg-gray-800;
    }

    ::ng-deep .dx-popup-title {
      @apply dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600;
    }

    ::ng-deep .dx-popup-title .dx-closebutton {
      @apply dark:text-gray-400 dark:hover:text-gray-200;
    }

    ::ng-deep .dx-button-has-text {
      @apply dark:border-gray-600;
    }

    ::ng-deep .dx-button-danger {
      @apply dark:bg-red-600 dark:text-white dark:hover:bg-red-700 dark:border-red-600;
    }

    ::ng-deep .dx-button-danger.dx-state-hover {
      @apply dark:bg-red-700;
    }
  `]
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  isDeleteConfirmationVisible = false;
  postToDelete: number | null = null;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postsService.getPosts().subscribe(
      (data) => {
        this.posts = data;
      }
    );
  }

  onDeleteClick = (e: any) => {
    console.log(e);
    this.postToDelete = e.row.data.id;
    this.isDeleteConfirmationVisible = true;
    e.event.preventDefault();
  }

  cancelDelete = () => {
    this.isDeleteConfirmationVisible = false;
    this.postToDelete = null;
  }

  confirmDelete = () => {
    if (this.postToDelete) {
      this.postsService.deletePost(this.postToDelete).subscribe({
        next: () => {
          this.loadPosts();
          this.isDeleteConfirmationVisible = false;
          this.postToDelete = null;
        },
        error: (error) => {
          console.error('Error deleting post:', error);
          // You might want to show an error message to the user here
        }
      });
    }
  }
} 