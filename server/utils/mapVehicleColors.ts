export const mapVehicleColors = ({
  swatchUrlBase,
  rawColors,
}: {
  swatchUrlBase: string;
  rawColors: RawColor[];
}) => {
  const colors = rawColors.map((color): Color => {
    return {
      id: color.Id,
      code: color.Code,
      name: color.Name,
      shortName: color.ShortName,
      swatchUrl: swatchUrlBase.concat(color.Swatch),
      images: {
        sideView: color.Img001,
        rearView: color.Img014,
        isoView: color.Img032,
      },
    };
  });

  return colors;
};
