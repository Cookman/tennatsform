import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../state/store';
import {Tenant, TenantState} from "./tenant.types";
import tenantApi from './tenant.api'

const SLICE_KEY = 'tenant'

const initialState: TenantState = {
    value: null,
    isLoading: false,
    error: null
};

//ACTIONS
export const createTenantAsync = createAsyncThunk(
    `${SLICE_KEY}/fetch`,
    (tenant: Tenant) => tenantApi.createTenant({data: tenant}),
    {
        serializeError: (error: any) => ({
            ...error.response,
        })
    }
)

//SLICE
export const tenantSlice = createSlice({
    name: SLICE_KEY,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTenantAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createTenantAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.value = action.payload.data
            })
            .addCase(createTenantAsync.rejected, (state, action) => {
                state.isLoading = false;
               console.log(action.error)
                // @ts-ignore
                state.error = action.error?.status || "Unknown error"
            });
    },
});

//SELECTORS
export const isLoadingSelector = (state: RootState) => state.tenant.isLoading;
export const tenantSelector = (state: RootState) => state.tenant.value;
export const tenantErrorSelector = (state: RootState) => state.tenant.error

export default tenantSlice.reducer;
