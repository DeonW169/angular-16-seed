import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SnakeToCamelCasePipe } from './pipes/snakeToCamelCase/snake-to-camel-case-pipe';
import { SnakeToCamelCaseStringPipe } from './pipes/snakeToCamelCaseString/snake-to-camel-case-string-pipe';
import { FormatFilterOptionsPipe } from './pipes/format-filter-options/format-filter-options.pipe';

import { SharedModule } from "../shared-modules/shared-modules.module";

import { KwikspaceService } from "../services/kwikspace.service";

import { HeaderComponent } from "./components/header/header.component";
import { ProfileButtonComponent } from "./components/profile-button/profile-button.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { AlertMessageComponent } from "./components/alert-message/alert-message.component";
import { ModalComponent } from "./components/modal/modal.component";
import { TableComponent } from './components/table/table.component';

import { } from "./components/table/table.component";

@NgModule({
  declarations: [
    SnakeToCamelCasePipe,
    SnakeToCamelCaseStringPipe,
    FormatFilterOptionsPipe,
    HeaderComponent,
    ProfileButtonComponent,
    LoaderComponent,
    AlertMessageComponent,
    ModalComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
  ],
  exports: [
    SnakeToCamelCasePipe,
    SnakeToCamelCaseStringPipe,
    FormatFilterOptionsPipe,
    HeaderComponent,
    ProfileButtonComponent,
    LoaderComponent,
    AlertMessageComponent,
    ModalComponent,
    TableComponent
  ],
  providers: [
    SnakeToCamelCasePipe,
    SnakeToCamelCaseStringPipe,
    FormatFilterOptionsPipe,
    KwikspaceService
  ],
})
export class CoreModule { }
