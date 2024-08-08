import { Button } from "@nextui-org/react";
import ProgressBar from "../../../../components/progressBar/progressBar";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { UpdateSupplierContext } from "../../../../shared/reducers/registrationContext";
import SupplierService from "../../../supplier/supplier.service";
import UserDTO from "../dto/user.dto";
import { useNavigate } from "react-router-dom";
import { Slider } from "@nextui-org/slider";

interface ISalaryExpectationFormProps {
    userCreated: UserDTO | undefined
}

const SalaryExpectationForm = ({ userCreated }: ISalaryExpectationFormProps) => {
    const { supplierData, setSupplierData, updateField } = useContext(UpdateSupplierContext)!;
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    const formik = useFormik({
        initialValues: {
            salaryExpectation: undefined,
        },
        validate: (values) => { },
        onSubmit: async (values) => {            
            navigate('/success-tekko')
            setSupplierData(prevData => ({
                ...prevData,
                estimatedFee: values.salaryExpectation
            }));
            try {
                const supplierUpdated = await SupplierService.updateById(userCreated?.supplier!.id!, supplierData);
                if (supplierUpdated) {
                    navigate('/success')
                }
            } catch (error) {
                console.log("error updating")
            }
        },
    });


    const handleChange = (value: any) => {
        if (isNaN(Number(value))) return;
        setValue(value);
    };

    return (
        <div className="flex flex-col h-full gap-[32px] pb-[34px] h-full">
            <div className="flex flex-col gap-[12px]">
                <h1 className="text-heading text-white">¿Cuánto te gustaría ganar por mes
                utilizando Tekko?</h1>
                <ProgressBar stepNumber={7} />
            </div>
            <form  onSubmit={formik.handleSubmit} className="flex flex-col justify-between grow">
                <div className="flex flex-col gap-[4em] grow mb-[24px]">
                    <p className="text-caption text-white">Compartir tus expectativas nos ayudará a ofrecerte mejores oportunidades, bonificaciones y premios por alcanzar tus objetivos.</p>
                    <div>
                        <p className=" text-heading-1 text-center text-white mb-[2em]">$ {value}</p>
                        <Slider
                            size="sm"
                            step={0.01}
                            maxValue={2000000}
                            minValue={0}
                            defaultValue={0}
                            className="max-w-md"
                            classNames={{

                                thumb: "bg-gradient-progress-bar ",
                                filler: "bg-gradient-progress-bar"
                            }}

                            value={value}
                            onChange={handleChange}
                        />
                    </div>

                </div>
                <Button type="submit" className="button-primary w-full">
                    Siguiente
                </Button>
            </form>
        </div>
    );
};

export default SalaryExpectationForm;