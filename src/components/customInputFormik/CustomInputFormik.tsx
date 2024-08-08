import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '@nextui-org/react';
import React, { useEffect } from 'react';

interface ICustomInputFormikProps {
  formik: any;
  iconType: IconProp | null;
  inputName: string;
  inputType: string;
  placeholder: string;
  onKeyPress?: (e: any) => void;
}


const CustomInputFormik = ({ formik, iconType, inputName, inputType, placeholder, onKeyPress }: ICustomInputFormikProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      aria-label={inputName}
      className="w-full"
      classNames={{
        inputWrapper: [
          "h-12",
          "bg-transparent",
          "border-[1px]",
          "border-light-grey",
          "group-data-[focus=true]:border-yellow",
          "text-light-grey",
        ], 
        input: [
          "text-body",
        ],  
        errorMessage: [
         "text-caption",
         "text-light-grey",
        ], 
  
      }}
      // color={formik.errors[inputName] && formik.touched[inputName] ? 'primary' : 'default'}
      endContent={inputType === 'password'
        ? (
          <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
            {isVisible
              ? (<FontAwesomeIcon icon={faEye} />)
              : (<FontAwesomeIcon icon={faEyeSlash} />)}
          </button>)
        : null
      }
      errorMessage={formik.errors[inputName]}
      id={inputName}
      isInvalid={formik.errors[inputName] && formik.touched[inputName]}
      isRequired
      startContent={iconType ? <FontAwesomeIcon icon={iconType} /> : null}
      name={inputName}
      onChange={formik.handleChange}
      onKeyDown={onKeyPress && onKeyPress}
      placeholder={placeholder}
      type={inputType !== 'password' ? inputType : (isVisible ? "text" : "password")}
      value={formik.values[inputName]}
      variant={"bordered"}
      onBlur={formik.handleBlur} 
    />
  );
};

export default CustomInputFormik;
