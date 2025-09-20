import { useQuery } from "@tanstack/react-query"
import { getProductsAction } from "../actions/get-products.action"
import { useParams, useSearchParams } from "react-router"


export const useProducts = () => {
  //Recoge los parámetros de la URL
  const {gender} = useParams();
  const [searchParams] = useSearchParams();
  const limit = searchParams.get('limit') || 9;
  const page = searchParams.get('page') || 1;
  const sizes = searchParams.get('sizes') || '';
  const price = searchParams.get('price') || '';
  const query = searchParams.get('query') || '';
  // Calculos para offset, query, [minPrice y maxPrice]
  const offset = (Number(page) - 1) * Number(limit);
  
  let minPrice = undefined;
  let maxPrice = undefined;
  switch (price) {
    case '0-50':
      minPrice = 0;
      maxPrice = 50;
      break;
    case '50-100':
      minPrice = 50;
      maxPrice = 100;
      break;
    case '100-200':
      minPrice = 100;
      maxPrice = 200;
      break;
    case '200+':
      minPrice = 200;
      maxPrice = undefined;
      break;  
  }


  
  // UTILIZAMOS TANSTACK QUERY
  return useQuery({
    queryKey: ['products', { limit, offset,  sizes, minPrice, maxPrice, query, gender}],
    queryFn: () => getProductsAction ({ 
      limit, 
      offset,
      gender,
      sizes,
      minPrice,
      maxPrice,
      query
    }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })  
  
}
