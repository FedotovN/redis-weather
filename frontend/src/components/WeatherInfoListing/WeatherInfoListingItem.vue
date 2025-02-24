<template>
  <div
      class="w-full h-30 border-1 rounded-xs shadow-lg bg-neutral-800 px-4 py-2 cursor-pointer hover:border-green-300"
      tabindex="0"
      :class="{
          'border-green-300': isSelected,
          'border-neutral-700': !isSelected,
      }"
      @click="onSelect"
      @select="onSelect"
      @keydown.enter="onSelect"
  >
    <div class="flex justify-between items-center">
      <p class="m-0">
        {{ getDayName(datetime) }}
      </p>
      <div class="flex gap-4 items-center">
        <div class="temperature-grid flex gap-2 items-center">
          <small class="text-sm">
            <span class="flex">
              {{ getCelciusTemperature(temperature) }}°C
            </span>
            <base-tooltip>
              Minimum temperature: {{ getCelciusTemperature(tempMin) }}<br>
              Maximum temperature: {{ getCelciusTemperature(tempMax) }}<br>
            </base-tooltip>
          </small>
        </div>
        <div class="flex justify-center items-center h-8 text-2xl">
          {{ getDayIcon(icon) }}
        </div>
      </div>
    </div>
    <div class="flex justify-between">
      <small class="text-gray-400">
        {{ description }}
      </small>
      <small>Feels like {{getCelciusTemperature(tempFeelsLike)}}°C</small>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { BaseTooltip } from "kneekeetah-vue-ui-kit";
  import { getCelciusTemperature } from "../../../utils/temperature.util";
  import { getDayIcon } from "../../../utils/icon.util";
  import { getDayName } from "../../../utils/day-name.util";

  defineProps<{
    temperature: number;
    tempMin: number;
    tempMax: number;
    tempFeelsLike: number;
    datetime: string;
    description: string;
    icon: string;
    dew: number;
    isSelected: boolean;
  }>();
  const emit = defineEmits(['select']);
  function onSelect() {
    emit('select');
  }
</script>

<style scoped>
.temperature-grid {
  display: grid;
}
</style>