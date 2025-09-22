import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions/get-product-byid.action";
import { createUpdateProductAction } from "../actions/create-update-product.action";
import type { Product } from "@/interfaces";


////////////////////////////////////
//GESTOR (DE ESTADO) DE PRODUCTOS
////////////////////////////////////
export const useProduct = (id:string) => {

  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id,  // Solo ejecutar la consulta si id tiene un valor
  });

  //MUTATION para crear/actualizar producto
  const mutation  = useMutation({
    // mutationKey: ['create-update-product'],
    mutationFn:  createUpdateProductAction, //(productLike: Partial<Product>) => createUpdateProductAction(productLike),
    onSuccess: (product: Product) => {
      // Invalidar cache
      queryClient.invalidateQueries({ queryKey: ['products'] });
      // Actualizar el queryData
      queryClient.setQueryData(['product', { id: product.id }], product);
    },
    // onError: (error) => {
    //   console.error('Error al crear/actualizar el producto:', error);
    // }
  });


  //TODO: ELIMINAR PRODUCTO
  const handleDeleteProduct = async () => {
    // Lógica para eliminar el producto
  };

  return {
    ...query,
    
    mutation,
    handleDeleteProduct
  };
}
