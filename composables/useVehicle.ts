export const useVehicle = () => {
  const getModelsWithBodyTypeInName = (models: Model[]) => {
    return models?.map((model) => {
      return { ...model, name: `${model.model} - ${model.body}` };
    });
  };

  const filterSubmodelsByBody = (submodels: Submodel[], body: string) => {
    return submodels?.filter((submodel) => submodel.body === body);
  };

  return { getModelsWithBodyTypeInName, filterSubmodelsByBody };
};
