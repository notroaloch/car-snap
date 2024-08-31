<template>
  <div
    class="flex bg-gray-100 p-1 md:flex-col md:justify-start dark:bg-gray-800"
  >
    <div
      v-for="item in navbarItems"
      :key="item.id"
      class="flex grow cursor-pointer justify-center rounded-md p-2 text-gray-500 md:grow-0"
      :class="{
        'text-primary dark:text-primary bg-white shadow-sm dark:bg-gray-900':
          item.to === route.path,
      }"
      @click="handleNavigation(item.to)"
    >
      <UIcon :name="item.icon" class="size-5" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const handleNavigation = (path: string) => {
    return navigateTo(path);
  };

  type NavbarItem = {
    id: string;
    label: string;
    icon: string;
    to: string;
  };

  const navbarItems: NavbarItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: 'ph:house',
      to: '/',
    },
    {
      id: 'search',
      label: 'Search',
      icon: 'ph:magnifying-glass',
      to: '/search',
    },
    {
      id: 'visualizer',
      label: 'Visualizer',
      icon: 'ph:car-simple',
      to: '/visualizer',
    },
  ];
</script>

<style scoped></style>
