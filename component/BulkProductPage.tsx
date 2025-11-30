'use client';

import CustomButton from '@/common/Buttons/Button';
import CommonModal from '@/common/modals/CommonModal';
import { useState } from 'react';
import Create from './ProductUpload';
import MyTaskTable from './ProductTable';

export default function BulkProductPage() {
  const [modalShow, setModalShow] = useState<boolean>(false);

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div>
      <div className="card shadow-sm p-2 dark mb-2">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-semibold text-blue">Product Lists</h6>
          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-plus-lg"
            variant="outline-primary"
            onClick={() => setModalShow(true)}
            tooltip="Add New Product"
          />
        </div>
        {modalShow && (
          <CommonModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            title="Upload Product"
            size="xl"
            footer={false}
            fullscreen="xl-down"
          >
            <Create closeModal={() => closeModal()} />
          </CommonModal>
        )}
      </div>
      <MyTaskTable />
    </div>
  );
}
