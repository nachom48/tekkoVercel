import React, { createContext, useState, ReactNode } from 'react';
import { UpdateSupplierDTO } from '../../modules/supplier/dtos/update-supplier.dto';

interface UpdateSupplierContextProps {
  supplierData: UpdateSupplierDTO;
  setSupplierData: React.Dispatch<React.SetStateAction<UpdateSupplierDTO>>;
  updateField: (field: keyof UpdateSupplierDTO, value: any) => void;
}

export const UpdateSupplierContext = createContext<UpdateSupplierContextProps | undefined>(undefined);

interface UpdateSupplierProviderProps {
  children: ReactNode;
}

const UpdateSupplierProvider: React.FC<UpdateSupplierProviderProps> = ({ children }) => {
  const [supplierData, setSupplierData] = useState<UpdateSupplierDTO>({
    phone: '',
    gender: undefined,
    birthDate: '',
    address: [],
    backgroundUrl: undefined,
    selfDescription: '',
    services: undefined,
    estimatedFee: '',
    frontId: undefined,
    backId: undefined,
    zones: [],
    timeSheets: []
  });

  const updateField = (field: keyof UpdateSupplierDTO, value: any) => {
    setSupplierData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <UpdateSupplierContext.Provider value={{ supplierData, setSupplierData, updateField }}>
      {children}
    </UpdateSupplierContext.Provider>
  );
};

export default UpdateSupplierProvider;
