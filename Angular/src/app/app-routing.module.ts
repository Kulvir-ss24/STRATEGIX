import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { ManageCourseComponent } from './course/manage-course/manage-course.component';
import { UpdateCourseComponent } from './course/update-course/update-course.component';
import { AddBranchComponent } from './branch/add-branch/add-branch.component';
import { AboutComponent } from './about/about.component';
import { UsercourseComponent } from './usercourse/usercourse.component';
import { ErrorComponent } from './error/error.component';
import { PlayQuizComponent } from './quiz/play-quiz/play-quiz.component';
import { ViewBranchComponent } from './view/view-branch/view-branch.component';
import { ViewCoursesComponent } from './view/view-courses/view-courses.component';
import { ViewNotesComponent } from './view/view-notes/view-notes.component';
import { ViewLabfileComponent } from './view/view-labfile/view-labfile.component';
import { ViewQuestionpapersComponent } from './view/view-questionpapers/view-questionpapers.component';
import { AddMaterialComponent } from './material/add-material/add-material.component';
import { UpdateMaterialComponent } from './material/update-material/update-material.component';
import { ManageMaterialComponent } from './material/manage-material/manage-material.component';
import { ManageBranchComponent } from './branch/manage-branch/manage-branch.component';
import { UpdateBranchComponent } from './branch/update-branch/update-branch.component';
import { AddQuizComponent } from './quiz/add-quiz/add-quiz.component';
import { ManageQuizComponent } from './quiz/manage-quiz/manage-quiz.component';
import { UpdateQuizComponent } from './quiz/update-quiz/update-quiz.component';
import { AddQuizQuesComponent } from './quiz/add-quiz-ques/add-quiz-ques.component';
import { ManageQuizQuesComponent } from './quiz/manage-quiz-ques/manage-quiz-ques.component';
import { UpdateQuizQuesComponent } from './quiz/update-quiz-ques/update-quiz-ques.component';
import { ViewQuizQuesComponent } from './quiz/view-quiz-ques/view-quiz-ques.component';
import { AdminlayoutComponent } from './admin/adminlayout/adminlayout.component';
import { LayoutComponent } from './layout/layout.component';
import { StudentsComponent } from './admin/students/students.component';
import { QuizSubmissionComponent } from './admin/quiz-submission/quiz-submission.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserNotesComponent } from './user/user-notes/user-notes.component';
import { UserQuizComponent } from './user/user-quiz/user-quiz.component';
import { RegisterComponent } from './user/register/register.component';
import { ViewQuizComponent } from './user/view-quiz/view-quiz.component';
import { ViewMaterialComponent } from './admin/view-material/view-material.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [

  { path: "", redirectTo: "/user/home", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: 'user', component: LayoutComponent, children: [
      { path: "home", component: HomeComponent },
      { path: "about", component: AboutComponent },
      { path: "view-courses", component: ViewCoursesComponent },
      { path: "view-branch/:id", component: ViewBranchComponent},

      { path: "view-quiz/:id", component: ViewQuizComponent, canActivate:[AuthGuard] },
      // { path: "play-quiz/:id", component: PlayQuizComponent },
      { path: "view-quiz-ques/:id", component: ViewQuizQuesComponent, canActivate:[AuthGuard] },

      { path: "view-notes/:id", component: ViewNotesComponent, canActivate:[AuthGuard] },
      { path: "view-questionpapers/:id", component: ViewQuestionpapersComponent, canActivate:[AuthGuard] },
      { path: "view-labfiles/:id", component: ViewLabfileComponent, canActivate:[AuthGuard] },

      { path: "add-material", component: AddMaterialComponent, canActivate:[AuthGuard] },
      { path: "update-material/:id", component: UpdateMaterialComponent, canActivate:[AuthGuard] },
      { path: "manage-material", component: ManageMaterialComponent, canActivate:[AuthGuard] },

      { path: "profile", component: ProfileComponent, canActivate:[AuthGuard]},
      { path: "user-quiz", component: UserQuizComponent, canActivate:[AuthGuard]},
      { path: "register", component: RegisterComponent},
    ]
  },

  // { path: "Usercourse", component: UsercourseComponent },



  { path: "admin", redirectTo:'/adminlogin' , pathMatch:'full'},
  { path: "adminlogin", component: AdminloginComponent },
  {
    path: 'admin', component: AdminlayoutComponent, canActivate:[AuthGuard], children:  [
      { path: 'dashboard', component: DashboardComponent },

      { path: 'students', component: StudentsComponent },

      { path: "manage-course", component: ManageCourseComponent },
      { path: "add-course", component: AddCourseComponent },
      { path: "update-course/:id", component: UpdateCourseComponent },

      { path: "add-branch", component: AddBranchComponent },
      { path: "manage-branch", component: ManageBranchComponent },
      { path: "update-branch/:id", component: UpdateBranchComponent },

      { path: "view-material", component: ViewMaterialComponent },

      { path: "add-quiz", component: AddQuizComponent },
      { path: "manage-quiz", component: ManageQuizComponent },
      { path: "update-quiz/:id", component: UpdateQuizComponent },

      { path: "add-quiz-ques/:id", component: AddQuizQuesComponent },
      { path: "manage-quiz-ques/:id/:total", component: ManageQuizQuesComponent },
      { path: "manage-quiz-ques/:id", component: ManageQuizQuesComponent },
      { path: "update-quiz-ques/:id", component: UpdateQuizQuesComponent },

      { path: "view-quiz-submission/:id", component:QuizSubmissionComponent},
    ]
  },

  {
    path: "**", component: ErrorComponent
  },





];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
