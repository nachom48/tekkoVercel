import { Button, Input } from "@nextui-org/react";
import CustomSelectFormik from "../../../../components/customSelectFormic/customSelectFormik";
import { useFormik } from "formik";
import CustomInputFormik from "../../../../components/customInputFormik/CustomInputFormik";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import UserDTO from "../dto/user.dto";
import UpdateUserDTO from "../dto/update-user.dto";
import { useNavigate } from "react-router-dom";

interface ILocationFormProps{
    userCreated: UserDTO | undefined
}

const LocationForm = ({userCreated}:ILocationFormProps) => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {

        },
        validate: (values) => { },
        onSubmit: (values) => { 
            navigate('/success-user');
            const updateUserDto = new UpdateUserDTO();
                  },
    });

    return (
        <div className='flex flex-col justify-between h-full pb-[34px]'>
            <div className="flex flex-col h-full gap-[24px]">
                <h1 className="text-heading text-white">¿Dónde precisas el servicio?</h1>
                <form onSubmit={formik.handleSubmit} className="flex flex-col justify-between grow">
                    <div  className="flex flex-col grow gap-[8px]">
                        <CustomInputFormik formik={formik}
                            iconType={faMapPin}
                            inputName='street'
                            inputType='text'
                            placeholder='Calle / Altura' />
                        <div className="flex gap-[8px]">
                            <CustomInputFormik formik={formik}
                                iconType={faMapPin}
                                inputName='province'
                                inputType='text'
                                placeholder='Provincia' />
                            <CustomInputFormik formik={formik}
                                iconType={faMapPin}
                                inputName='locality'
                                inputType='text'
                                placeholder='Municipio' />
                        </div>
                        <div className="flex gap-[8px]">
                            <CustomInputFormik formik={formik}
                                iconType={null}
                                inputName='floor'
                                inputType='text'
                                placeholder='Piso/Dpto/Casa' />
                            <CustomInputFormik formik={formik}
                                iconType={null}
                                inputName='postalCode'
                                inputType='text'
                                placeholder='Código Postal' />
                        </div>
                        <CustomInputFormik formik={formik}
                                iconType={null}
                                inputName='observations'
                                inputType='textarea'
                                placeholder='Observaciones' />
                    </div>

                    <Button type="submit" className="button-primary w-full">
                        Finalizar
                    </Button>
                </form>
                <div>

                </div>
            </div>
        </div >
    );
};

export default LocationForm;
