<template>
  <div class="container mx-auto p-6 space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow p-6 flex flex-col items-start">
        <div class="text-gray-500 text-xs mb-2">Average Age</div>
  <div class="text-2xl font-bold">{{ averageAgeDisplay }}</div>
      </div>
      <div class="bg-white rounded-lg shadow p-6 flex flex-col items-start">
        <div class="text-gray-500 text-xs mb-2">Addresses Provided</div>
        <div class="text-2xl font-bold">{{ addressesCount }}</div>
      </div>
      <div class="bg-white rounded-lg shadow p-6 flex flex-col items-start">
        <div class="text-gray-500 text-xs mb-2">Number of Users</div>
        <div class="text-2xl font-bold">{{ usersCount }}</div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <div class="text-gray-500 text-xs mb-4">User Distribution by Gender</div>
        <div class="w-full h-72">
          <Doughnut v-if="loaded" :data="chartData" :options="doughnutOptions" />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <div class="text-gray-500 text-xs mb-4">User Distribution by Creation Date</div>
        <div class="w-full h-72">
          <Chart
            v-if="loaded"
            type="bar"
            :data="chart2Data"
            :options="chart2Options"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Doughnut, Chart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { getUsersByGender, getUsersCount, getAddressesCount, getAverageAge, getUsersByCreationDate} from '@/api/statisticsApi'
import { getUsers } from '@/api/userApi.js'

ChartJS.register(
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
)


export default {
  name: 'StatisticsView',
  components: { Doughnut, Chart },
  data: () => ({
    loaded: false,
    chartData: null,
    doughnutOptions: null,
    chart2Data: null,
    chart2Options: null,
    usersCount: 0,
    addressesCount: 0,
    averageAge: 0
  }),
  computed: {
    averageAgeDisplay() {
      return this.averageAge ? this.averageAge.toFixed(1) : '-';
    }
  },
  async mounted () {
    this.loaded = false

    try {
      const userlist = await getUsers()
      const nbUsersByGender = await getUsersByGender(userlist)
      this.usersCount = await getUsersCount(userlist)
      this.addressesCount = await getAddressesCount(userlist)
      this.averageAge = await getAverageAge(userlist)
      const monthlyRegistrations = await getUsersByCreationDate(userlist)
      this.chartData = {
        labels: ['Male', 'Female', 'Other'],
        datasets: [
          {
            label: "Nombre d'utilisateurs",
            backgroundColor: ['#f87979', '#7CBB00', '#00ADEF'],
            borderColor: '#ffffff',
            borderWidth: 2,
            data: [nbUsersByGender.male, nbUsersByGender.female, nbUsersByGender.other]
          }
        ]
      }

      this.doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }

      this.chart2Data = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        datasets: [
          {
            label: 'Utilisateurs inscrits',
            backgroundColor: '#00ADEF',
            borderRadius: 6,
            data: monthlyRegistrations
          }
        ]
      }

      this.chart2Options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: '#6b7280'
            },
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              color: '#6b7280'
            },
            grid: {
              color: '#e5e7eb'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false
          }
        }
      }
      this.loaded = true
    } catch (e) {
      console.error(e)
    }   
  }
}
</script>