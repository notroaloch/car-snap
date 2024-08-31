export default defineEventHandler(async (event) => {
  /* 
    VALIDATE QUERY PARAMS
    make TO BE NON EMPTY/UNDEFINED STRING
  */
  const { success, data, error } = await getValidatedQuery(
    event,
    MakeYearsQuerySchema.safeParse
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'BAD REQUEST',
      message: 'INVALID QUERY: make',
      data: error.issues,
    });
  }

  const { Years } = await autoSyncStudioApi<MakeYearsResponse>(
    '/vehicles/years',
    {
      method: 'GET',
      query: {
        'f-make': data.make,
        'p-size': 500,
      },
    }
  );

  // REVERSES TO ORDER ITEMS DESC
  const makeYears = Years.map((year): Year => {
    return {
      id: year,
      name: String(year),
    };
  }).reverse();

  return makeYears;
});
