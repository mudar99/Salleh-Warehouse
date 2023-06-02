import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export const SearchField = (props) => {
  const provider = new OpenStreetMapProvider({
    params: {
      access_token: props.apiKey,
    },
  });

  const searchControl = new GeoSearchControl({
    provider: provider,
    autoComplete: true,
    autoCompleteDelay: 250,
    style: "bar",
    showMarker: true,
    showPopup: false,
    autoClose: true,
    searchLabel: "أدخل العنوان",
    marker: {
      icon: new L.Icon.Default(),
      draggable: false,
    },
  });
  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    map.on(
      "geosearch/showlocation",
      (e) => props.setPosition(e.location.raw.lat, e.location.raw.lon)
      //   console.log(e.location.raw.lon, e.location.raw.lat)
    );

    return () => map.removeControl(searchControl);
  }, []);

  return null;
};
