import type { PropsWithChildren } from 'react';
import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';  
import { Toaster } from 'sonner';
import { appRouter } from './app.router';
import { CustomFullScreenLoading } from './components/custom/CustomFullScreenLoading';
import { useAuthStore } from './auth/store/auth.store';


const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const {checkAuthStatus} = useAuthStore(); //Proporciona la función para verificar el estado de autenticación
  // useQuery para verificar el estado de autenticación
  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus, //Llama al STORE que gestiona el manejo del estado
    retry: false, // No reintentar si falla
    refetchInterval: 1000 * 60 * 60, // Refrescar cada 1 hora
    refetchOnWindowFocus: true
  });
  if (isLoading) 
    return <CustomFullScreenLoading />;
  
  return children;
}



export const TesloShopApp = () => {
  return(
    <QueryClientProvider client={queryClient}>
      <Toaster />
  
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
};

  
