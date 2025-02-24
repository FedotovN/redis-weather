<template>
  <div class="flex flex-col gap-4 bg-neutral-900 text-gray-300 h-screen w-screen flex justify-center items-center">
    <weather-app-modal />
    <overlay-toast />
  </div>
</template>

<script setup lang="ts">
import { OverlayToast } from "kneekeetah-vue-ui-kit";
import WeatherAppModal from "@/components/WeatherAppModal.vue";

</script>
<style>
</style>