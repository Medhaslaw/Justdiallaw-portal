export interface LawyerData {
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

export interface sendOtpInterFace {
    data :string
    success:boolean
    
}

export interface checkOtpInterFace {
    data: string
    success: boolean
    token:string
user_data:LawyerData
}

export interface advocateRegInterFace {
      Token: string
data: LawyerData
success:boolean
}

export interface advocateUpdateInterFace {
    data: LawyerData
success: boolean
}

export interface barCouncilInterFace {
    bar_council_certificate_or_id_card: string
bar_council_registration_number: string
created_on: string
id: number
modified_on: string
name_of_bar_association: string
state_bar_council: string
user: number
}

export interface profileInfoInterFace {
    address: string
created_on: string
designation: string
facebook: string
few_lines_about_you:string
id: number
language_known: string
modified_on: string
practicing_since:string
twitter: string
user: number
your_chamber_address: string
}

export interface profileEditInterFace {
    city_name: string
dob: string
email: string
first_name: string
gender: string
last_name: string
phone_no: string
state: string
}

export interface lawyerApproveInterFace {
    data:LawyerData
    success:boolean

}