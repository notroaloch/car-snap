<template>
  <div class="flex md:flex-col md:gap-8">
    <div class="w-1/2 space-y-2 md:w-full">
      <p class="line-clamp-2 text-xl tracking-tighter">
        <!-- eslint-disable-next-line vue/html-self-closing -->
        {{ `${vehicle.year} ${vehicle.make}` }}<br />{{
          `${vehicle.model} ${vehicle.submodel}`
        }}
      </p>
      <p class="line-clamp-2 tracking-tighter">
        <!-- eslint-disable-next-line vue/html-self-closing -->
        {{ vehicle.type }}/{{ vehicle.body }}
      </p>
    </div>
    <div class="w-1/2 space-y-2 md:w-full">
      <p class="text-sm">Paint Colors</p>
      <UPopover :popper="{ placement: 'bottom-start' }" class="w-fit">
        <div class="flex items-start gap-3">
          <UAvatar
            size="xs"
            class="ring-1 dark:ring-white"
            :src="selectedVehicleColor?.swatchUrl"
            :alt="selectedVehicleColor?.name"
          />
          <p class="line-clamp-2 text-pretty">
            {{ selectedVehicleColor?.name }}
          </p>
        </div>

        <template #panel>
          <div class="flex w-48 flex-wrap items-center justify-start gap-1 p-2">
            <UAvatar
              v-for="color in vehicleColors"
              :key="color.id"
              :src="color.swatchUrl"
              :alt="color.name"
              :class="{
                'scale-105 ring-2':
                  selectedVehicleColor && color.id === selectedVehicleColor.id,
              }"
              class="cursor-pointer ring-black transition-all duration-100 ease-in hover:ring-1 dark:ring-white"
              @click="selectedVehicleColor = color"
            />
          </div>
        </template>
      </UPopover>
    </div>
  </div>
</template>

<script setup lang="ts">
  const visualizerStore = useVisualizerStore();
  const { vehicle, vehicleColors, selectedVehicleColor } =
    storeToRefs(visualizerStore);
</script>

<style scoped></style>
