// https://github.com/Klerith/bolt-product-editor

import { Navigate, useNavigate, useParams } from 'react-router';

import { useProduct } from '@/admin/hooks/useProduct';
import { AdminProductForm } from './ui/AdminProductForm';
import type { Product } from '@/interfaces';
import { toast } from 'sonner';


export const AdminProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    isError, 
    isLoading, 
    data:product,
    mutation,
  }  = useProduct(id || '');
  
  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const subtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';
  const handleSubmit = async (productLike: Partial<Product>) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: (data: Product) => {
        // Acción a realizar en caso de éxito
        toast.success('Producto guardado correctamente',{
          position: 'top-right'
        });
        navigate(`/admin/products/${data.id}`); // Redirigir al producto recién creado/actualizado
      },
      onError: (error) => {
        // Acción a realizar en caso de error
        console.log({error});
        toast.error('Error al guardar el producto',{
          position: 'top-right'
        });
      },
      
    });
  }

 

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
    isMutating={mutation.isPending}
    onFormSubmit={handleSubmit}
  />;

};
