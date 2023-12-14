export interface allCategoryInterFace {
category_name:string,
category_pic:string,
category_pic_url:string
created_by:string
created_on:string
id: number
modified_on:string
status:boolean
}


export interface allStatesInterFace {
    id: number
        name: string,
        country_id: number
        country_code: string
        country_name: string
        state_code: string
        type: string
        latitude: string
        longitude: string
}

export interface allCitesInterFace {
 id: number
name: string
   state_id: number
   state_code: string
   state_name: string
   country_id: number
   country_code: string
   country_name: string
   latitude: number
   longitude: number
   wikiDataId: string
}

export interface allCourtsInterFace {
    id: string
    text: string
}
