import { extendVariants, Progress, Select, SelectItem } from "@nextui-org/react";
import Gender from "../../modules/supplier/enums/gender.enum";

interface IData {
    key: Gender;
    label: string;
}

interface ICustomSelectFormikProps {
    data: IData[];
    formik: any;
    placeholder: string;
    inputName: string;
}

const CustomSelectFormik = ({ data, formik, placeholder, inputName }: ICustomSelectFormikProps) => {
    const isSelected = formik.values[inputName] !== '';

    return (
        <Select
            placeholder={placeholder}
            className="w-full"
            classNames={{
                trigger: [
                    "w-full",
                    "h-12",
                    "bg-transparent",
                    "border-[1px]",
                    "border-light-grey",
                    "group-data-[has-value=true]:bg-gradient-btn-secondary",
                    "group-data-[has-value=true]:border-yellow",
                    "group-data-[focus=true]:bg-white"
                ],
                selectorIcon: [
                    "text-light-medium-grey",
                ],
                value: [
                    "group-data-[has-value=true]:text-white",
                ]
            }}
            onChange={(value) => formik.setFieldValue(inputName, value)} // Asegúrate de establecer el valor correcto
            value={formik.values[inputName]}
            name={inputName}
        >
            {data.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                    {item.label}
                </SelectItem>
            ))}
        </Select>
    );
};

export default CustomSelectFormik;
