export const useVisualizerStore = defineStore('visualizer', () => {
  const vehicle = ref<Vehicle>();
  const selectedVehicleColor = ref<Color>();

  watch(
    vehicle,
    () => {
      selectedVehicleColor.value = undefined;
    },
    { immediate: true }
  );

  const vehicleColors = computed(() => {
    return vehicle.value?.colors;
  });

  const vehicleDefaultColor = computed(() => {
    return vehicleColors.value?.filter(
      (color) => color.id === vehicle.value?.defaultColorId
    )[0];
  });

  const vehicleIsoImageUrl = computed(() => {
    if (!vehicle.value) return undefined;
    if (!vehicleDefaultColor.value) return undefined;
    if (!selectedVehicleColor.value) return vehicle.value.images.isoView[2400];

    const isColorAvailableView = selectedVehicleColor.value.images.isoView;
    if (!isColorAvailableView) return undefined;

    const baseImageUrl = vehicle.value.images.isoView[2400];
    const imageUrl = baseImageUrl.replace(
      vehicleDefaultColor.value.code,
      selectedVehicleColor.value.code
    );

    return imageUrl;
  });

  const vehicleSideImageUrl = computed(() => {
    if (!vehicle.value) return undefined;
    if (!vehicleDefaultColor.value) return undefined;
    if (!selectedVehicleColor.value) return vehicle.value.images.sideView[2400];

    const isColorAvailableView = selectedVehicleColor.value.images.sideView;
    if (!isColorAvailableView) return undefined;

    const baseImageUrl = vehicle.value.images.sideView[2400];
    const imageUrl = baseImageUrl.replace(
      vehicleDefaultColor.value.code,
      selectedVehicleColor.value.code
    );

    return imageUrl;
  });

  const vehicleRearImageUrl = computed(() => {
    if (!vehicle.value) return undefined;
    if (!vehicleDefaultColor.value) return undefined;
    if (!selectedVehicleColor.value) return vehicle.value.images.rearView[2400];

    const isColorAvailableView = selectedVehicleColor.value.images.rearView;
    if (!isColorAvailableView) return undefined;

    const baseImageUrl = vehicle.value.images.rearView[2400];
    const imageUrl = baseImageUrl.replace(
      vehicleDefaultColor.value.code,
      selectedVehicleColor.value.code
    );

    return imageUrl;
  });

  watch(
    vehicleDefaultColor,
    (defaultColor) => {
      if (selectedVehicleColor.value) return;
      selectedVehicleColor.value = defaultColor;
    },
    { immediate: true }
  );

  const fetchVehicleById = async (id: number) => {
    vehicle.value = await $fetch(`/api/vehicles/${id}`);
    return vehicle.value;
  };

  return {
    vehicle,
    vehicleColors,
    fetchVehicleById,
    vehicleDefaultColor,
    selectedVehicleColor,
    vehicleIsoImageUrl,
    vehicleSideImageUrl,
    vehicleRearImageUrl,
  };
});
