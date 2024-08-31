export default defineEventHandler(async (_event) => {
  const makes = await $fetch('/api/makes');
  const randomMake = makes[Math.floor(Math.random() * makes.length)];

  const makeYears = await $fetch('/api/makes/years', {
    query: { make: randomMake.name },
  });
  const randomYear = makeYears[Math.floor(Math.random() * makeYears.length)];

  const models = await $fetch('/api/models', {
    query: { make: randomMake.name, year: randomYear.name },
  });
  const randomModel = models[Math.floor(Math.random() * models.length)];

  const submodels = await $fetch('/api/submodels', {
    query: {
      make: randomMake.name,
      year: randomYear.name,
      model: randomModel.model,
    },
  });
  const randomSubmodel =
    submodels[Math.floor(Math.random() * submodels.length)];

  const randomVehicle = await $fetch(`/api/vehicles/${randomSubmodel.id}`);
  return randomVehicle;
});
