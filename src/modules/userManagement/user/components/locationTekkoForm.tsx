// import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
// import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
// import ProgressBar from "../../../../components/progressBar/progressBar";
// import { ZoneDTO } from "../../../zone/dto/zone.dto";
// import ZoneService from "../../../zone/zone.service";
// import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMapPin } from '@fortawesome/free-solid-svg-icons';
// import UserDTO from '../dto/user.dto';
// import { UpdateSupplierContext } from '../../../../shared/reducers/registrationContext';
// import CustomChipFormik from '../../../../components/customChipFormik/customChipFormik';

// interface ILocationTekkoFormProps {
//     updateStepNumber?: () => void;
//     userCreated?: UserDTO | undefined;
//     setUserCreated: React.Dispatch<React.SetStateAction<UserDTO | undefined>>
// }

// const LocationTekkoForm = ({ updateStepNumber }: ILocationTekkoFormProps) => {
//     const { supplierData, setSupplierData, updateField } = useContext(UpdateSupplierContext)!;
//     const [zones, setZones] = useState<ZoneDTO[]>([]);
//     const [pathArray, setPathArray] = useState<{ lat: number, lng: number }[][]>([]);
//     const polygonRefs = useRef<Array<google.maps.Polygon | null>>([]);
//     const [selectedZones, setSelectedZones] = useState<ZoneDTO[]>([]);
//     const [selectedZone, setSelectedZone] = useState<ZoneDTO | null>(null);

//     const mapContainerStyle = {
//         width: '100%',
//         height: '400px',
//     };
//     const center = { lat: -31.425, lng: -64.191 };

//     useEffect(() => {
//         fetchZones();
//     }, []);

//     useEffect(() => {
//         const paths = zones.map(zone =>
//             zone.coordinates!.map(coord => ({ lat: coord.lat!, lng: coord.lng! }))
//         );
//         setPathArray(paths);
//     }, [zones]);

//     const fetchZones = async () => {
//         try {
//             const response = await ZoneService.getAll();
//             if (response) {
//                 setZones(response);
//             }
//         } catch (error) {
//             console.log("Error fetching zones:", error);
//         }
//     };

//     const onLoad = (polygon: google.maps.Polygon, index: number) => {
//         polygonRefs.current[index] = polygon;
//     };

//     const onUnmount = (index: number) => {
//         polygonRefs.current[index] = null;
//     };

//     const handleZoneSelection = (zone: ZoneDTO) => {
//         setSelectedZones(prevSelected => {
//             const isSelected = prevSelected.some(selected => selected.id === zone.id);
//             const newSelectedZones = isSelected
//                 ? prevSelected.filter(selected => selected.id !== zone.id)
//                 : [...prevSelected, zone];
//             updateField('zones', newSelectedZones);
//             return newSelectedZones;
//         });
//     };

//     const handlePolygonClick = (zone: ZoneDTO) => {
//         setSelectedZone(zone);
//     };

//     const disabledReason = (): boolean => selectedZones.length === 0;

//     const handleMoveForward = () => {
//         if (updateStepNumber) {
//             setSupplierData(prevData => ({
//                 ...prevData,
//                 zones: selectedZones
//             }));
//             updateStepNumber();
//         }
//     };

//     const handleCloseChip = (id: string) => {
//         setSelectedZones(prevSelected => {
//             const newSelectedZones =  prevSelected.filter(selected => selected.id !== id)
//             return newSelectedZones;
//         });
//     }

