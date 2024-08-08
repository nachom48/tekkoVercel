import { Button, Checkbox } from "@nextui-org/react";
import CustomInputFormik from "../../../../components/customInputFormik/CustomInputFormik";
import ProgressBar from "../../../../components/progressBar/progressBar";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { UpdateSupplierContext } from "../../../../shared/reducers/registrationContext";
import CreateTimeSheetDTO from "../../../timeSheet/dto/create-timeSheet.dto";

interface IAboutTekkoProps {
    updateStepNumber: () => void
}

const AboutTekkoForm = ({ updateStepNumber }: IAboutTekkoProps) => {
    const { supplierData, setSupplierData, updateField } = useContext(UpdateSupplierContext)!;
    const [timeSheets, setTimeSheets] = useState<CreateTimeSheetDTO[]>();
    const [isSelected, setIsSelected] = useState(false);
    const [isSelected2, setIsSelected2] = useState(false);
    const [isSelected3, setIsSelected3] = useState(false);
    const [isSelected4, setIsSelected4] = useState(false);
    const [isSelected5, setIsSelected5] = useState(false);
    const [isSelected6, setIsSelected6] = useState(false);
    const [isSelected7, setIsSelected7] = useState(false);
    const [isSelected8, setIsSelected8] = useState(false);

    const days = [
        'Lunes', 'Sábado', 'Martes', 'Domingo', 'Miércoles', 'Feriado', 'Jueves', 'Feriado',
    ]

    const formik = useFormik({
        initialValues: {
            selfDescription: '',
        },
        validate: (values) => { },
        onSubmit: (values) => {
            console.log('hola')
            updateStepNumber && updateStepNumber()
            setSupplierData(prevData => ({
                ...prevData,
                selfDescription: values.selfDescription,
                timeSheets
            }));
        },
    });




    return (
        <div className="flex flex-col h-full gap-[32px] pb-[34px] h-full">
            <div className="flex flex-col gap-[12px]">
                <h1 className="text-heading text-white">¡Cuéntale a tus clientes un poco sobre vos!</h1>
                <ProgressBar stepNumber={6} />
            </div>
            <form onSubmit={formik.handleSubmit}  className="flex flex-col justify-between grow">
                <div className="flex flex-col gap-[4em] grow mb-[24px]">
                    <CustomInputFormik formik={formik}
                        iconType={null}
                        inputName='selfDescription'
                        inputType='textarea'
                        placeholder='Descripción' />
                    <div className="flex flex-col gap-[24px]">
                        <h2 className="text-subheading text-white">¿Qué días prestas servicios?</h2>
                        <div className="w-full flex">
                            <div className="w-full flex">
                                <div className="w-full flex flex-col gap-[24px]">
                                    <div>
                                        <Checkbox
                                            isSelected={isSelected} onValueChange={setIsSelected} classNames={{
                                                icon: "radius-[50px] border",
                                                label: "text-subheading text-white"

                                            }}>Lunes
                                        </Checkbox>
                                        <p className={`${isSelected ? "flex" : "hidden"} text-default-500`}>
                                            Horario
                                        </p>
                                    </div>
                                    <div>
                                        <Checkbox
                                            isSelected={isSelected2} onValueChange={setIsSelected2} classNames={{
                                                icon: "radius-[50px] border",
                                                label: "text-subheading text-white"

                                            }}>Martes
                                        </Checkbox>
                                        <p className={`${isSelected2 ? "flex" : "hidden"} text-default-500`}>
                                            Horario
                                        </p>
                                    </div>
                                    <div>
                                        <Checkbox
                                            isSelected={isSelected3} onValueChange={setIsSelected3} classNames={{
                                                icon: "radius-[50px] border",
                                                label: "text-subheading text-white"

                                            }}>Miércoles
                                        </Checkbox>
                                        <p className={`${isSelected3 ? "flex" : "hidden"} text-default-500`}>
                                            Horario
                                        </p>
                                    </div>
                                    <div>
                                        <Checkbox
                                            isSelected={isSelected4} onValueChange={setIsSelected4} classNames={{
                                                icon: "radius-[50px] border",
                                                label: "text-subheading text-white"

                                            }}>Jueves
                                        </Checkbox>
                                        <p className={`${isSelected4 ? "flex" : "hidden"} text-default-500`}>
                                            Horario
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex">
                                <div className="w-full flex flex-col gap-[24px]">
                                    <div>
                                        <Checkbox
                                            isSelected={isSelected5} onValueChange={setIsSelected5} classNames={{
                                                icon: "radius-[50px] border",
                                                label: "text-subheading text-white"

                                            }}>Viernes
                                        </Checkbox>
                                        <p className={`${isSelected5 ? "flex" : "hidden"} text-default-500`}>
                                            Horario
                                        </p>
                                    </div>
                                    <div>
                                        <Checkbox
                                            isSelected={isSelected6} onValueChange={setIsSelected6} classNames={{
                                                icon: "radius-[50px] border",
                                                label: "text-subheading text-white"

                                            }}>Sábado
                                        </Checkbox>
                                        <p className={`${isSelected6 ? "flex" : "hidden"} text-default-500`}>
                                            Horario
                                        </p>
                                    </div>
                                    <div>
                                        <Checkbox
                                            isSelected={isSelected7} onValueChange={setIsSelected7} classNames={{
                                                icon: "radius-[50px] border",
                                                label: "text-subheading text-white"

                                            }}>Domingo
                                        </Checkbox>
                                        <p className={`${isSelected7 ? "flex" : "hidden"} text-default-500`}>
                                            hola
                                        </p>
                                    </div>
                                    <div>
                                        <Checkbox
                                            isSelected={isSelected8} onValueChange={setIsSelected8} classNames={{
                                                icon: "radius-[50px] border",
                                                label: "text-subheading text-white"

                                            }}>Feriado
                                        </Checkbox>
                                        <p className={`${isSelected8 ? "flex" : "hidden"} text-default-500`}>
                                            Horario
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button type='submit' className="button-primary w-full">
                    Siguiente
                </Button>
            </form>
        </div>
    );
};

export default AboutTekkoForm;
