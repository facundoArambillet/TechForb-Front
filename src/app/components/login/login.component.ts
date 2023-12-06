import { Component, inject } from '@angular/core';
import { UserDocumentType } from 'src/app/models/user-document-type/user-document-type';
import { Token } from 'src/app/models/token/token';
import { UserLoginDTO } from 'src/app/models/user/user-login-dto';
import { UserDocumentTypeService } from 'src/app/services/user-document-type.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserDTO } from 'src/app/models/user/user-dto';
import { AccountService } from 'src/app/services/account.service';
import { AccountDetailDTO } from 'src/app/models/account/account-detail-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  private accountService = inject(AccountService);
  private userDocumentTypeService = inject(UserDocumentTypeService);
  selectedOption: string = "";
  documentTypes!: UserDocumentType[];
  userLogin!: UserLoginDTO;
  userDocument!: number;
  userPassword!: string;

  login() {
    if (this.selectedOption !== "DNI") {
      Swal.fire({
        icon: "error",
        title: `Document type: <strong>${this.selectedOption}<strong>`,
        text: "The document type is temporarily disabled, please use another",
      });

    } else {
      let userDocumentType = this.documentTypes.find(documentType => documentType.type === this.selectedOption);
      if (userDocumentType) {
        this.userLogin = {
          documentNumber: this.userDocument,
          password: this.userPassword,
          idUserDocumentType: userDocumentType.idType
        }
        this.userService.login(this.userLogin).subscribe(
          {
            next: (JWT: Token) => {
              window.localStorage.setItem("Token", JWT.token);
              this.userService.getByDocumentNumber(this.userDocument).subscribe(
                {
                  next: (user: UserDTO) => {
                    window.localStorage.setItem("User", JSON.stringify(user));
                    this.accountService.getByUser(this.userDocument).subscribe(
                      {
                        next: (AccountDetailDTO: AccountDetailDTO) => {
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
                    console.log("Error get by document number: " + error.message);
                  }
                }
              )
              
            },
            error: (error) => {
              Swal.fire({
                icon: "error",
                title: `Invalid Credentials`,
                text: "Document number or Password are invalid",
              });
            }
          }
        )
      }

    }
  }


  loadDocumentTypes() {
    this.userDocumentTypeService.getAll().subscribe(
      {
        next: (documentTypes: UserDocumentType[]) => {
          this.documentTypes = documentTypes;
          this.selectedOption = documentTypes[0].type;
        },
        error: (error) => {
          console.log("Error load dni types: " + error.message);
        }
      }
    )
  }


  ngOnInit() {
    this.loadDocumentTypes();
  }
}
