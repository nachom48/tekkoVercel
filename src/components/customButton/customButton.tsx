import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";


interface ICustomButton {
    formik: any;
    label: string;
}

const CustomButton = ({formik, label}: ICustomButton) => {
    const [isBtnDisable, setIsBtnDisabled] = useState(true);

    useEffect(() => {
        const isFormValid = formik.isValid && Object.keys(formik.touched).length === Object.keys(formik.values).length;
        console.log(formik)
        setIsBtnDisabled(!isFormValid);
    }, [formik.errors, formik.touched, formik.values, formik.isValid]);

      
    return (
        <Button 
                type="submit" 
                className="button-primary w-full"
                size="lg">
            {label}
        </Button>
    );
};

export default CustomButton;