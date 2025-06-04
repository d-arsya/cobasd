import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Image from "next/image";

// Custom marker icons
const needFoodIcon = new L.Icon({
  iconUrl: "/icon/food_b.png",
  iconSize: [45, 45],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const shareFoodIcon = new L.Icon({
  iconUrl: "/icon/fast-food-burger.png",
  iconSize: [48, 48],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function MapComponent() {
  const [foodNeeds, setFoodNeeds] = useState([]);
  const [foodShares, setFoodShares] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [needResponse, shareResponse] = await Promise.all([
          fetch("/api/food/need"),
          fetch("/api/food/share"),
        ]);

        if (!needResponse.ok || !shareResponse.ok) {
          throw new Error(
            `Gagal mengambil data: /food/need (${needResponse.status}), /food/share (${shareResponse.status})`
          );
        }

        const needData = (await needResponse.json()).data;
        const shareData = (await shareResponse.json()).data;
        console.log(needData)
        if (!Array.isArray(needData) || !Array.isArray(shareData)) {
          throw new Error("Format data tidak valid, seharusnya array.");
        }

        const processLocations = (data) =>
          data
            .map((item) => {
              if (!item.koordinat) return null;
              const [lat, lng] = item.koordinat.split(/,\s*/).map(parseFloat);
              return isNaN(lat) || isNaN(lng) ? null : { ...item, lat, lng };
            })
            .filter(Boolean);

        const acceptedNeedData = needData.filter(
          (item) => item.status === "Accepted"
        );
        const acceptedShareData = shareData.filter(
          (item) => item.status === "Accepted"
        );

        setFoodNeeds(processLocations(acceptedNeedData));
        setFoodShares(processLocations(acceptedShareData));
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <MapContainer
      center={[-7.782794123757193, 110.36709914609082]}
      zoom={17}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {foodNeeds.map((location, index) => (
        <Marker
          key={`need-${location.id || index}`}
          position={[location.lat, location.lng]}
          icon={needFoodIcon}
        >
          <Popup>
            <strong>Kegiatan/Acara:</strong> {location.nama_kegiatan}
            <br />
            <strong>Tempat:</strong> {location.nama_tempat}
            <br />
            <strong>Waktu:</strong> {location.waktu}
            <br />
            <strong>Jumlah Makanan:</strong> {location.jumlah_makanan}
            <br />
            <strong>Pencari:</strong> {location.nama_pencari} (
            {location.nomor_pencari})
            <br />
            <strong>Keterangan:</strong> {location.keterangan}
          </Popup>
        </Marker>
      ))}

      {foodShares.map((location, index) => (
        <Marker
          key={`share-${location.id || index}`}
          position={[location.lat, location.lng]}
          icon={shareFoodIcon}
        >
          <Popup>
            <strong>Kegiatan/Acara:</strong> {location.nama_kegiatan}
            <br />
            <strong>Makanan:</strong> {location.nama_makanan} -{" "}
            {location.jenis_makanan}
            <br />
            <strong>Wadah Makanan:</strong> {location.wadah_makanan}
            <br />
            <strong>Diambil:</strong> {location.makanan_diambil}
            <br />
            <strong>Waktu:</strong> {location.waktu}
            <br />
            <strong>Jumlah Makanan:</strong> {location.jumlah_makanan}
            <br />
            <strong>Pembagi:</strong> {location.nama_pembagi} (
            {location.nomor_pembagi})
            <br />
            <strong>Keterangan:</strong> {location.keterangan}
            <br />
            <strong>Kadaluwarsa:</strong> {location.waktu_kadaluwarsa}
            <br />
            {location.image_url && (
              <div className="mt-2 flex justify-center">
                <Image
                  src={"https://mobile-be.berbagibitesjogja.com" + location.image_url}
                  alt="Food"
                  width={150}
                  height={150}
                  className="object-cover rounded-lg"
                />
              </div>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
