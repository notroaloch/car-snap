<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <NuxtImg
      :src="hiResimageUrl"
      :placeholder="lowResimageUrl"
      format="webp"
      width="960"
      height="500"
      class="w-3/4 transition-all"
      placeholder-class="blur-sm"
      loading="lazy"
    />
    <div class="space-y-3">
      <div class="space-y-1">
        <h1
          class="border-b-2 border-gray-800 text-center text-5xl font-black sm:text-6xl md:text-7xl dark:border-white"
        >
          C4R-SNP
        </h1>
        <h3
          class="text-justify font-tanker font-extralight sm:text-lg md:text-xl"
        >
          Visualize any vehicle in high-quality images
        </h3>
      </div>
      <UButton to="/search" label="SEARCH" color="gray" variant="solid" block />
    </div>
  </div>
</template>

<script setup lang="ts">
  const { getRandomVehicle } = useSearchStore();
  const randomVehicle = useState<Vehicle>('randomVehicle');

  const lowResimageUrl = computed(() => {
    return randomVehicle.value?.images.isoView[240];
  });

  const hiResimageUrl = computed(() => {
    return randomVehicle.value?.images.isoView[960];
  });

  await callOnce(async () => {
    randomVehicle.value = await getRandomVehicle();
  });
</script>

<style scoped></style>
