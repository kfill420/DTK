// import { MemberStateI } from '../@types/memberStateI';
import { removeTokenJwtToAxiosInstance } from '../axios/axios';

export function addTokenAndPseudoToLocalStorage(token: string) {
  localStorage.setItem('token', token);
}

export function getTokenAndPseudoFromLocalStorage() {
  const token = localStorage.getItem('token');
  return { token };
}

export function disconnectLocalStorage() {
  localStorage.removeItem('token');
  removeTokenJwtToAxiosInstance();
}