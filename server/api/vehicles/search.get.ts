export default defineEventHandler(async (event) => {
  /* 
      VALIDATE QUERY PARAMS
      query TO BE NON EMPTY/UNDEFINED STRING

    */
  const { success, data, error } = await getValidatedQuery(
    event,
    VehicleSearchQuerySchema.safeParse
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'BAD REQUEST',
      message: 'INVALID QUERY: query',
      data: error.issues,
    });
  }

  const { Vehicles } = await autoSyncStudioApi<SearchVehicleResponse>(
    '/vehicles',
    {
      method: 'GET',
      query: {
        'f-query': data.query,
        'p-size': 5,
        'i-body': true,
        'i-type': true,
        'i-year': true,
      },
    }
  );

  const searchResult = Vehicles.map((vehicle) => {
    return {
      body: vehicle.Body,
      id: vehicle.Id,
      make: vehicle.Make,
      model: vehicle.Model,
      submodel: vehicle.Submodel,
      type: vehicle.Type,
      year: vehicle.Year,
      bed: vehicle.Bed,
      doors: vehicle.Doors,
      drw: vehicle.Drw,
    };
  });

  return searchResult;
});
