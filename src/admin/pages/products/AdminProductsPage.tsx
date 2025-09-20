import { Link, useSearchParams } from 'react-router';
import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { useProducts } from '@/shop/hooks';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { currencyFormatter } from '@/lib/currency-formatter';

export const AdminProductsPage = () => {
  const [searchParams] = useSearchParams();
  const queryPage = Number(searchParams.get('page')) || 1;
  
  const { data , error } = useProducts();

  if (error) {
    return <div>Error loading products</div>;
  }
  if (!data) {
    return <div>No products</div>;
  }


  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subtitle="Aquí puedes ver y administrar tus productos"
        />

        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon />
              Nuevo producto
            </Button>
          </Link>
        </div>
      </div>
    

      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { data.products.map((product, index) => (
            <TableRow key={product.id} >
              <TableCell>{(queryPage - 1) * Math.round(data.count/data.pages) + (index + 1)}</TableCell>
              <TableCell>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </TableCell>
              <TableCell>
                <Link to={`/admin/products/${product.id}`} className='hover:underline'>{product.title}</Link>
              </TableCell>
              <TableCell>{currencyFormatter(product.price)}</TableCell>
              <TableCell>{product.tags.join(", ")}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.sizes.join(", ")}</TableCell>
              <TableCell className="text-right">
                {/* <Link to={`t-shirt-teslo`}>Editar</Link> */}
                <Link to={`/admin/products/${product.id}`}>
                  <PencilIcon className='w-4 h-4 text-blue-500' />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CustomPagination totalPages={data.pages} />
    </>
  );
};
