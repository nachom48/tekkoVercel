import { Button } from "@nextui-org/react";
import ProgressBar from "../../../../components/progressBar/progressBar";
import CustomInputFileFormik from "../../../../components/customInputFileFormik/customInputFileFormik";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import CreateAttachDTO from "../../../attach/createAttach.dto";
import { convertFileToBase64 } from "../../../../utils/commongFunctions";
import { UpdateSupplierContext } from "../../../../shared/reducers/registrationContext";

interface IDocumentationFormProps {
    updateStepNumber?: () => void;
}

const DocumentationForm = ({ updateStepNumber }: IDocumentationFormProps) => {
    const { supplierData, setSupplierData, updateField } = useContext(UpdateSupplierContext)!;

    const [frontFile, setFrontFile] = useState<File>();
    const [backFile, setBackFile] = useState<File>();

    const formik = useFormik({
        initialValues: {
            frontFile,
            backFile,
        },
        validate: (values) => { },
        onSubmit: async (values) => {
            if (frontFile && backFile) {
                const frontFileToSave: CreateAttachDTO = {
                    file: await convertFileToBase64(frontFile),
                    fileName: frontFile.name,
                };
                const backFileToSave: CreateAttachDTO = {
                    file: await convertFileToBase64(backFile),
                    fileName: backFile.name,
                };

                setSupplierData(prevData => ({
                    ...prevData,
                    frontId: frontFileToSave,
                    backId: backFileToSave
                }));

                updateStepNumber && updateStepNumber();
            }
        },
    });

    return (
        <div className="flex flex-col h-full gap-[32px] pb-[34px] h-full">
            <div className="flex flex-col gap-[12px]">
                <h1 className="text-heading text-white">Algunos datos por tu seguridad</h1>
                <ProgressBar stepNumber={4}/>
            </div>
            <div className="flex flex-col gap-[4px]">
                <h2 className="text-subheading text-white">Adjunta una foto del frente y dorso de tu DNI</h2>
                <p className="text-caption text-white">Posiciona tu cámara de manera horizontal, procura tener un fondo claro y buena iluminación.</p>
            </div>
            <form className="flex flex-col justify-between grow" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col grow gap-[16px] mb-[24px]">
                    <CustomInputFileFormik
                        formik={formik}
                        iconType={null}
                        inputName='frontFile'
                        inputType='file'
                        fileOnParent={frontFile}
                        setFileOnParent={setFrontFile}
                        placeholder='Frente DNI'
                    />
                    <CustomInputFileFormik
                        formik={formik}
                        iconType={null}
                        inputName='backFile'
                        inputType='file'
                        fileOnParent={backFile}
                        setFileOnParent={setBackFile}
                        placeholder='Dorso DNI'
                    />
                </div>
                <Button type="submit" className="button-primary w-full">
                    Siguiente
                </Button>
            </form>
        </div>
    );
};

export default DocumentationForm;
