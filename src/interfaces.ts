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
  mapPosition: number[];
}

export interface HeaderProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  userInput: React.ChangeEventHandler<HTMLInputElement>;
  userValue: string;
}
