import { useQuery } from "@tanstack/react-query"
import { getProductsAction } from "../actions/get-products.action"
import { useParams, useSearchParams } from "react-router"


export const useProducts = () => {
  const {gender} = useParams();
  
  const [searchParams] = useSearchParams();
  const limit = searchParams.get('limit') || 9;
  const page = searchParams.get('page') || 1;
  const sizes = searchParams.get('sizes') || '';

  const offset = (Number(page) - 1) * Number(limit);

  // UTILIZAMOS TANSTACK QUERY
  return useQuery({
    queryKey: ['products', { limit, offset, gender, sizes }],
    queryFn: () => getProductsAction({ 
      limit, 
      offset,
      gender,
      sizes
    }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
  
}
