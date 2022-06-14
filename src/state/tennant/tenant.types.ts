export type Tenant = {
    "personal": {
        "first_name": string;
        "last_name": string;
        "current_address": string;
    },
    "employer": [
        {
            "name": string;
            "start_date": string;
            "end_date": string;
        },
        {
            "name": string;
            "start_date": string;
            "end_date": string;
        }
    ],
    "guarantor": {
        "name": string;
        "address": string;
        "relation": string;
    }
}

export interface TenantState {
    value: Tenant | null;
    isLoading: boolean;
    error: string | null;
}