//     return (
//         <div className="flex flex-col h-full gap-[32px] pb-[34px]">
//             <div className="flex flex-col gap-[12px]">
//                 <h1 className="text-heading text-white">¿Qué zonas de trabajo te gustaría cubrir?</h1>
//                 <ProgressBar stepNumber={3}/>
//             </div>
//             <div>
//                 <Dropdown>
//                     <DropdownTrigger>
//                         <Button 
//                             className='w-full flex justify-start bg-[#E4E7E9] h-[56px]'
//                             variant="bordered"
//                             startContent={<FontAwesomeIcon icon={faMapPin} />}
//                         >
//                             Selecciona tu zona
//                         </Button>
//                     </DropdownTrigger>
//                     <DropdownMenu
//                         aria-label="Dynamic Actions"
//                         selectionMode="multiple"
//                         selectedKeys={selectedZones.map(zone => String(zone.id))}
//                     >
//                         {zones.map((zone, index) => (
//                             <DropdownItem
//                                 key={zone.id}
//                                 onClick={() => handleZoneSelection(zone)}
//                                 color={selectedZones.includes(zone) ? 'primary' : 'default'}
//                             >
//                                 {`Zona ${index + 1}: ${zone.description}`}
//                             </DropdownItem>
//                         ))}
//                     </DropdownMenu>
//                 </Dropdown>
//                 <div className='flex gap-[8px] mt-[14px] overflow-hidden'>
//                     {selectedZones.map( zone => {
//                         return (
//                             <CustomChipFormik label={zone.name!} key={zone.id} id={zone.id!} handleClose={handleCloseChip}/>
//                         )
//                     })}
//                 </div>
//             </div>
//             <form className="flex flex-col grow">
//                 <div className="flex flex-col gap-[12px] grow rounded-[12px]">
//                     <LoadScript googleMapsApiKey="AIzaSyCLJICoi3w2Iau8bb8JC51yfj1MKaSudTA">
//                         <GoogleMap

//                             mapContainerStyle={mapContainerStyle}
//                             center={center}
//                             zoom={12}
//                         >
//                             {pathArray.map((path, index) => (
//                                 <Polygon
//                                     key={index}
//                                     paths={path}
//                                     options={{
//                                         fillColor: "blue",
//                                         fillOpacity: 0.4,
//                                         strokeColor: "blue",
//                                         strokeOpacity: 0.8,
//                                         strokeWeight: 2,
//                                         clickable: true,
//                                         draggable: false,
//                                         editable: false,
//                                         geodesic: false,
//                                         zIndex: 1
//                                     }}
//                                     onLoad={(polygon) => onLoad(polygon, index)}
//                                     onUnmount={() => onUnmount(index)}
//                                 />
//                             ))}
//                         </GoogleMap>
//                     </LoadScript>
//                 </div>
//                 <Button onClick={handleMoveForward} isDisabled={disabledReason()} className="button-primary w-full mt-[36px]">
//                     Siguiente
//                 </Button>
//             </form>
//         </div>
//     );
// };

// export default LocationTekkoForm;


import React, { useEffect, useState, useRef, useContext } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import ProgressBar from "../../../../components/progressBar/progressBar";
import { ZoneDTO } from "../../../zone/dto/zone.dto";
import ZoneService from "../../../zone/zone.service";
import { GoogleMap, LoadScript, Polygon, InfoWindow } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import UserDTO from '../dto/user.dto';
import { UpdateSupplierContext } from '../../../../shared/reducers/registrationContext';
import CustomChipFormik from '../../../../components/customChipFormik/customChipFormik';

interface ILocationTekkoFormProps {
    updateStepNumber?: () => void;
    userCreated?: UserDTO | undefined;
    setUserCreated: React.Dispatch<React.SetStateAction<UserDTO | undefined>>
}

