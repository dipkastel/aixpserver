import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/user/settings/settings.component';
import { DatasetsComponent } from './components/user/datasets/datasets.component';
import { DatasetDetailComponent } from './components/user/datasetDetail/dataset-detail.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { TemplateComponent } from './components/template/template/template.component';
import { UserTemplateComponent } from './components/template/user-template/user-template.component';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { UnathorizedComponent } from './components/error/unathorized/unathorized.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UploadDirective } from './tools/directives/upload.directive';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {TrainComponent} from './components/user/datasetDetail/train/train.component';
import {PreparationComponent} from './components/user/datasetDetail/preparation/preparation.component';
import {DeploymentComponent} from './components/user/datasetDetail/deployment/deployment.component';
import {LayoutEditorComponent} from './components/user/datasetDetail/layout-editor/layout-editor.component';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SettingsComponent,
    DatasetsComponent,
    DatasetDetailComponent,
    DashboardComponent,
    UserListComponent,
    TemplateComponent,
    UserTemplateComponent,
    AdminTemplateComponent,
    NotFoundComponent,
    UnathorizedComponent,
    UploadDirective,
    TrainComponent,
    DeploymentComponent,
    PreparationComponent,
    LayoutEditorComponent
  ],
    imports: [
        RouterModule.forRoot(AppRoutingModule.getRouts()),
        FormsModule,
        CommonModule,
        BrowserModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatListModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressBarModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbNavModule,
        MatSelectModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
