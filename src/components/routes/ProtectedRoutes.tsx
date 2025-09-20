import { useAuthStore } from "@/auth/store/auth.store"
import { Navigate } from "react-router";


//USO: Protege rutas que requieren autenticación
export const AuthenticatedRoute = ({children}: React.PropsWithChildren) => {
  const { getIsLogged} = useAuthStore();

  //Si no está autenticado, redirigir al login
  if(!getIsLogged()) {
    return <Navigate to="/auth" replace />  //Replace no permite volver atrás
  }
  return children;
}


//USO: No permite ir a rutas de auth si ya está autenticado
export const NotAuthenticatedRoute = ({children}: React.PropsWithChildren) => {
  const { getIsLogged} = useAuthStore();
  //Si está autenticado, redirigir al home
  if(getIsLogged()) {
    return <Navigate to="/" replace />  //Replace no permite volver atrás
  }
  return children;    
}


//USO: Protege rutas que requieren permisos de admin
export const AdminRoute = ({children}: React.PropsWithChildren) => {
  const { getIsLogged, getIsAdmin } = useAuthStore();
  //Si está autenticado y no es admin, redirigir al home
  if(getIsLogged() || !getIsAdmin()) {
    return <Navigate to="/" replace />  //Replace no permite volver atrás
  }
  return children;    
}
