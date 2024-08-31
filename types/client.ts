export type Make = {
  id: number;
  logoUrl: string;
  name: string;
  vehicleCount: number;
};

export type Year = {
  id: number;
  name: string;
};

export type Model = {
  body: string;
  id: number;
  make: string;
  model: string;
  type: string;
  year: number;
};

export type Submodel = Model & {
  bed: string;
  doors: null;
  drw: boolean;
  submodel: string;
};

export type Color = {
  id: number;
  code: string;
  name: string;
  shortName: string;
  swatchUrl: string;
  images: {
    sideView: boolean;
    isoView: boolean;
    rearView: boolean;
  };
};

export type Image = {
  240: string;
  350: string;
  640: string;
  960: string;
  2400: string;
};

export type Vehicle = Submodel & {
  defaultColorId: number;
  colors: Color[];
  images: {
    sideView: Image;
    isoView: Image;
    rearView: Image;
  };
};
