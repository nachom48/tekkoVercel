import { Button, Switch, cn } from "@nextui-org/react";
import { Link } from "react-router-dom";
import CustomInputFormik from "../../../../components/customInputFormik/CustomInputFormik";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { useFormik } from "formik";
import { validateInput } from "../../../../utils/formValidations";
import ProgressBar from "../../../../components/progressBar/progressBar";
import CustomSelectFormik from "../../../../components/customSelectFormic/customSelectFormik";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import UserService from "../user.service";
import { CreateUserDTO } from "../create-user.dto";
import Gender from "../../../supplier/enums/gender.enum";
import UserDTO from "../dto/user.dto";
import { CreateSupplierDTO } from "../../../supplier/dtos/create-supplier.dto";
import CustomButton from "../../../../components/customButton/customButton";

interface PersonalDataFormI {
    isTekko: boolean;
    updateStepNumber: () => void;
    newCreateuserDTo: CreateUserDTO;
    setUserCreated: React.Dispatch<React.SetStateAction<UserDTO | undefined>>
};

interface PersonalDataFormUserI {
    firstName: string,
    lastName: string,
    birthDate?: string | null,
    gender?: Gender,
    prefix?: string,
    phone?: string,
    email: string,
    password: string,
    confirmPassword: string,
    acceptTerms: boolean
}

const PersonalDataForm: React.FC<PersonalDataFormI> = ({ newCreateuserDTo, isTekko, updateStepNumber, setUserCreated }) => {

    const listGenders = [
        { key: Gender.FEMALE, label: 'Femenino' },
        { key: Gender.MALE, label: 'Masculino' },
        { key: Gender.OTHER, label: 'Sin género' }
    ];

    const setInitialValuesFormik = (): PersonalDataFormUserI => {
        const valuesFormik: PersonalDataFormUserI = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false
        };

        if (isTekko) {
            valuesFormik.birthDate = null || undefined;
            valuesFormik.gender = Gender.OTHER || undefined;
            valuesFormik.prefix = '';
            valuesFormik.phone = '';
        }

        return valuesFormik;
    };

    function parseDate(dateString: string) {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    }

    const formik = useFormik({
        initialValues: setInitialValuesFormik(),
        // validate: (values) => { },
        onSubmit: async (values) => {
            try {
                if (formik.values.acceptTerms) {
                    if(isTekko){
                        const newSupplierDto = new CreateSupplierDTO();
                        newSupplierDto.gender = 'm' as string;
                        newSupplierDto.birthDate = parseDate(formik.values.birthDate!);
                        newSupplierDto.phone = formik.values.prefix! + formik.values.phone!;
                        newCreateuserDTo.supplier = newSupplierDto;
                    }
                    newCreateuserDTo.email = formik.values.email;
                    newCreateuserDTo.firstName = formik.values.firstName;
                    newCreateuserDTo.lastName = formik.values.lastName;
                    newCreateuserDTo.password = formik.values.password;
                    // const userCreated = await UserService.createUser(newCreateuserDTo)
                        setUserCreated(newCreateuserDTo as UserDTO)
                        updateStepNumber()
                }
            } catch (error) {
                console.log("entro aca xq hay error", error)
            }
        },
    });

    return (
        <div className="flex flex-col h-full gap-[12px]">
            <h1 className="text-heading-m text-white">{isTekko ? 'Formulario de registro' : 'Comencemos con tus datos'}</h1>

            {isTekko
                ? <ProgressBar stepNumber={1} />
                : null
            }

            <form onSubmit={formik.handleSubmit} className="flex flex-col justify-between grow">
                <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-col gap-[12px]">
                        <div className="flex gap-[8px]">
                            <CustomInputFormik formik={formik}
                                iconType={faUser}
                                inputName='firstName'
                                inputType='text'
                                placeholder='Nombre' />
                            <CustomInputFormik formik={formik}
                                iconType={faUser}
                                inputName='lastName'
                                inputType='text'
                                placeholder='Apellido' />
                        </div>

                        {isTekko
                            ?
                            <div className="w-full flex flex-col gap-[12px] justify-between grow">
                                <div className="flex gap-[8px]">
                                    <CustomInputFormik formik={formik}
                                        iconType={null}
                                        inputName='birthDate'
                                        inputType='text'
                                        placeholder='Fecha de nacimiento' />
                                    <CustomSelectFormik
                                        data={listGenders}
                                        formik={formik}
                                        inputName='gender'
                                        placeholder='Género'
                                    />
                                </div>
                                <div className="flex gap-[8px] w-full">
                                    <div className="flex gap-[8px] w-full">
                                        <div className="font-raleway font-normal text-font-size-12 leading-line-height-18 flex justify-center items-center rounded-[12px] w-[40%] h-12 bg-brownishGrey text-white">
                                            +54 9
                                        </div>
                                        <CustomInputFormik formik={formik}
                                            iconType={null}
                                            inputName='prefix'
                                            inputType='text'
                                            placeholder='Prefijo' />
                                    </div>
                                    <div className="flex gap-[8px] w-full">
                                        <div className="font-raleway font-normal text-font-size-12 leading-line-height-18 flex justify-center items-center rounded-[12px] w-[40%] h-12 bg-brownishGrey text-white">
                                            15
                                        </div>
                                        <CustomInputFormik formik={formik}
                                            iconType={null}
                                            inputName='phone'
                                            inputType='text'
                                            placeholder='Celular' />
                                    </div>
                                </div>
                            </div>
                            : null
                        }
                        <CustomInputFormik formik={formik}
                            iconType={faEnvelope}
                            inputName='email'
                            inputType='text'
                            placeholder='Email' />
                        <CustomInputFormik formik={formik}
                            iconType={faLock}
                            inputName='password'
                            inputType='password'
                            placeholder='Contraseña' />
                        <CustomInputFormik formik={formik}
                            iconType={faLock}
                            inputName='confirmPassword'
                            inputType='password'
                            placeholder='Contraseña' />

                    </div>

                    <Switch
                        isSelected={formik.values.acceptTerms}
                        onChange={() => formik.setFieldValue('acceptTerms', !formik.values.acceptTerms)}
                        color="default"
                        classNames={{
                            label: 'text-link', 
                            wrapper: [
                                'text-white',
                                'shadow-1',
                                'bg-gradient-btn-secondary-2', 
                                "group-data-[selected=true]:bg-gradient-btn-primary",
                            ], 
                            thumb: [
                                'shadow-1',
                                "bg-light-medium-grey", 
                                "group-data-[selected=true]:bg-light-grey",
                            ]
                        }}
                    >
                        Acepto los Términos y Condiciones
                    </Switch>
                </div>

                <div className="flex flex-col mt-[24px]">
                    <CustomButton formik={formik} label="Siguiente" />
                    <div className='flex justify-center items-center mt-[24px] mb-[50px]'>
                        <p className='text-body text-white'>¿Ya tienes cuenta? <Link to="/login" className='text-lemonYellow underline decoration-lemonYellow cursor-pointer'>Ingresa aquí</Link></p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PersonalDataForm;
