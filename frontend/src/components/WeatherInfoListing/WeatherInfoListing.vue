<template>
  <div class="flex flex-col gap-2 max-h-full w-full">
    <weather-info-listing-item
        v-for="(day, ind) in daysInfo"
        :temperature="day.temp"
        :temp-min="day.tempmin"
        :temp-max="day.tempmax"
        :datetime="day.datetime"
        :temp-feels-like="day.feelslike"
        :description="day.description"
        :icon="day.icon"
        :dew="day.dew"
        :is-today="ind === 0"
        :is-selected="selectedInd === ind"
        @select="onSelect(ind)"
    />
  </div>
</template>

<script setup lang="ts">
  import WeatherInfoListingItem from "@/components/WeatherInfoListing/WeatherInfoListingItem.vue";

  defineProps<{
    daysInfo: Array<object>,
    locationName: string,
    selectedInd: number,
  }>();

  const emit = defineEmits(['select'])
  function onSelect(ind: number) {
    emit('select', ind);
  }
</script>

<style scoped>

</style>