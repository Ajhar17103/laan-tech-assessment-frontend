export interface ProductFileDto {
  id: string;
  fileName: string;
  originalFileName: string;
  size: string;
  filePath: string;
}

export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  files: ProductFileDto[];
}

export interface ProductParam {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock:number;
  images?: File[];
}

export interface ProductUpdateProps {
  schema?: any;
  itemUpdate?: ProductDto;
  closeModal: () => void;
  setActiveTab?: any;
}
