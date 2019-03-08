import { CollaboratorRole } from "../enums/CollaboratorRole";

export interface ICollaborator {
    username: string,
    role: CollaboratorRole
}