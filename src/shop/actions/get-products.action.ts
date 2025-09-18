import { tesloApi } from "@/api/tesloApi";
import type { ProductsResponse } from "@/interfaces";

const FILE_URL = import.meta.env.VITE_API_URL;
interface Options {
  gender?: string;
  sizes?: string;
  offset?: number | string;
  limit?: number | string;
}

export const getProductsAction = async(options: Options): Promise<ProductsResponse> => {

    const { offset, limit, gender, sizes } = options;

    const { data }  = await tesloApi.get<ProductsResponse>('/products', { 
        params: {
            limit,
            offset,
            gender,
            sizes
        } 
    });
    
    const productsWithImageURL = data.products.map( product => ({
        ...product,
        images: product.images.map( image => `${ FILE_URL }/files/product/${ image }` )
    }))

    return {
        ...data,
        products: productsWithImageURL
    };
        
};