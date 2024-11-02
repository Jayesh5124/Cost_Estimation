// // types/Property.ts
// export interface Constructor {
//     constructorName: string;
//     contactInfo?: string;
// }

import { ReactNode } from "react";

// export interface Property {
//     user_email: string;
//     user_name: string;
//     city: string;
//     state: string;
//     builtup_area: number;
//     property_name: string;
//     property_type: string;
//     flats_per_floor?: number;
//     cabins_needed?: number;
//     land_clearance_needed: boolean;
//     land_clearance?: number;
//     floors_needed: number;
//     isEstimated?: boolean;
//     isStartBuild?: boolean;
//     constructorList?: Constructor[];
// }
// types/Property.ts
export interface Constructor {
    experience: ReactNode;
    name: ReactNode;
    constructorName: string;
    contactInfo?: string;
}

export interface Property {
    user_email: string;
    user_name: string;
    city: string;
    state: string;
    builtup_area: number;
    property_name: string;
    property_type: string; // Added
    land_clearance_needed: boolean; // Added
    floors_needed: number; // Added
    flats_per_floor?: number;
    cabins_needed?: number;
    land_clearance?: number;
    isEstimated?: boolean;
    isStartBuild?: boolean;
    constructorList?: Constructor[];
}
