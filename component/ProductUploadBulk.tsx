'use client';

import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import { useAppDispatch } from '@/redux/hooks';
import { fetchProducts } from '@/redux/slices/productSlice';
import { ProductParam } from '@/types/product/product.type';
import { getBaseUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { Form as BsForm, Button } from 'react-bootstrap';
import { useFieldArray, useForm } from 'react-hook-form';

interface Props {
  closeModal: () => void;
}

export default function ProductUploadBulk({ closeModal }: Props) {
  const {
    register,
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<{ products: ProductParam[] }>({
    defaultValues: {
      products: [{ name: '', description: '', price: 0, stock: 0, images: [] }],
    },
  });

  const dispatch = useAppDispatch();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const handleBulkSubmit = (data: { products: ProductParam[] }) => {
    const formData = new FormData();

    data.products.forEach((product, index) => {
      formData.append(`products[${index}].name`, product.name);
      formData.append(`products[${index}].description`, product.description);
      formData.append(`products[${index}].price`, String(product.price));
      formData.append(`products[${index}].stcok`, String(product.stock));

      if (product.images) {
        let filesArray: File[] = [];

        if (Array.isArray(product.images)) {
          filesArray = product.images;
        } else if (
          'length' in product.images &&
          typeof product.images !== 'string'
        ) {
          filesArray = Array.from(product.images as FileList);
        } else {
          filesArray = [product.images as File];
        }

        filesArray.forEach((file) =>
          formData.append(`products[${index}].images`, file),
        );
      }
    });

    axiosInstance
      .post(getBaseUrl('/products/bulk-uploads'), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        Toast({
          message: 'Products created successfully!',
          type: 'success',
          autoClose: 1500,
          theme: 'colored',
        });
        dispatch(fetchProducts());
        reset();
        closeModal();
      })
      .catch((err) => handleApiError(err, 'Failed to create products!'));
  };

  return (
    <form
      onSubmit={handleSubmit(handleBulkSubmit)}
      className="bg-white p-4 rounded border"
    >
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="mb-3 border p-3 rounded position-relative"
        >
          <h6>Product {index + 1}</h6>

          <BsForm.Group>
            <BsForm.Label>Name</BsForm.Label>
            <BsForm.Control
              type="text"
              placeholder="Enter name"
              {...register(`products.${index}.name`, { required: true })}
            />
            {errors.products?.[index]?.name && (
              <small className="text-danger">Required</small>
            )}
          </BsForm.Group>

          <BsForm.Group className="mt-2">
            <BsForm.Label>Description</BsForm.Label>
            <BsForm.Control
              type="text"
              placeholder="Enter description"
              {...register(`products.${index}.description`, { required: true })}
            />
            {errors.products?.[index]?.description && (
              <small className="text-danger">Required</small>
            )}
          </BsForm.Group>

          <BsForm.Group className="mt-2">
            <BsForm.Label>Price</BsForm.Label>
            <BsForm.Control
              type="number"
              placeholder="Enter price"
              {...register(`products.${index}.price`, {
                required: true,
                min: 1,
              })}
            />
            {errors.products?.[index]?.price && (
              <small className="text-danger">Must be greater than 0</small>
            )}
          </BsForm.Group>

          <BsForm.Group className="mt-2">
            <BsForm.Label>Stock</BsForm.Label>
            <BsForm.Control
              type="number"
              placeholder="Enter stock"
              {...register(`products.${index}.stock`, {
                required: true,
                min: 1,
              })}
            />
            {errors.products?.[index]?.stock && (
              <small className="text-danger">Must be greater than 0</small>
            )}
          </BsForm.Group>

          <BsForm.Group className="mt-2">
            <BsForm.Label>Images</BsForm.Label>
            <BsForm.Control
              type="file"
              multiple
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                const filesArray: File[] = target.files
                  ? Array.from(target.files)
                  : [];
                setValue(`products.${index}.images`, filesArray);
              }}
            />
          </BsForm.Group>

          <Button
            variant="danger"
            size="sm"
            className="position-absolute top-0 end-0"
            onClick={() => remove(index)}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button
        variant="secondary"
        onClick={() =>
          append({ name: '', description: '', price: 0, stock: 0, images: [] })
        }
      >
        Add Another Product
      </Button>

      <div className="d-flex justify-content-end gap-2 mt-3 py-2 border-top">
        <Button variant="danger" onClick={() => reset()}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save All
        </Button>
      </div>
    </form>
  );
}