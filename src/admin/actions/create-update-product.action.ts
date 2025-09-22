import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces";

const FILE_URL = import.meta.env.VITE_API_URL;


export const createUpdateProductAction = async (
  productLike: Partial<Product>
) : Promise<Product> => 
{
  console.log({ productLike });
  // Eliminar campos no deseados
  const { id, user, images=[], ...rest } = productLike;
  const isCreating : boolean = id === 'new';
  // Asegurarse de que los campos numéricos sean del tipo correcto
  rest.stock = Number(rest.stock) || 0;
  rest.price = Number(rest.price) || 0;

  const { data } = await tesloApi<Product>({
    url: isCreating ? '/products' : `/products/${id}`,
    method: isCreating ? 'POST' : 'PATCH',
    data: rest
  });
  return {
    ...data,
    images: data.images.map( image => `${ FILE_URL }/files/product/${ image }` )
  };

};