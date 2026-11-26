"use client";

import { useEffect, useState } from "react";

type Props = {
    tows: any[];
};

const locationCoordinates: Record<
    string,
    [number, number]
> = {

    "Ring Road": [21.1702, 72.8311],

    "Adajan": [21.1945, 72.7933],

    "City Light": [21.1570, 72.7897],

    "Athwa": [21.1819, 72.8081],

    "Surat Traffic Yard": [21.1700, 72.8300],
};

const TowMapComponent = ({ tows }: Props) => {

    const [mounted, setMounted] =
        useState(false);

    const [MapComponents, setMapComponents] =
        useState<any>(null);

    useEffect(() => {

        setMounted(true);

        const loadLeaflet = async () => {

            const leaflet = await import(
                "react-leaflet"
            );

            const L = await import("leaflet");

            delete (L.Icon.Default.prototype as any)
                ._getIconUrl;

            L.Icon.Default.mergeOptions({

                iconRetinaUrl:
                    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

                iconUrl:
                    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

                shadowUrl:
                    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            });

            setMapComponents({
                MapContainer:
                    leaflet.MapContainer,

                TileLayer:
                    leaflet.TileLayer,

                Marker:
                    leaflet.Marker,

                Popup:
                    leaflet.Popup,
            });
        };

        loadLeaflet();

    }, []);

    if (!mounted || !MapComponents) {

        return (
            <div className="h-[500px] flex items-center justify-center bg-gray-100 rounded-2xl">
                Loading Map...
            </div>
        );
    }

    const {
        MapContainer,
        TileLayer,
        Marker,
        Popup,
    } = MapComponents;

    return (

        <div className="h-[500px] rounded-2xl overflow-hidden">

            <MapContainer
                center={[21.1702, 72.8311]}
                zoom={12}
                className="h-full w-full"
            >

                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {tows.map((tow, index) => {

                    const normalizedLocation =
                        tow.pickupLocation.trim();

                    const coords =
                        locationCoordinates[
                        normalizedLocation
                        ];

                    if (!coords) {

                        console.log(
                            "Missing coordinates for:",
                            tow.pickupLocation
                        );

                        return null;
                    }

                    return (

                        <Marker
                            key={index}
                            position={[
                                coords[0] + index * 0.001,
                                coords[1] + index * 0.001,
                            ]}
                        >

                            <Popup>

                                🚛 {tow.vehicle.numberPlate}

                                <br />

                                📍 {tow.pickupLocation}

                                <br />

                                📝 {tow.reason}

                            </Popup>

                        </Marker>

                    );
                })}

            </MapContainer>

        </div>
    );
};

export default TowMapComponent;