<template>
  <div class="flex h-dvh w-dvw flex-col overflow-clip md:flex-row">
    <div class="grow overflow-x-auto p-5 md:order-last">
      <slot />
    </div>
    <Navbar class="mx-2 mb-2 rounded-lg md:mx-0 md:my-2 md:ml-3" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
