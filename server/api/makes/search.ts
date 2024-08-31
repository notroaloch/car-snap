export default defineEventHandler(async (event) => {
  /* 
      VALIDATE QUERY PARAMS
      make TO BE NON EMPTY/UNDEFINED STRING
    */
  const { success, data, error } = await getValidatedQuery(
    event,
    MakeSearchQuerySchema.safeParse
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'BAD REQUEST',
      message: 'INVALID QUERY: make',
      data: error.issues,
    });
  }

  const makes = await $fetch('/api/makes');
  const make = makes.find(
    (make) => make.name.toUpperCase() === data.make.toUpperCase()
  );

  return make;
});
