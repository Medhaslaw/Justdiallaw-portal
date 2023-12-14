import { LawyerData } from "./lawyer.interface";
import { UserData } from "./user.interface";

export interface DaySlotData {
    advocate: LawyerData;
    created_on: string;
    date: string;
    id: number;
    modified_on: string;
    timeslot: timeSlotsList;
}

export interface timeSlotsList {
    created_on: string
    end_time: string
    id: number
    modified_on: string
    start_time: string
    time_interval: string
    timing_slot: string
}

export interface bookedTimeSlotsList {
    [x: string]: any;
    client:UserData
    created_by: string
    created_on: string
    dayslot: DaySlotData
    id: number
    modified_on: string
    status: boolean
    token_numbers:string

}