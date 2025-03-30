import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DxDataGridModule, DxButtonModule, DxPopupModule, DxFormModule } from 'devextreme-angular';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostsService } from './posts/posts.service';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxFormModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { } 