import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axiosInstance from '../../axios/axios';
import { CheckProfileAddressI, updateInfosPayload } from '../../@types/account';


interface deleteAddressToProfileI {
  account_id: number | null;
  address_id: number | null;
}

const actionAddAddressFromAccount = createAsyncThunk<CheckProfileAddressI[], CheckProfileAddressI>(
  'account/ADD_ADDRESS_TO_PROFILE',
  async (payload: CheckProfileAddressI, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/account/addAddress/${payload.account_id}`, payload);
      console.log(response.data);

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

const actionDeleteAddressFromAccount = createAsyncThunk<number, deleteAddressToProfileI>(
  'account/DELETE_ADDRESS_FROM_PROFILE',
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/account/deleteAddress/${payload.account_id}/${payload.address_id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

const actionUpdateAddressFromAccount = createAsyncThunk<CheckProfileAddressI[], CheckProfileAddressI>(
  'account/UPDATE_ADDRESS_FROM_PROFILE',
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/account/updateAddress/${payload.account_id}/${payload.id}`, payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);



const actionUpdateInfosFromAccount = createAsyncThunk<updateInfosPayload, updateInfosPayload>(
  'account/UPDATE_MAIL_FROM_PROFILE',
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/account/updateInfos/${payload.account_id}/`, payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.response?.data);
    }
  }
);

export { actionAddAddressFromAccount, actionDeleteAddressFromAccount, actionUpdateAddressFromAccount, actionUpdateInfosFromAccount };
