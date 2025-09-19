import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth-response.interface";


export const checkAuthAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('No token found');

  try {
    // const {data} = await tesloApi.get<AuthResponse>('/auth/check-status', {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // });
    
    //Introducimos los interceptors para no tener que poner el header en cada peticion
    const {data} = await tesloApi.get<AuthResponse>('/auth/check-status');
    localStorage.setItem('token', data.token);
    return data;

  } catch (error) {
    //Token expirado (existe per no es valido)
    localStorage.removeItem('token');
    throw new Error('Token is expired');
  }
}