import { DaySlotData } from "./dayslot.interface";
import { UserData } from "./user.interface";

export interface LeadData {
    client: UserData;
    created_by: string;
    created_on: string;
    dayslot: DaySlotData;
    id: number
    modified_on: string;
    status: boolean;
}