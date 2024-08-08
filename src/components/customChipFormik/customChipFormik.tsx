import { Chip } from "@nextui-org/react";

interface ICustomChipFormikProps {
    label: string;
    id: string;
    handleClose: (id: string) => void;
}

const CustomChipFormik = ({ label, handleClose, id }: ICustomChipFormikProps) => {
    return (
        <Chip
            variant="solid"
            classNames={{
                base: [
                    "bg-gradient-to-br",
                    "to-[#E8E215]",
                    "from-[#ACA81F]",
                    "border-transparent"
                ],
                content: [
                    "text-button",
                    "text-[#332E29]"
                ],
                closeButton: [
                    "text-[#332E29]",
                ]
            }}
            onClose={() => handleClose(id)}
            >
            {label}
        </Chip>
    );
};

export default CustomChipFormik;