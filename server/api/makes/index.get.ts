export default defineEventHandler(async (_event) => {
  const { Makes, LogoUrlBase } = await autoSyncStudioApi<MakesResponse>(
    '/vehicles/makes',
    {
      method: 'GET',
      query: {
        'p-size': 10000,
        'i-logos': true,
        'i-vehicleCount': true,
      },
    }
  );

  const makes = Makes.map((make): Make => {
    return {
      id: make.Id,
      logoUrl: LogoUrlBase.concat(make.Logo),
      name: make.Make,
      vehicleCount: make.VehicleCount,
    };
  });

  return makes;
});
