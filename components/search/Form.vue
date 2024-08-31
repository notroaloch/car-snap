<template>
  <UTabs :items="tabItems">
    <template #item="{ item }">
      <component :is="item.component" class="p-3" />
    </template>
  </UTabs>
</template>

<script setup lang="ts">
  import { LazySearchQuick, LazySearchAdvanced } from '#components';

  type TabItem = {
    id: string;
    label: string;
    icon: string;
    component: Component | string;
  };

  const tabItems: TabItem[] = [
    {
      label: 'Quick',
      icon: 'ph:lightning',
      component: LazySearchQuick,
    },
    {
      label: 'Advanced',
      icon: 'ph:gear',
      component: LazySearchAdvanced,
    },
  ];
</script>

<style scoped></style>
