import { create } from 'zustand'
import type { User } from '@/interfaces'
import { loginAction } from '../actions/login.action'
import { checkAuthAction } from '../actions/check-auth.action'
import { registerAction } from '../actions/register.actions'

type AuthState = {
  //Properties - solo lectura 
  user: User | null
  token: string | null
  isLogged: boolean
  //Getters - solo lectura
  getUser: () => User | null
  getToken: () => string | null
  getIsLogged: () => boolean
  getIsAdmin: () => boolean

  //Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void
  checkAuthStatus: () => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  isLogged: false,
  //Getters
  getUser: () => get().user,
  getToken: () => get().token,
  getIsLogged: () => get().isLogged,
  getIsAdmin: () => !!get().user?.roles?.includes('admin'),

  //Actions
  login: async (email, password) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem('token', data.token);
      //Grabamos la información en el store, que es reactivo!!
      set({ user: data.user, token: data.token, isLogged: true });
      console.log('Usuario autenticado correctamente');
      return true
    } catch (error) {
        set({ user: null, token: null, isLogged: false });
        localStorage.removeItem('token');
        console.log('Error capturado: ',error);
        return false
    }
  },
  logout: () => {
    set({ user: null, token: null, isLogged: false });
    localStorage.removeItem('token');
    console.log('Usuario desautenticado correctamente');
  },
  checkAuthStatus: async () => {
    try {
      const data = await checkAuthAction();
      set({ user: data.user, token: data.token, isLogged: true });
      return true
    } catch (error) {
      set({ user: null, token: null, isLogged: false });
      console.log('Error capturado: ', error);
      return false;
    }
  },
  register: async (name, email, password) => {
    try {
      //Llamar al backend
      const data = await registerAction(name, email, password);
      set({ user: data.user, token: data.token, isLogged: true });
      localStorage.setItem('token', data.token);
      console.log('Usuario registrado correctamente');
      return true
    } catch (error) {
      set({ user: null, token: null, isLogged: false });
      console.log('Error capturado: ', error);
      return false;
    }
  }

}))
