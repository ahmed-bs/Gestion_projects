import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';
import { TeamComponent } from './team/team.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Project_tasksComponent } from './project_tasks/project_tasks.component';

@NgModule({
  declarations: [						
    AppComponent,

    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    SideBarComponent,
    TopBarComponent,
      ProjectComponent,
      TeamComponent,
      Project_tasksComponent,
      UserComponent,
   ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,DragDropModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
