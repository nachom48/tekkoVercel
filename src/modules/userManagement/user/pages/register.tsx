import React, { useContext, useState } from 'react';
import EmailVerificationForm from "../components/emailVerificationForm";
import LocationForm from "../components/locationForm";
import PersonalDataForm from "../components/personaDataForm";
import DocumentationForm from "../components/documentationForm";
import SkillsForm from "../components/skillsForm";
import AboutTekkoForm from "../components/aboutTekkoForm";
import SalaryExpectationForm from "../components/salaryExpectationForm";
import LocationTekkoForm from "../components/locationTekkoForm";
import { CreateUserDTO } from "../create-user.dto";
import UserDTO from "../dto/user.dto";
import { UpdateSupplierContext } from '../../../../shared/reducers/registrationContext';

interface RegisterProps {
    user: string
}

const Register: React.FC<RegisterProps> = ({ user }) => {

    const [userCreated, setUserCreated] = useState<UserDTO>();
    const context = useContext(UpdateSupplierContext);

    if (!context) {
        throw new Error("UpdateSupplierContext debe ser utilizado dentro de un UpdateSupplierProvider");
    }

    const { supplierData, setSupplierData } = context;

    const newCreateuserDTo = new CreateUserDTO();
    const isTekko: boolean = user === 'tekko';

    let [stepNumber, setStepNumber] = useState(0);

    const updateStepNumber = () => {
        setStepNumber(prevCounter => prevCounter + 1);
        console.log(stepNumber)
    };

    const setStepperByUser = () => {
        const STEPS_ORDER: Record<number, JSX.Element> = {
            0: <PersonalDataForm
                setUserCreated={setUserCreated}
                newCreateuserDTo={newCreateuserDTo}
                isTekko={isTekko}
                updateStepNumber={updateStepNumber}
            />,
            1: <EmailVerificationForm
                userCreated={userCreated}
                isTekko={isTekko}
                updateStepNumber={updateStepNumber}
            />,
            2: isTekko ? <LocationTekkoForm
                setUserCreated={setUserCreated}
                userCreated={userCreated}
                updateStepNumber={updateStepNumber}
            /> : <LocationForm
            userCreated={userCreated}
            
            />,
            3: <DocumentationForm
                updateStepNumber={updateStepNumber}
            />,
            4: <SkillsForm
                updateStepNumber={updateStepNumber}
            />,

            5: <AboutTekkoForm
                updateStepNumber={updateStepNumber} />,
            6: <SalaryExpectationForm
                userCreated={userCreated}
            />

        };

        return STEPS_ORDER[stepNumber];
    };
    console.log("este usuario cree", userCreated)



    return (
        <div className='flex flex-col'>
            <div className="banner-auth">
                <div className='main-container-auth'>
                    <div className='w-screen flex flex-col items-center gap-[4px] text-white pt-[3.5em] pb-[1em] lg:p-0'>
                        <img src="/images/isologotipo.png" alt="isologotipo" width={'100px'} height={'auto'} className='z-1' />
                        <h1 className='hidden lg:flex text-display-xl'>¡Bienvenido a Tekko!</h1>
                        <h2 className='hidden lg:flex text-subheading'>Todos los servicios en un sólo lugar</h2>
                    </div>
                    <div className={`${isTekko ? 'container-form-auth-tekko' : 'container-form-auth-user'} p-[24.5px] pt-[32px] md:p-[130px] md:pt-[56px] lg:p-[56px]`}>
                        {setStepperByUser()}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Register;
