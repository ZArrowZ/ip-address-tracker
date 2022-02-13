import { InputChangeEventHandler, FormEventHandler } from "./types";

export interface CountryData {
  as: {
    asn: number;
    domain: string;
    name: string;
    route: string;
    type: string;
  };
  domains: string[];
  ip: string;
  isp: string;
  location: {
    city: string;
    country: string;
    geonameId: number;
    lat: number;
    lng: number;
    postalCode: string;
    region: string;
    timezone: string;
  };
}

export interface MapProps {
  lat: number;
  lng: number;
}

export interface HeaderProps {
  inputIP: string;
  handleSubmit: FormEventHandler;
  handleUserInput: InputChangeEventHandler;
}
