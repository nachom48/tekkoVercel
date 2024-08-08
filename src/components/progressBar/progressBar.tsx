import { Progress } from "@nextui-org/react";

interface IProgressBarProps {
  stepNumber: number;
}

const ProgressBar = ({stepNumber}: IProgressBarProps) => {

    return (
        <Progress
          label={`Paso ${stepNumber} de 7`}
          size="sm"
          value={stepNumber}
          maxValue={7}
          formatOptions={{style: "currency", currency: "ARS"}}
          classNames={{
            base: 'w-full text-white font-raleway',
            track: 'bg-[#D9D9D9]',
            indicator: 'bg-gradient-progress-bar',
          }}
        />
      );
};

export default ProgressBar;