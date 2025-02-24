<template>
  <div class="flex flex-col gap-2 w-full h-40 border-1 border-neutral-700 rounded-xs shadow-lg bg-neutral-800 px-4 py-4">
    <div class="flex justify-between items-center">
      <span>Trailing 24 hours temperature, °C</span>
    </div>
    <div class="flex justify-between items-center relative overflow-hidden h-full w-full">
      <weather-chart :hours="getHours" />
    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherChart from "@/components/DetailedView/WeatherChart.vue";
import {computed} from "vue";
import {getCelciusTemperature} from "../../../utils/temperature.util";

const props = defineProps<{
  temperature: number;
  datetime: string;
  hours: Array<object>;
}>();

const getHours = computed(() => {
  return props.hours.map((h) => ({ time: h.datetime, temperature: getCelciusTemperature(h.temp) }));
})
</script>

<style scoped>

</style>