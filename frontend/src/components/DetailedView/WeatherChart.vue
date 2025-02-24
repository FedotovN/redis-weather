<template>
  <Line
      ref="line"
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"

  >

  </Line>
</template>

<script setup lang="ts">
  import { Line } from "vue-chartjs";

  import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, CategoryScale, LinearScale, LineElement} from 'chart.js'

  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

  import {computed, onMounted, ref} from "vue";

  const props = defineProps<{
    hours: Array<{ time: string; temperature:number }>;
  }>();

  const chartData = computed(() => {
    return {
      labels: props.hours.map((h) => h.time),
      datasets: [
        {
          data: props.hours.map((h) => h.temperature),
          lineTension: 0.4,
        }
      ]
    }
  })
  const chartOptions = ref({
    pointBackgroundColor: 'oklch(0.871 0.15 154.449)',
    borderColor: 'oklch(0.871 0.15 154.449)',
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false // Hide X axis labels
      }
    },
    plugins: {
      legend: {
        display: false
      },
    }
  });
  const line = ref(null);
</script>

<style scoped>

</style>