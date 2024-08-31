<template>
  <div class="h-full w-full">
    <div v-if="!vehicle" class="flex h-full w-full items-center justify-center">
      <UButton
        to="/search"
        size="xl"
        color="primary"
        variant="link"
        label="First, search a vehicle to visualize it"
      />
    </div>
    <div
      v-else
      class="flex h-full w-full flex-col gap-3 overflow-clip md:flex-row"
    >
      <VisualizerViewport
        class="hide-scrollbar grow overflow-y-auto md:order-last"
      />
      <VisualizerToolbar
        class="max-h-32 w-full rounded-lg bg-gray-100 p-3 md:max-h-full md:min-w-[200px] md:max-w-[250px] dark:bg-gray-800"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const visualizerStore = useVisualizerStore();
  const { fetchVehicleById } = visualizerStore;
  const { vehicle } = storeToRefs(visualizerStore);

  if (route.query.id) {
    vehicle.value = await fetchVehicleById(route.query.id);
  }
</script>

<style scoped></style>
