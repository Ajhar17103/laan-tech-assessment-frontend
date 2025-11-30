'use client';

import { ProductDto, ProductUpdateProps } from '@/types/product/product.type';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { useForm } from 'react-hook-form';

export default function ProductView({
  schema,
  itemUpdate,
  closeModal,
}: ProductUpdateProps) {
  const {
    register,
    formState: { errors },
  } = useForm<ProductDto>({
    defaultValues: getDefaultValues<ProductDto>(itemUpdate),
  });

  return (
    <div className="bg-white rounded-bottom row g-3 p-3">
      <div className="mb-2 col-6">
        <label className="form-label fw-medium">Name</label>
        <input
          type="text"
          className="form-control"
          {...register('name')}
          readOnly
        />
      </div>

      <div className="mb-2 col-6">
        <label className="form-label fw-medium">Price</label>
        <input
          type="number"
          className="form-control"
          {...register('price')}
          readOnly
        />
      </div>

      <div className="mb-2 col-6">
        <label className="form-label fw-medium">Stock</label>
        <input
          type="number"
          className="form-control"
          {...register('stock')}
          readOnly
        />
      </div>

      <div className="mb-2 col-12">
        <label className="form-label fw-medium">Description</label>
        <textarea
          className="form-control"
          {...register('description')}
          readOnly
          rows={3}
        />
      </div>

      <div className="mb-2 col-12">
        <label className="form-label fw-medium">Images</label>
        <div className="d-flex flex-wrap gap-2">
          {itemUpdate?.files?.length ? (
            itemUpdate.files.map((file) => (
              <img
                key={file.id}
                src={`http://localhost:16001${file.filePath}`}
                alt={file.originalFileName}
                className="img-thumbnail p-1"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            ))
          ) : (
            <p className="text-muted">No images available</p>
          )}
        </div>
      </div>
    </div>
  );
}
