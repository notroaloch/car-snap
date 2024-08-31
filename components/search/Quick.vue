<template>
  <div class="space-y-4">
    <UFormGroup size="xl" label="Query" class="space-y-2" required>
      <UInputMenu
        v-model="selectedVehicle"
        :search="search"
        :loading="isLoadingResults"
        placeholder="Type to search..."
        option-attribute="name"
        trailing
        by="id"
      >
        <template #option-empty="{ query }">
          <q>{{ query }}</q> not found
        </template>
        <template #empty>No data</template>
      </UInputMenu>
    </UFormGroup>
    <UButton
      size="xl"
      color="primary"
      variant="soft"
      label="View"
      :disabled="!selectedVehicle"
      block
      @click="handleClick"
    />
  </div>
</template>

<script setup lang="ts">
  const isLoadingResults = ref(false);
  const selectedVehicle = ref<Vehicle>();

  const handleClick = () => {
    return navigateTo({
      path: '/visualizer',
      query: {
        id: selectedVehicle.value.id,
      },
    });
  };

  const search = async (query: string) => {
    if (!query) return [];

    isLoadingResults.value = true;

    const result = await $fetch<Submodel[]>('/api/vehicles/search', {
      query: {
        query,
      },
    });

    const vehicles = result.map((vehicle) => {
      return {
        ...vehicle,
        name: `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.submodel} (${vehicle.body})`,
      };
    });

    isLoadingResults.value = false;
    return vehicles;
  };
</script>

<style scoped></style>
