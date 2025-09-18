import { tesloApi } from "@/api/tesloApi";
import type { ProductsResponse } from "@/interfaces";

export const getProductsAction = async() : Promise<ProductsResponse> => {

    const { data }  = await tesloApi.get<ProductsResponse>('/products');

    return data;

};