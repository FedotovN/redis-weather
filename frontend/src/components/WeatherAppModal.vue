<template>
  <div class="flex flex-col justify-center max-w-xl w-full gap-2 pb-4 p-2">
    <h1 class="pb-4 text-xl">
      <span class="text-green-300">Node⛈</span>Weather
    </h1>
    <div v-if="isGettingGeolocation || !timeElapsed" class="flex w-full flex-col gap-2 justify-center items-center h-[708px] border-1 border-neutral-700 bg-neutral-800 rounded-xs">
      <base-loader size="70px" :finished="!isGettingGeolocation" color="success"></base-loader>
      <p v-if="!isGettingGeolocation" class="text-sm">Geolocation permissions granted</p>
    </div>
    <weather-app-body v-else :location="location"  />
  </div>
</template>

<script setup lang="ts">
import WeatherAppBody from "@/components/WeatherAppBody.vue";
import {onMounted, ref} from "vue";
import {BaseLoader} from "kneekeetah-vue-ui-kit";

const isGettingGeolocation = ref(true);
const location = ref('');
const timeElapsed = ref(false);

onMounted(async () => {
  const isGeolocationAvailable = "geolocation" in navigator;
  if (!isGeolocationAvailable) return;
  isGettingGeolocation.value = true;
  await getUserLocation();
})


async function onSuccessfullyGetGeolocation(position: GeolocationPosition) {
  const { latitude, longitude } = position.coords;
  location.value = `${latitude}, ${longitude}`;
  isGettingGeolocation.value = false;
  await new Promise(resolve => setTimeout(resolve, 1000));
  timeElapsed.value = true;
}
function onUnsuccessfullyGetGeolocation(error: GeolocationPositionError) {
  console.error(error.message, error.code);
}
async function getUserLocation() {
  navigator.geolocation.getCurrentPosition(onSuccessfullyGetGeolocation, onUnsuccessfullyGetGeolocation);
}
</script>