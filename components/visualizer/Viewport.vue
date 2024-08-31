<template>
  <div class="snap-y snap-mandatory">
    <div
      v-if="vehicleIsoImageUrl"
      class="flex h-full snap-center items-center justify-center"
    >
      <NuxtImg
        :src="vehicleIsoImageUrl"
        width="2400"
        height="1500"
        loading="lazy"
      />
    </div>
    <div
      v-if="vehicleSideImageUrl"
      class="flex h-full snap-center items-center justify-center"
    >
      <NuxtImg
        :src="vehicleSideImageUrl"
        width="2400"
        height="1500"
        loading="lazy"
      />
    </div>
    <div
      v-if="vehicleRearImageUrl"
      class="flex h-full snap-center items-center justify-center"
    >
      <NuxtImg
        :src="vehicleRearImageUrl"
        width="2400"
        height="1500"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const visualizerStore = useVisualizerStore();
  const { vehicleIsoImageUrl, vehicleSideImageUrl, vehicleRearImageUrl } =
    storeToRefs(visualizerStore);
</script>

<style scoped></style>
