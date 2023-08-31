import  { Document} from 'mongoose';

export interface Person extends Document{
    save(): unknown;
    name:string;
    date:Date;
}