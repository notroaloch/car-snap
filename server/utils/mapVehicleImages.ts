export const mapVehicleImages = ({
  imgUrlBase,
  rawVehicle,
}: {
  imgUrlBase: string;
  rawVehicle: RawVehicle;
}) => {
  const images = {
    sideView: <Image>{
      240: imgUrlBase.concat(rawVehicle.Img001[240]),
      350: imgUrlBase.concat(rawVehicle.Img001[350]),
      640: imgUrlBase.concat(rawVehicle.Img001[640]),
      960: imgUrlBase.concat(rawVehicle.Img001[960]),
      2400: imgUrlBase.concat(rawVehicle.Img001[2400]),
    },
    rearView: <Image>{
      240: imgUrlBase.concat(rawVehicle.Img014[240]),
      350: imgUrlBase.concat(rawVehicle.Img014[350]),
      640: imgUrlBase.concat(rawVehicle.Img014[640]),
      960: imgUrlBase.concat(rawVehicle.Img014[960]),
      2400: imgUrlBase.concat(rawVehicle.Img014[2400]),
    },
    isoView: <Image>{
      240: imgUrlBase.concat(rawVehicle.Img032[240]),
      350: imgUrlBase.concat(rawVehicle.Img032[350]),
      640: imgUrlBase.concat(rawVehicle.Img032[640]),
      960: imgUrlBase.concat(rawVehicle.Img032[960]),
      2400: imgUrlBase.concat(rawVehicle.Img032[2400]),
    },
  };

  return images;
};
