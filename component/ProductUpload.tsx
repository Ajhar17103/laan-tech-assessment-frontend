'use client';

import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import ProductUploadBulk from './ProductUploadBulk';
import ProductUploadSingle from './ProductUploadSingle';

interface Props {
  closeModal: () => void;
}

export default function ProductUpload({ closeModal }: Props) {
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');

  return (
    <Tabs
      activeKey={activeTab}
      onSelect={(k) => setActiveTab(k as 'single' | 'bulk')}
      className="mb-3"
    >
      <Tab eventKey="single" title="Single Product">
        <ProductUploadSingle closeModal={closeModal} />
      </Tab>
      <Tab eventKey="bulk" title="Bulk Product">
        <ProductUploadBulk closeModal={closeModal} />
      </Tab>
    </Tabs>
  );
}
