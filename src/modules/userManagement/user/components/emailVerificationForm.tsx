import { Button, Input } from "@nextui-org/react";
import ProgressBar from "../../../../components/progressBar/progressBar";
import { useRef, useState } from "react";
import UserDTO from "../dto/user.dto";

interface EmailVerificationFormI {
    isTekko: boolean;
    updateStepNumber: () => void;
    userCreated: UserDTO | undefined;
};

const EmailVerificationForm: React.FC<EmailVerificationFormI> = ({ isTekko, updateStepNumber, userCreated }) => {
    const [verificationCode, setVerificationCode] = useState<string>("");

    console.log("esto recibo para verificar el mail", userCreated)
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (value.length === 1 && index < inputRefs.length - 1) {
            inputRefs[index + 1].current?.focus();
        }

        const newVerificationCode = verificationCode.split("");
        newVerificationCode[index] = value;
        setVerificationCode(newVerificationCode.join(""));
    };

    const handleValidate = () => {
        // Aquí debes comparar verificationCode con el código que debería ser
            updateStepNumber();
       
    };

    const handleForwardCode = () => {
        console.log('reenviando codigo')
    }

    return (
        <div className='flex flex-col justify-between h-full pb-[34px]'>
            <div className="flex flex-col gap-[40px] grow">
                <div className="flex flex-col gap-[8px]">
                    <h1 className="text-heading-m text-white">Verifiquemos tu email</h1>
                    {isTekko
                        ?
                        <div className="mt-[4px] mb-[32px]">
                            <ProgressBar stepNumber={2}/>
                        </div>
                        : null
                    }
                    <p className="text-body text-light-grey"> Por favor ingresa el código de 4 dígitos que fue enviado a la cuenta <span className="text-subheading">{userCreated?.email}</span></p>
                </div>
                <div className="grow flex flex-col">
                    <div className="flex justify-center gap-[12px]">
                        {
                            inputRefs.map((ref, index) => {
                                return <Input className="w-[3.5em] grow"
                                    variant='bordered'
                                    type="text"
                                    name={index.toString()}
                                    key={index.toString()}
                                    maxLength={1}
                                    ref={ref}
                                    classNames={{
                                        inputWrapper: [
                                            "h-[64px]",
                                            "bg-transparent",
                                            "border-[1px]",
                                            "border-[#645E5A]",
                                            "group-data-[focus=true]:border-[#F5F3B5]",
                                            "group-data-[disabled=true]:border-green-500",
                                            "text-display-m",
                                            "text-center",
                                            "text-[#9F9C9A]",
                                        ],
                                        input: [
                                            "text-display-m",
                                            "text-center",
                                        ],
                                    }}
                                    onChange={(e) => handleInputChange(e, index)} />
                            })
                        }
                    </div>
                    <p className="text-center text-white text-heading-s mt-[24px]">¿No recibiste el código? <span onClick={handleForwardCode} className="text-lemonYellow cursor-pointer">Reenviar</span></p>
                </div>
                <Button type="button" className="button-primary w-full" onClick={handleValidate}>
                    Validar
                </Button>
            </div>
        </div >
    );
};

export default EmailVerificationForm;
