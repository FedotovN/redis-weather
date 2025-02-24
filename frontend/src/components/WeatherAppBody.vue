<template>
  <div class="flex flex-wrap gap-2 items-center justify-between w-full overflow-hidden">
    <div class="flex w-full gap-2 items-center justify-between">
      <div v-if="isLoadingWeatherConditions" class="flex justify-center items-center w-full h-32 border-1 border-neutral-700 rounded-xs shadow-lg bg-neutral-800">
        <base-loader color="success" size="50px" />
      </div>
      <location-input-modal
          v-else-if="getTodayTemperature"
          :temperature="getTodayTemperature"
      />
      <div v-if="isLoadingWeatherConditions" class="flex justify-center items-center w-full h-32 border-1 border-neutral-700 rounded-xs shadow-lg bg-neutral-800">
        <base-loader color="success" size="50px" />
      </div>
      <selected-day-info
          v-else-if="getSelectedDay"
          :humidity="getSelectedDay.humidity"
          :sunrise-time="getSelectedDay.sunrise"
          :sunset-time="getSelectedDay.sunset"
          :wind-speed="getSelectedDay.windspeed"
      />
    </div>
    <trailing-temperature
        v-if="getSelectedDay"
        :temperature="getSelectedDay.temp"
        :datetime="getSelectedDay.datetime"
        :hours="getSelectedDay.hours"
    />
  </div>
  <div v-if="isLoadingWeatherConditions" class="flex justify-center items-center w-full h-40 border-1 border-neutral-700 rounded-xs shadow-lg bg-neutral-800">
    <base-loader color="success" size="50px" />
  </div>
  <div v-if="isLoadingWeatherConditions" class="flex flex-col gap-2">
    <p>Weather conditions for next 14 days:</p>
    <div class="flex justify-center items-center w-full h-93 border-1 border-neutral-700 rounded-xs shadow-lg bg-neutral-800">
      <base-loader color="success" size="50px" label="Getting weather info" />
    </div>
  </div>
  <div v-else-if="daysWeatherInfo.length" class="flex flex-col gap-2">
    <p>Weather conditions for next 14 days:</p>
    <div class="flex gap-2 w-full max-h-96 overflow-y-scroll overflow-x-visible">
      <weather-info-listing
          :days-info="daysWeatherInfo"
          :location-name="locationName"
          :selected-ind="selectedDayIndex"
          @select="onSelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import LocationInputModal from "@/components/LocationInputModal.vue";
import {computed, onMounted, ref} from "vue";
import WeatherInfoListing from "@/components/WeatherInfoListing/WeatherInfoListing.vue";
import {BaseLoader, useToast} from "kneekeetah-vue-ui-kit";
import TrailingTemperature from "@/components/DetailedView/TrailingTemperature.vue";
import SelectedDayInfo from "@/components/DetailedView/SelectedDayInfo.vue";

const props = defineProps<{
  location: string;
}>();

const isLoadingWeatherConditions = ref(true);
const daysWeatherInfo = ref([]);
const locationName = ref('');
const selectedDayIndex = ref(0);

onMounted(async () => {
  isLoadingWeatherConditions.value = true;
  try {
    await getWeatherConditions();
    isLoadingWeatherConditions.value = false;
  } catch (e) {
    console.error(e)
    useToast().add({
      color: 'alert',
      content: 'Something went wrong while getting weather conditions. Please try again later.',
      delay: 5000,
    });
  }
})

const getSelectedDay = computed(() => {
  return daysWeatherInfo.value[selectedDayIndex.value];
})

const getTodayTemperature = computed(() => {
  if (!daysWeatherInfo.value.length) { return null }
  return daysWeatherInfo.value[0].temp;
});

async function getWeatherConditions() {
  const body = { location: props.location };
  const parameters = {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  };
  const { hostname, protocol } = window.location;
  const endpoint = 'api/weather/condition';
  const response = await fetch(`${protocol}//${hostname}:3000/${endpoint}`, parameters);
  const { data } = await response.json();
  const {
    resolvedAddress,
    days,
  } = data;
  locationName.value = resolvedAddress;
  daysWeatherInfo.value = days;
}
function onSelect(index: number) {
  selectedDayIndex.value = index;
}
</script>

<style lang="scss" scoped>

</style>