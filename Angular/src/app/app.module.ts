import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { ManageCourseComponent } from './course/manage-course/manage-course.component';
import { UpdateCourseComponent } from './course/update-course/update-course.component';
import { AddBranchComponent } from './branch/add-branch/add-branch.component';
import { ManageBranchComponent } from './branch/manage-branch/manage-branch.component';
import { UpdateBranchComponent } from './branch/update-branch/update-branch.component';
import { AboutComponent } from './about/about.component';
import { UsercourseComponent } from './usercourse/usercourse.component';
import { ErrorComponent } from './error/error.component';
import { ViewCoursesComponent } from './view/view-courses/view-courses.component';
import { ViewBranchComponent } from './view/view-branch/view-branch.component';
import { ViewNotesComponent } from './view/view-notes/view-notes.component';
import { ViewQuestionpapersComponent } from './view/view-questionpapers/view-questionpapers.component';
import { ViewLabfileComponent } from './view/view-labfile/view-labfile.component';
import { PlayQuizComponent } from './quiz/play-quiz/play-quiz.component';
import { AddMaterialComponent } from './material/add-material/add-material.component';
import { ManageMaterialComponent } from './material/manage-material/manage-material.component';
import { UpdateMaterialComponent } from './material/update-material/update-material.component';
import { AddQuizComponent } from './quiz/add-quiz/add-quiz.component';
import { ManageQuizComponent } from './quiz/manage-quiz/manage-quiz.component';
import { UpdateQuizComponent } from './quiz/update-quiz/update-quiz.component';
import { AddQuizQuesComponent } from './quiz/add-quiz-ques/add-quiz-ques.component';
import { ManageQuizQuesComponent } from './quiz/manage-quiz-ques/manage-quiz-ques.component';
import { UpdateQuizQuesComponent } from './quiz/update-quiz-ques/update-quiz-ques.component';
import { ViewQuizQuesComponent } from './quiz/view-quiz-ques/view-quiz-ques.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminlayoutComponent } from './admin/adminlayout/adminlayout.component';
import { AdminHeaderComponent } from './admin/adminlayout/admin-header/admin-header.component';
import { AdminFooterComponent } from './admin/adminlayout/admin-footer/admin-footer.component';
import { StudentsComponent } from './admin/students/students.component';
import { QuizSubmissionComponent } from './admin/quiz-submission/quiz-submission.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserNotesComponent } from './user/user-notes/user-notes.component';
import { UserQuizComponent } from './user/user-quiz/user-quiz.component';
import { RegisterComponent } from './user/register/register.component';
import { ViewQuizComponent } from './user/view-quiz/view-quiz.component';
import { ViewMaterialComponent } from './admin/view-material/view-material.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    UserComponent,
    AdminloginComponent,
    AddCourseComponent,
    ManageCourseComponent,
    UpdateCourseComponent,
    AddBranchComponent,
    ManageBranchComponent,
    UpdateBranchComponent,
    AboutComponent,
    UsercourseComponent,
    ErrorComponent,
    ViewCoursesComponent,
    ViewBranchComponent,
    ViewNotesComponent,
    ViewQuestionpapersComponent,
    ViewLabfileComponent,
    PlayQuizComponent,
    AddMaterialComponent,
    ManageMaterialComponent,
    UpdateMaterialComponent,
    AddQuizComponent,
    ManageQuizComponent,
    UpdateQuizComponent,
    AddQuizQuesComponent,
    ManageQuizQuesComponent,
    UpdateQuizQuesComponent,
    ViewQuizQuesComponent,
    AdminlayoutComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    StudentsComponent,
    QuizSubmissionComponent,
    ProfileComponent,
    UserNotesComponent,
    UserQuizComponent,
    RegisterComponent,
    ViewQuizComponent,
    ViewMaterialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
