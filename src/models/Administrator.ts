import { User } from './User';

export interface Administrator extends User {
    dateGranted: Date;
}
