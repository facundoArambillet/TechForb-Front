import { UserDocumentType } from "../user-document-type/user-document-type";

export interface User {
    idUser: number;
    documentNumber: number;
    password: string;
    name: string;
    lastname: string;
    userDocumentType: UserDocumentType
}
