import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces";


const FILE_URL = import.meta.env.VITE_API_URL;


export const getProductByIdAction = async (id: string) : Promise<Product> => {

  if(!id) throw new Error('ID is required');

  if (id === 'new') return {
    id: 'new',
    slug: '',
    title: 'nuevo producto',
    description: '',
    price: 0,
    stock: 0,
    sizes: [],
    gender: 'men',
    tags: [],
    images: [],
  } as unknown as Product;

  const {data} = await tesloApi.get<Product>(`/products/${id}`);
  
  return {
    ...data,
    images: data.images.map( image => `${ FILE_URL }/files/product/${ image }` )
  };

}