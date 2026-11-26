"use client";

import dynamic from "next/dynamic";

const TowMapComponent = dynamic(
    () => import("./TowMapComponent"),
    {
        ssr: false,
    }
);

export default TowMapComponent;