export default defineEventHandler(async (event) => {
  /* 
    VALIDATE QUERY PARAMS
    make TO BE NON EMPTY/UNDEFINED STRING
    year TO BE A SAFE INTEGER PARSE TO STRING
  */
  const { success, data, error } = await getValidatedQuery(
    event,
    ModelsQuerySchema.safeParse
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'BAD REQUEST',
      message: 'INVALID QUERY: make, year',
      data: error.issues,
    });
  }

  const { Models } = await autoSyncStudioApi<ModelsResponse>(
    '/vehicles/models',
    {
      method: 'GET',
      query: {
        'f-make': data.make,
        'f-year': data.year,
        'p-size': 500,
        'i-body': true,
        'i-type': true,
        'i-year': true,
      },
    }
  );

  const models = Models.map((model): Model => {
    return {
      body: model.Body,
      id: model.Id,
      make: model.Make,
      model: model.Model,
      type: model.Type,
      year: model.Year,
    };
  });

  return models;
});
