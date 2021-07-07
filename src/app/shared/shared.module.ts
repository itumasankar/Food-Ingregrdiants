import { NgModule } from "@angular/core";
// import { LoadingSpinnerComponent } from "./loding-spinner/loding-spinner.component";
// import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { CommonModule } from "@angular/common";
import { DropdownDirective } from "./dropdown.directive";
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loding-spinner/loding-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { RestrictInput } from "./restrict-input.directive";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    RestrictInput
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    RestrictInput,
    CommonModule
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule{

}
