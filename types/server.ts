export type RawMake = {
  Id: number;
  Logo: string;
  Make: string;
  VehicleCount: number;
};

export type RawModel = {
  Body: string;
  Id: number;
  Make: string;
  Model: string;
  Type: string;
  Year: number;
};

export type RawSubmodel = RawModel & {
  Bed: string;
  Doors: null;
  Drw: boolean;
  Submodel: string;
};

export type RawColor = {
  Id: number;
  Code: string;
  Name: string;
  ShortName: string;
  Rgb1: string;
  Rgb2: string;
  Swatch: string;
  Img001: boolean;
  Img014: boolean;
  Img032: boolean;
};

export type RawImage = {
  240: string;
  350: string;
  640: string;
  960: string;
  2400: string;
};

export type RawVehicle = RawSubmodel & {
  Colors: RawColor[];
  Img001: RawImage;
  Img014: RawImage;
  Img032: RawImage;
  ImgColorId: number;
};

export type MakesResponse = {
  Error?: string;
  LogoUrlBase: string;
  Makes: RawMake[];
  MoreItems: boolean;
};

export type MakeYearsResponse = {
  Error?: string;
  MoreItems: boolean;
  Years: number[];
};
export type ModelsResponse = {
  Error?: string;
  Models: RawModel[];
  MoreItems: boolean;
};

export type SubmodelsResponse = {
  Error?: string;
  MoreItems: boolean;
  Vehicles: RawSubmodel[];
};

export type VehicleResponse = {
  Error?: string;
  ImgUrlBase: string;
  MoreItems: boolean;
  SwatchUrlBase: string;
  Vehicles: RawVehicle[];
};

export type SearchVehicleResponse = {
  Error?: string;
  MoreItems: boolean;
  Vehicles: RawSubmodel[];
};
