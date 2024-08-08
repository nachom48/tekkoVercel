import { Button } from "@nextui-org/react";

interface ISuccessProps {
    user: string 
}

const Success = ({user}: ISuccessProps) => {

    return (
        <div className={`pb-[34px] px-[24px] h-screen ${user === 'tekko' ? 'bg-gradient-container-tekko' : 'bg-gradient-container-user' } flex flex-col justify-center items-center`}>
            <div className="flex flex-col justify-center items-center grow gap-[14px]">
                <img src="/images/check-success.png" alt="isologotipo" width={'61px'} height={'auto'} className='z-1' />
                <h1 className="text-heading text-white text-center w-[60%]">¡Tu registro se
                    completó con éxito!</h1>
            </div>
            <Button type="submit" className="button-primary w-full self-end">
                Ir al home
            </Button>
        </div>
    );
};

export default Success;