const LocationTekkoForm = ({ updateStepNumber }: ILocationTekkoFormProps) => {
    const { supplierData, setSupplierData, updateField } = useContext(UpdateSupplierContext)!;
    const [zones, setZones] = useState<ZoneDTO[]>([]);
    const polygonRefs = useRef<Array<google.maps.Polygon | null>>([]);
    const [pathArray, setPathArray] = useState<{ lat: number, lng: number }[][]>([]);
    const [polygonCenters, setPolygonCenters] = useState<{ [key: number]: google.maps.LatLng }>({});
    const [selectedZone, setSelectedZone] = useState<ZoneDTO | null>(null);
    const [selectedZones, setSelectedZones] = useState<ZoneDTO[]>([]);
    const [infoWindowPosition, setInfoWindowPosition] = useState<{ lat: number, lng: number } | null>(null);

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };
    const center = { lat: -31.425, lng: -64.191 };

    useEffect(() => {
        fetchZones();
    }, []);

    useEffect(() => {
        if (zones.length > 0) {
            const paths = zones.map(zone =>
                zone.coordinates?.map(coord => ({ lat: coord.lat!, lng: coord.lng! })) || []
            );
            setPathArray(paths);
        }
    }, [zones]);

    const fetchZones =  () => {
            const zones: ZoneDTO[] = [
                {
                  id: "1",
                  name: "Centro",
                  coordinates: [
                    { lat: -31.4167, lng: -64.1833 },
                    { lat: -31.4150, lng: -64.1800 },
                    { lat: -31.4180, lng: -64.1850 },
                  ],
                  center: { lat: -31.4167, lng: -64.1833 },
                  description: "Zona céntrica de Córdoba"
                },
                {
                  id: "2",
                  name: "Nueva Córdoba",
                  coordinates: [
                    { lat: -31.4230, lng: -64.1860 },
                    { lat: -31.4250, lng: -64.1880 },
                    { lat: -31.4210, lng: -64.1840 },
                  ],
                  center: { lat: -31.4230, lng: -64.1860 },
                  description: "Barrio moderno con gran actividad estudiantil"
                },
                {
                  id: "3",
                  name: "Alberdi",
                  coordinates: [
                    { lat: -31.4120, lng: -64.1910 },
                    { lat: -31.4140, lng: -64.1930 },
                    { lat: -31.4100, lng: -64.1890 },
                  ],
                  center: { lat: -31.4120, lng: -64.1910 },
                  description: "Barrio histórico de Córdoba"
                },
                {
                  id: "4",
                  name: "General Paz",
                  coordinates: [
                    { lat: -31.4090, lng: -64.1950 },
                    { lat: -31.4110, lng: -64.1970 },
                    { lat: -31.4070, lng: -64.1930 },
                  ],
                  center: { lat: -31.4090, lng: -64.1950 },
                  description: "Barrio tradicional con arquitectura colonial"
                },
                {
                  id: "5",
                  name: "Cofico",
                  coordinates: [
                    { lat: -31.4030, lng: -64.1820 },
                    { lat: -31.4050, lng: -64.1840 },
                    { lat: -31.4010, lng: -64.1800 },
                  ],
                  center: { lat: -31.4030, lng: -64.1820 },
                  description: "Zona residencial tranquila"
                },
                {
                  id: "6",
                  name: "Güemes",
                  coordinates: [
                    { lat: -31.4260, lng: -64.1910 },
                    { lat: -31.4280, lng: -64.1930 },
                    { lat: -31.4240, lng: -64.1890 },
                  ],
                  center: { lat: -31.4260, lng: -64.1910 },
                  description: "Barrio bohemio con muchos bares y restaurantes"
                },
                {
                  id: "7",
                  name: "Jardín",
                  coordinates: [
                    { lat: -31.4480, lng: -64.1820 },
                    { lat: -31.4500, lng: -64.1840 },
                    { lat: -31.4460, lng: -64.1800 },
                  ],
                  center: { lat: -31.4480, lng: -64.1820 },
                  description: "Zona residencial con mucho verde"
                },
                {
                  id: "8",
                  name: "Cerro de las Rosas",
                  coordinates: [
                    { lat: -31.3840, lng: -64.2220 },
                    { lat: -31.3860, lng: -64.2240 },
                    { lat: -31.3820, lng: -64.2200 },
                  ],
                  center: { lat: -31.3840, lng: -64.2220 },
                  description: "Barrio exclusivo al noroeste de la ciudad"
                },
                {
                  id: "9",
                  name: "Villa Belgrano",
                  coordinates: [
                    { lat: -31.3820, lng: -64.1880 },
                    { lat: -31.3840, lng: -64.1900 },
                    { lat: -31.3800, lng: -64.1860 },
                  ],
                  center: { lat: -31.3820, lng: -64.1880 },
                  description: "Zona residencial de alta gama"
                },
                {
                  id: "10",
                  name: "San Vicente",
                  coordinates: [
                    { lat: -31.4210, lng: -64.1660 },
                    { lat: -31.4230, lng: -64.1680 },
                    { lat: -31.4190, lng: -64.1640 },
                  ],
                  center: { lat: -31.4210, lng: -64.1660 },
                  description: "Barrio tradicional con una rica historia"
                }]
                setZones(zones);
    };

    const onLoad = (polygon: google.maps.Polygon, index: number) => {
        polygonRefs.current[index] = polygon;
        const bounds = new window.google.maps.LatLngBounds();
        polygon.getPath().forEach((path) => {
            bounds.extend(path);
        });
        const center = bounds.getCenter();
        setPolygonCenters(prevCenters => ({ ...prevCenters, [index]: center }));
    };

    const onUnmount = (index: number) => {
        polygonRefs.current[index] = null;
    };

    const handlePolygonClick = (zone: ZoneDTO, index: number) => {
        setSelectedZone(zone);
        const center = polygonCenters[index];
        if (center) {
            setInfoWindowPosition({ lat: center.lat(), lng: center.lng() });
        } else {
            console.error(`No center found for polygon index ${index}`);
        }
    };

    const handleMoveForward = () => {
        if (updateStepNumber) {
            setSupplierData(prevData => ({
                ...prevData,
                zones: selectedZone ? [selectedZone] : []
            }));
            updateStepNumber();
        }
    };

    const handleZoneSelection = (zone: ZoneDTO) => {
        setSelectedZones(prevSelected => {
            const isSelected = prevSelected.some(selected => selected.id === zone.id);
            const newSelectedZones = isSelected
                ? prevSelected.filter(selected => selected.id !== zone.id)
                : [...prevSelected, zone];
            updateField('zones', newSelectedZones);
            return newSelectedZones;
        });
    };

    const handleCloseChip = (id: string) => {
        setSelectedZones(prevSelected => {
            const newSelectedZones =  prevSelected.filter(selected => selected.id !== id)
            return newSelectedZones;
        });
    }

    return (
        <div className="flex flex-col h-full gap-[32px] pb-[34px]">
            <div className="flex flex-col gap-[12px]">
                <h1 className="text-heading text-white">¿Qué zonas de trabajo te gustaría cubrir?</h1>
                <ProgressBar stepNumber={3} />
            </div>
            <div>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            className='w-full flex justify-start bg-[#E4E7E9] h-[56px]'
                            variant="bordered"
                            startContent={<FontAwesomeIcon icon={faMapPin} />}
                        >
                            Selecciona tu zona
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Dynamic Actions"
                        selectionMode="multiple"
                        selectedKeys={selectedZones.map(zone => String(zone.id))}
                    >
                        {zones.map((zone, index) => (
                            <DropdownItem
                                key={zone.id}
                                onClick={() => handleZoneSelection(zone)}
                                color={selectedZone && selectedZone.id === zone.id ? 'primary' : 'default'}
                            >
                                {`Zona ${index + 1}: ${zone.description}`}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <div className='flex gap-[8px] mt-[14px] overflow-hidden'>
                    {selectedZones.map( zone => {
                        return (
                            <CustomChipFormik label={zone.name!} key={zone.id} id={zone.id!} handleClose={handleCloseChip}/>
                        )
                    })}
                </div>
            </div>
            <form className="flex flex-col grow">
                <div className="flex flex-col gap-[12px] grow">
                    <LoadScript
                        googleMapsApiKey="AIzaSyCLJICoi3w2Iau8bb8JC51yfj1MKaSudTA"
                        loadingElement={<div>Cargando...</div>}
                        language="es"
                        region="AR"
                    >
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={center}
                            zoom={12}
                        >
                            {pathArray.length > 0 && pathArray.map((path, index) => (
                                <Polygon
                                    key={index}
                                    paths={path}
                                    options={{
                                        fillColor: "blue",
                                        fillOpacity: 0.4,
                                        strokeColor: "blue",
                                        strokeOpacity: 0.8,
                                        strokeWeight: 2,
                                        clickable: true,
                                        draggable: false,
                                        editable: false,
                                        geodesic: false,
                                        zIndex: 1
                                    }}
                                    onLoad={(polygon) => onLoad(polygon, index)}
                                    onUnmount={() => onUnmount(index)}
                                    onClick={() => handlePolygonClick(zones[index], index)}
                                />
                            ))}
                            {selectedZone && infoWindowPosition && (
                                <InfoWindow
                                    position={infoWindowPosition}
                                    onCloseClick={() => {
                                        setSelectedZone(null);
                                        setInfoWindowPosition(null);
                                    }}
                                >
                                    <div>
                                        <h4>{selectedZone.name}</h4>
                                        <p>{selectedZone.description}</p>
                                    </div>
                                </InfoWindow>
                            )}
                        </GoogleMap>
                    </LoadScript>
                </div>
                <Button onClick={handleMoveForward} isDisabled={!(selectedZones.length > 0)} className="button-primary w-full">
                    Siguiente
                </Button>
            </form>
        </div>
    );
};

export default LocationTekkoForm;