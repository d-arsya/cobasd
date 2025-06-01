"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

// Dynamically import the map components with ssr disabled
const MapComponentWithNoSSR = dynamic(
  () => import("./MapComponent"),
  { ssr: false } // This is the key part - disable server-side rendering
);

function MapPage() {
  return (
    <div>
      {/* <h1>My Map</h1> */}
      <MapComponentWithNoSSR />
    </div>
  );
}

export default MapPage;
