'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import { useAppDispatch } from '@/redux/hooks';
import { fetchProducts } from '@/redux/slices/productSlice';
import { ProductParam } from '@/types/product/product.type';
import { getBaseUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { formSchema as baseSchema } from './ProductSchema';

interface Props {
  closeModal: () => void;
}

export default function ProductUploadSingle({ closeModal }: Props) {
  const {
    register,
    control,
    resetField,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductParam>();
  const dispatch = useAppDispatch();

  const handleFormSubmit = (data: ProductParam) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('stock', String(data.stock));
    formData.append('price', String(data.price));

    if (data.images) {
      let filesArray: File[] = [];

      if (Array.isArray(data.images)) {
        filesArray = data.images;
      } else if ('length' in data.images && typeof data.images !== 'string') {
        filesArray = Array.from(data.images as FileList);
      } else {
        filesArray = [data.images as File];
      }

      filesArray.forEach((file) => formData.append('images', file));
    }

    axiosInstance
      .post(getBaseUrl('/products'), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        Toast({
          message: 'Product created successfully!',
          type: 'success',
          autoClose: 1500,
          theme: 'colored',
        });
        dispatch(fetchProducts());
        reset();
        closeModal();
      })
      .catch((err) => handleApiError(err, 'Failed to create product!'));
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-4 rounded border"
    >
      <Form
        schema={baseSchema}
        register={register}
        control={control}
        errors={errors}
        resetField={resetField}
      />
      <div className="d-flex justify-content-end gap-2 mt-3 py-2 border-top">
        <Button variant="danger" onClick={() => reset()}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
