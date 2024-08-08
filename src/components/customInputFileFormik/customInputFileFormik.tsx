import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCircleXmark, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '@nextui-org/react';
import React, { ChangeEvent, useState } from 'react';

interface ICustomInputFormikProps {
  formik: any;
  iconType: IconProp | null;
  inputName: string;
  inputType: string;
  placeholder: string;
  onKeyPress?: (e: any) => void;
  fileOnParent: File | undefined;
  setFileOnParent: React.Dispatch<React.SetStateAction<File | undefined>>
}

const CustomInputFileFormik = ({ fileOnParent,setFileOnParent, formik, iconType, inputName, inputType, placeholder, onKeyPress }: ICustomInputFormikProps) => {


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileOnParent(event.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFileOnParent(undefined);
  };

  const handleClick = () => {
    if (fileOnParent) {
      handleRemoveFile();
    }
  };

  const setStyle = (): string => {
    const classInput = fileOnParent ? 'bg-gradient-input-file-filled border-[#F5F3B5]' : 'bg-gradient-input-file border-[#645E5A]';
    return classInput; 
  };
  
  console.log("esto tengo guardado en el archivo",fileOnParent)

  return (
    <div className={`flex flex-col items-center h-[130px] justify-center p-4 border border-[1px] rounded-[12px] bg-bg-gradient-container-tekko ${setStyle()}`}>
      <label className="flex flex-col items-center cursor-pointer w-full">
        <input
          type="file"
          className="hidden"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
        <div className="flex items-center gap-[8px]"
          onClick={handleClick}>
          {
            fileOnParent
              ? (
                <>
                  <FontAwesomeIcon icon={faCircleXmark} className='text-white' />
                  <span className="text-capt ion text-white">Elimininar foto</span>
                </>
              )
              : (
                <>
                  <FontAwesomeIcon icon={faSquarePlus} className='text-white' />
                  <span className="text-capt ion text-white">Agregar foto del frente</span>
                </>
              )
          }
        </div>
      </label>
      {!fileOnParent && <p className="text-raleway text-[10px] text-[#9F9C9A]">Los archivos deben ser .jpg, .png o pdf.</p>}
    </div>
  );
};

export default CustomInputFileFormik;
