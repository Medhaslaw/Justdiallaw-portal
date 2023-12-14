export interface UserData {
    addon_category: any;
    approved_by_admin: boolean;
    barcouncil_id: string;
    city_name: string;
    comment: string;
    court: string;
    created_date: string;
    created_on: string;
    date_joined: string;
    description: string;
    dob: string;
    email: string;
    experience: string;
    first_name: string;
    gender: string;
    groups: any;
    id: number;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    languages: string;
    last_login: string;
    last_name: string;
    lawyer_is_available: boolean;
    modified_on: string;
    name: string;
    office_address: string;
    password: string;
    phone_no: string;
    primary_category: number;
    profile_pic: string;
    profile_pic_url: string;
    rejected_by_admin: boolean;
    role: string;
    state: string;
    status: boolean;
    user_permissions: any;
    username: string;
    year_of_practice: string;
}

export interface reviewInterFace {
    client: number
comment: string
created_on: string
id: number
lawyer: number
modified_on: string
stars: number
}

export interface regInterFace {
    Data: UserData
    success: boolean
    token:string
}