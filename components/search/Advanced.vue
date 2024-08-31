<template>
  <div class="space-y-4">
    <UFormGroup
      v-for="item in selectItems"
      :key="item.id"
      size="xl"
      class="space-y-2"
      :label="item.label"
      required
    >
      <USelectMenu
        :key="item.id"
        v-model="item.selected.value"
        size="xl"
        :options="item.data"
        :option-attribute="item.optionAttribute"
        :loading="item.loading"
        :disabled="item.disabled"
        :placeholder="item.placeholder"
        searchable-placeholder="Type to search ..."
        clear-search-on-close
        searchable
        @change="item.onChange"
      >
        <template #option-empty="{ query }">
          <q>{{ query }}</q> not found
        </template>
        <template #empty>No data</template>
      </USelectMenu>
    </UFormGroup>
    <UButton
      size="xl"
      color="primary"
      variant="soft"
      label="View"
      block
      :disabled="!selectedSubmodel"
      @click="handleClick"
    />
  </div>
</template>

<script setup lang="ts">
  const searchStore = useSearchStore();
  const { fetchMakes, fetchYears, fetchModels, fetchSubmodels } =
    useSearchStore();
  const { makes, years, models, submodels } = storeToRefs(searchStore);
  const { getModelsWithBodyTypeInName, filterSubmodelsByBody } = useVehicle();

  const isLoadingMakes = ref(true);
  const isLoadingYears = ref(false);
  const isLoadingModels = ref(false);
  const isLoadingSubmodels = ref(false);

  const selectedMake = useState<Make>('selectedMake');
  const selectedYear = useState<Year>('selectedYear');
  const selectedModel = useState<Model>('selectedModel');
  const selectedSubmodel = useState<Submodel>('selectedSubmodel');

  await fetchMakes();
  isLoadingMakes.value = false;

  const handleClick = () => {
    return navigateTo({
      path: '/visualizer',
      query: {
        id: selectedSubmodel.value.id,
      },
    });
  };

  type SelectItem = {
    id: string;
    label: string;
    placeholder: string;
    data: unknown;
    selected: unknown;
    optionAttribute: string;
    loading: boolean;
    disabled: boolean;
    onChange?: () => void;
  };

  const selectItems: SelectItem[] = computed(() => [
    {
      id: 'make',
      label: 'Make',
      placeholder: 'Select a make',
      data: makes.value as Makes[],
      selected: selectedMake as Ref<Make>,
      optionAttribute: 'name',
      loading: isLoadingMakes.value,
      disabled: false,
      onChange: async () => {
        selectedYear.value = undefined;
        selectedModel.value = undefined;
        selectedSubmodel.value = undefined;

        isLoadingYears.value = true;
        await fetchYears({ make: selectedMake.value.name });
        isLoadingYears.value = false;
      },
    },
    {
      id: 'year',
      label: 'Year',
      placeholder: 'Select a year',
      data: years.value as Year[],
      selected: selectedYear as Ref<Year>,
      optionAttribute: 'name',
      loading: isLoadingYears.value,
      disabled: !selectedMake.value,
      onChange: async () => {
        selectedModel.value = undefined;
        selectedSubmodel.value = undefined;

        isLoadingModels.value = true;
        await fetchModels({
          make: selectedMake.value.name,
          year: selectedYear.value.name,
        });
        isLoadingModels.value = false;
      },
    },
    {
      id: 'model',
      label: 'Model',
      placeholder: 'Select a model',
      data: getModelsWithBodyTypeInName(models.value) as Model[],
      selected: selectedModel as Ref<Model>,
      optionAttribute: 'name',
      loading: isLoadingModels.value,
      disabled: !selectedYear.value,
      onChange: async () => {
        selectedSubmodel.value = undefined;

        isLoadingSubmodels.value = true;
        await fetchSubmodels({
          make: selectedMake.value.name,
          year: selectedYear.value.name,
          model: selectedModel.value.model,
        });
        isLoadingSubmodels.value = false;
      },
    },
    {
      id: 'submodel',
      label: 'Submodel',
      placeholder: 'Select a submodel',
      data: filterSubmodelsByBody(
        submodels.value,
        selectedModel.value?.body
      ) as Submodel[],
      selected: selectedSubmodel as Ref<Submodel>,
      optionAttribute: 'submodel',
      loading: isLoadingSubmodels.value,
      disabled: !selectedModel.value,
    },
  ]);
</script>

<style scoped></style>
