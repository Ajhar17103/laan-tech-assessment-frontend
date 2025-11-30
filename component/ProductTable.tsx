'use client';

import Loadgin from '@/common/Loader/Loading';
import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProducts } from '@/redux/slices/productSlice';
import { ProductDto } from '@/types/product/product.type';
import { useEffect, useState } from 'react';
import { formViewSchema, tableSchema } from './ProductSchema';
import ProudctView from './ProudctView';

export default function ProductTable() {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.product);
  const [tableData, setTableData] = useState<ProductDto[]>([]);
  const [modalViewShow, setModalViewShow] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<ProductDto>({
    id: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    files: [],
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const transformed: ProductDto[] = products?.map((p: any) => ({
      id: p?.id,
      name: p?.name,
      description: p?.description,
      price: p?.price,
      stock: p?.stock,
      files: p?.files,
    }));
    setTableData(transformed);
  }, [products]);

  const onView = (item: ProductDto) => {
    setItemUpdate({ ...item });
    setModalViewShow(true); // removed unnecessary setTimeout
  };

  const closeViewModal = () => setModalViewShow(false);

  if (loading) return <Loadgin />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="card shadow-sm p-3 dark">
      <DynamicTable
        data={tableData}
        columns={tableSchema}
        action={true}
        pagination={true}
        rowsPerPage={5}
        onView={onView}
      />
      {modalViewShow && (
        <CommonModal
          show={modalViewShow}
          onHide={closeViewModal}
          title="Product Details"
          size="xl"
          footer={false}
          fullscreen="xl-down"
        >
          <ProudctView
            schema={formViewSchema}
            itemUpdate={itemUpdate}
            closeModal={closeViewModal}
          />
        </CommonModal>
      )}
    </div>
  );
}
