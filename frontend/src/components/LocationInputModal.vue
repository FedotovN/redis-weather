<template>
  <div class="w-1/2 h-32 border-1 border-neutral-700 rounded-xs shadow-lg bg-neutral-800">
    <div class="flex flex-col gap-4 justify-center px-4 py-4">
      <p class="text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
        Current conditions
      </p>
      <div v-if="temperature !== null" class="flex items-end gap-2">
        <p class="text-4xl text-green-300">
          {{ getCelciusTemperature(temperature) }}°C
        </p>
        <small class="text-xl text-green-200">{{ temperature }}°F</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getCelciusTemperature} from "../../utils/temperature.util";
defineProps<{
  temperature?: number;
}>();

</script>