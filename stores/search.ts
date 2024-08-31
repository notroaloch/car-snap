export const useSearchStore = defineStore('search', () => {
  const makes = ref<Make[]>();
  const years = ref<Year[]>();
  const models = ref<Model[]>();
  const submodels = ref<Submodel[]>();

  const fetchMakes = async () => {
    makes.value = await $fetch('/api/makes');
    return makes.value;
  };

  const fetchYears = async ({ make }: { make: string }) => {
    years.value = await $fetch('/api/makes/years', {
      query: {
        make,
      },
    });
    return years.value;
  };

  const fetchModels = async ({
    make,
    year,
  }: {
    make: string;
    year: number;
  }) => {
    models.value = await $fetch('/api/models', {
      query: {
        make,
        year,
      },
    });
    return models.value;
  };

  const fetchSubmodels = async ({
    make,
    year,
    model,
  }: {
    make: string;
    year: number;
    model: string;
  }) => {
    submodels.value = await $fetch('/api/submodels', {
      query: { make, year, model },
    });
    return submodels.value;
  };

  const getRandomVehicle = async () => {
    return await $fetch('/api/vehicles/random');
  };

  return {
    makes,
    years,
    models,
    submodels,
    fetchMakes,
    fetchYears,
    fetchModels,
    fetchSubmodels,
    getRandomVehicle,
  };
});
