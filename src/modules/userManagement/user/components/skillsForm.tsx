import React, { ChangeEvent, useContext, useState } from 'react';
import ProgressBar from "../../../../components/progressBar/progressBar";
import CustomSelectFormik from "../../../../components/customSelectFormic/customSelectFormik";
import { useFormik } from "formik";
import CustomInputFileFormik from "../../../../components/customInputFileFormik/customInputFileFormik";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Card, Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UpdateSupplierContext } from '../../../../shared/reducers/registrationContext';
import { CreateServiceDto } from '../../../service/dto/create-service.dto';
import CreateAttachDTO from '../../../attach/createAttach.dto';
import { convertFileToBase64 } from '../../../../utils/commongFunctions';
import CustomChipFormik from '../../../../components/customChipFormik/customChipFormik';
import { faCircleXmark, faSquarePlus } from '@fortawesome/free-regular-svg-icons';


export enum ServiceType {
    PLUMBING = 'plumbing',
    LOCKSMITH = 'locksmith',
    ELECTRICAL = 'electrical',
    CARPENTRY = 'carpentry',
    PAINTING = 'painting',
}

const serviceOptions = [
    { id: ServiceType.PLUMBING, name: 'Plumbing' },
    { id: ServiceType.LOCKSMITH, name: 'Locksmith' },
    { id: ServiceType.ELECTRICAL, name: 'Electrical' },
    { id: ServiceType.CARPENTRY, name: 'Carpentry' },
    { id: ServiceType.PAINTING, name: 'Painting' }
];

interface ISkillFormProps {
    updateStepNumber?: () => void;
}


const SkillsForm = ({ updateStepNumber }: ISkillFormProps) => {
    const { supplierData, setSupplierData, updateField } = useContext(UpdateSupplierContext)!;

    const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleServiceSelection = (serviceId: ServiceType) => {
        setSelectedServices(prevSelected => {
            if (prevSelected.includes(serviceId)) {
                return prevSelected.filter(id => id !== serviceId);
            } else {
                return [...prevSelected, serviceId];
            }
        });
    };


    const handleContinue = async () => {
        if (selectedServices.length > 1) {
            const servicesImagesArray: CreateAttachDTO[] = []
            const services = new CreateServiceDto();
            for (let index = 0; index < selectedFiles.length; index++) {
                const element = selectedFiles[index];
                const frontFileToSave: CreateAttachDTO = {
                    file: await convertFileToBase64(element),
                    fileName: element.name,
                };
                servicesImagesArray.push(frontFileToSave);
            }
            services.attachImages = servicesImagesArray;
            services.types = selectedServices;
            setSupplierData(prevData => ({
                ...prevData,
                services
            }));
        };
        updateStepNumber && updateStepNumber()
    }

    const handleCloseChip = (service: string) => {
        setSelectedServices(prevSelected => {
            const newSelectedServices = prevSelected.filter(selected => selected !== service)
            return newSelectedServices;
        });
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFiles(prevSelected => {
                const isSelected = prevSelected.some(selected => selected.name === files[0].name);
                const newSelectedFiles = isSelected
                    ? prevSelected.filter(selected => selected.name !== files[0].name)
                    : [...prevSelected, files[0]];
                updateField('zones', newSelectedFiles);
                return newSelectedFiles;
            });
            console.log(files[0]); // Mostrar el primer archivo seleccionado
        } else {
            console.log('No file selected');
        }
    };


    return (
        <div className="flex flex-col h-full gap-[32px] pb-[34px] h-full">
            <div className="flex flex-col gap-[12px]">
                <h1 className="text-heading text-white">¡Cuéntanos en que sos experto! Nos gustaria saber sobre tus servicios.</h1>
                <ProgressBar stepNumber={5} />
            </div>
            <div className="flex flex-col justify-between grow w-full">
                <div className='w-full grow'>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                className='w-full flex justify-start bg-[#E4E7E9] h-[56px]'
                                variant="bordered"
                                startContent={<FontAwesomeIcon icon={faMapPin} />}
                            >
                                ¿Qué servicios ofreces?
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Dynamic Actions"
                            selectionMode="multiple"
                            selectedKeys={selectedServices}
                        >
                            {serviceOptions.map((service) => (
                                <DropdownItem
                                    key={service.id}
                                    onClick={() => handleServiceSelection(service.id)}
                                    color={selectedServices.includes(service.id) ? 'primary' : 'default'}
                                >
                                    {service.name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <div className='flex gap-[8px] mt-[14px] overflow-hidden'>
                        {selectedServices.map(service => {
                            return (
                                <CustomChipFormik label={service} key={service} id={service} handleClose={handleCloseChip} />
                            )
                        })}
                    </div>
                </div>
                <div className="flex flex-col justify-between grow mb-[24px]">
                    <div className="flex flex-col gap-[12px]">
                        <h2 className="text-subheading text-white">Puedes adjuntar los domumentos de matriculación aquí.</h2>
                        <div className={`flex flex-col items-center h-[130px] justify-center p-4 border border-[1px] rounded-[12px] bg-gradient-container-tekko`}>
                            <label className="flex flex-col items-center cursor-pointer w-full">
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/png, image/jpeg"
                                    onChange={handleOnChange}
                                />
                                <div className="flex items-center gap-[8px]">
                                    <FontAwesomeIcon icon={faSquarePlus} className='text-white' />
                                    <span className="text-caption text-white">Agregar documentos</span>
                                </div>
                            </label>
                            <p className="text-raleway text-[10px] text-[#9F9C9A]">Los archivos deben ser .jpg, .png o pdf.</p>
                        </div>
                        <div className='flex gap-[12px]'>
                            {selectedFiles.map(files => {
                                return (
                                    <div key={files.name} className='flex gap-[8px] items-center text-[#E4E7E9] text-caption'>
                                        <p key={files.name}>{files.name}</p>
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Button onClick={handleContinue} className="button-primary w-full mt-4">
                Siguiente
            </Button>
        </div>
    );
};

export default SkillsForm
