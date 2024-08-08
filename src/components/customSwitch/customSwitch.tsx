import { Switch } from "@nextui-org/react";


interface ICustomSwitch {
    formik: any;
}

const CustomSwitch = ({formik}: ICustomSwitch) => {
      
    return (
        <Switch
        isSelected={formik.values.acceptTerms}
        onChange={() => formik.setFieldValue('acceptTerms', !formik.values.acceptTerms)}
        color="default"
        classNames={{
            label: 'text-caption text-white underline'
        }}
    >
        Acepto los Términos y Condiciones
    </Switch>
    );
};

export default CustomSwitch;