<template>
  <div class="flex gap-2 w-1/2 h-32 border-1 border-neutral-700 rounded-xs shadow-lg bg-neutral-800 px-4 py-4">
    <div class="flex flex-col w-full">
      <div class="flex justify-between items-center w-full">
        <span class="whitespace-nowrap w-full">Wind speed:</span>
        <span class="text-green-300 whitespace-nowrap">{{ windSpeed.toFixed(1) }}m/s</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="whitespace-nowrap w-full">Humidity:</span>
        <span class="text-green-300">{{ humidity.toFixed(0) }}%</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="whitespace-nowrap w-full">Sunrise:</span>
        <span class="text-green-300">{{ getTime(sunriseTime) }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="whitespace-nowrap w-full">Sunset:</span>
        <span class="text-green-300">{{ getTime(sunsetTime) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
 const props = defineProps<{
   windSpeed: number,
   humidity: number,
   sunsetTime: string,
   sunriseTime: string,
 }>();
 function getTime(time:string) {
   const [hours, minutes] = time.split(':');
   return `${hours}:${minutes}`
 }
</script>

<style scoped>

</style>