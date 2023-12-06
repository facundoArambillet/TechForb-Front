import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountDetailDTO } from 'src/app/models/account/account-detail-dto';
import { Token } from 'src/app/models/token/token';
import { UserDocumentType } from 'src/app/models/user-document-type/user-document-type';
import { UserCreateDTO } from 'src/app/models/user/user-create-dto';
import { UserDTO } from 'src/app/models/user/user-dto';
import { UserLoginDTO } from 'src/app/models/user/user-login-dto';
import { AccountService } from 'src/app/services/account.service';
import { UserDocumentTypeService } from 'src/app/services/user-document-type.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  private accountService = inject(AccountService);
  private userDocumentTypeService = inject(UserDocumentTypeService);
  selectedOption: string = "";
  documentTypes!: UserDocumentType[];
  userRegister!: UserCreateDTO;
  userDocument!: number;
  userPassword: string = "";
  userRepeatPassword: string = "";
  userName: string = "";
  userLastname: string = "";
  passwordsEquals: boolean = true;


  register() {
    let userDocumentType = this.documentTypes.find(documentType => documentType.type === this.selectedOption);
    if (userDocumentType) {
      if (this.validateName(this.userName)) {
        if (this.validateLastName(this.userLastname)) {
          if (this.validatePasswords(this.userPassword, this.userRepeatPassword)) {
            this.userRegister = {
              documentNumber: this.userDocument,
              password: this.userPassword,
              name: this.userName,
              lastname: this.userLastname,
              idUserDocumentType: userDocumentType.idType
            }
            this.userService.register(this.userRegister).subscribe(
              {
                next: (userDTO: UserDTO) => {
                  let userLogin: UserLoginDTO = {
                    documentNumber: this.userDocument,
                    password: this.userPassword,
                    idUserDocumentType: userDTO.idUserDocumentType
                  }
                  this.userService.login(userLogin).subscribe(
                    {
                      next: (JWT: Token) => {
                        this.accountService.getByUser(this.userDocument).subscribe(
                          {
                            next: (AccountDetailDTO: AccountDetailDTO) => {
                              window.localStorage.setItem("User", JSON.stringify(userDTO));
                              window.localStorage.setItem("Token", JWT.token);
                              window.localStorage.setItem("Account", JSON.stringify(AccountDetailDTO));
                              this.router.navigate(["/dashboard"]);
                            },
                            error: (error) => {
                              console.log("Error get by user: " + error.message);
                            }
                          }
                        )

                      },
                      error: (error) => {
                        console.log("Error login: " + error);
                      }
                    }
                  )
                },
                error: (error) => {
                  if (error.status == 400) {
                    Swal.fire({
                      icon: "error",
                      title: `Document already exist`,
                      text: "The document number entered already exists",
                    });
                  }
                  console.log("Error register: " + error.status);
                }
              }
            )
          }
        }
      }
    }
  }

  validateName(userName: string): boolean {
    if (userName.length < 1) {
      Swal.fire({
        icon: "error",
        title: `Name invalid`,
        text: "The name cannot be empty",
      });
      return false;
    }
    return true;
  }

  validateLastName(userLastName: string): boolean {
    if (userLastName.length < 1) {
      Swal.fire({
        icon: "error",
        title: `Last Name invalid`,
        text: "The Last Name cannot be empty",
      });
      return false;
    }
    return true;
  }

  validatePasswords(password: string, passwordRepeat: string): boolean {
    if(password.length > 0 && passwordRepeat.length > 0) {
      if(password == passwordRepeat) {
        return true;
      } else {
        this.passwordsEquals = false;
      }
    } else {
      Swal.fire({
        icon: "error",
        title: `The passwords are invalid`,
        text: "The passwords cannot be empty",
      });
    }

    return false;
  }

  setPasswordsMatchs() {
    this.passwordsEquals = true;
  }

  loadDocumentTypes() {
    this.userDocumentTypeService.getAll().subscribe(
      {
        next: (documentTypes: UserDocumentType[]) => {
          this.documentTypes = documentTypes;
          this.selectedOption = documentTypes[0].type;
        },
        error: (error) => {
          console.log("Error load dni types: " + error);
        }
      }
    )
  }


  ngOnInit() {
    this.loadDocumentTypes();
  }
}
