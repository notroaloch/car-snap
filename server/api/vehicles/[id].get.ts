export default defineEventHandler(async (event) => {
  /* 
      VALIDATE ROUTE PARAMS
      id TO BE A SAFE INTEGER PARSE TO STRING
    */

  const { success, data, error } = await getValidatedRouterParams(
    event,
    VehicleByIdQuerySchema.safeParse
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'BAD REQUEST',
      message: 'INVALID PARAM: id',
      data: error.issues,
    });
  }

  const { Vehicles, ImgUrlBase, SwatchUrlBase } =
    await autoSyncStudioApi<VehicleResponse>('/vehicles', {
      method: 'GET',
      query: {
        'f-id': data.id,
        'p-size': 500,
        'i-colors': true,
        'i-img001': true,
        'i-img014': true,
        'i-img032': true,
      },
    });

  const vehicle = Vehicles.map((vehicle): Vehicle => {
    return {
      bed: vehicle.Bed,
      body: vehicle.Body,
      defaultColorId: vehicle.ImgColorId,
      colors: mapVehicleColors({
        rawColors: vehicle.Colors,
        swatchUrlBase: SwatchUrlBase,
      }),
      doors: vehicle.Doors,
      drw: vehicle.Drw,
      id: vehicle.Id,
      images: mapVehicleImages({
        rawVehicle: vehicle,
        imgUrlBase: ImgUrlBase,
      }),
      make: vehicle.Make,
      model: vehicle.Model,
      submodel: vehicle.Submodel,
      type: vehicle.Type,
      year: vehicle.Year,
    };
  }).at(0);

  return vehicle;
});
