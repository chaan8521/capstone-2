import { Time } from "@angular/common";

export class ScheduleModel {
    id!: number;         
        edpCode?: string;
        offeringCode?: string;
        subject_Id!: number; 
        day?: string;
        timeIn?: string;      
        timeOut?: string;
        user_Id!: number;  
       
}
