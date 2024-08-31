export default defineEventHandler(async (event) => {
  /* 
    VALIDATE QUERY PARAMS
    make TO BE NON EMPTY/UNDEFINED STRING
    year TO BE A SAFE INTEGER PARSE TO STRING
    model TO BE NON EMPTY/UNDEFINED STRING
  */

  const { success, data, error } = await getValidatedQuery(
    event,
    SubmodelsQuerySchema.safeParse
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'BAD REQUEST',
      message: 'INVALID QUERY: make, year, model',
      data: error.issues,
    });
  }

  const { Vehicles } = await autoSyncStudioApi<SubmodelsResponse>('/vehicles', {
    method: 'GET',
    query: {
      'f-make': data.make,
      'f-year': data.year,
      'f-model': data.model,
      'p-size': 500,
      'i-body': true,
      'i-type': true,
      'i-year': true,
    },
  });

  const submodels = Vehicles.map((submodel): Submodel => {
    return {
      bed: submodel.Bed,
      body: submodel.Body,
      doors: submodel.Doors,
      drw: submodel.Drw,
      id: submodel.Id,
      make: submodel.Make,
      model: submodel.Model,
      submodel: submodel.Submodel,
      type: submodel.Type,
      year: submodel.Year,
    };
  });

  return submodels;
});
