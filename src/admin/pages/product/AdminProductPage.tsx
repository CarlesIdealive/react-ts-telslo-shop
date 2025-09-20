// https://github.com/Klerith/bolt-product-editor

import { Navigate, useParams } from 'react-router';

import { useProduct } from '@/admin/hooks/useProduct';
import { AdminProductForm } from './ui/AdminProductForm';


export const AdminProductPage = () => {
  const { id } = useParams();
  const {isError, isLoading, data:product}  = useProduct(id || '');
  console.log({product});
  
  
  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const subtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';


  // validación y manejo de errores
  if (isError) {
    return <Navigate to="/admin/products" replace />;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!product && !isLoading) {
    return <Navigate to="/admin/products" />;
  }

  //Tenemos un producto
  return <AdminProductForm
    title={title}
    subTitle={subtitle}
    product={product!}
  />;

};
