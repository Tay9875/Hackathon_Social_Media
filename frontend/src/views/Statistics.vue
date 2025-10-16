<template>
  <div class="container mx-auto p-6">
    <div class="grid grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6 flex flex-col items-start">
        <div class="text-gray-500 text-xs mb-2">Âge moyen</div>
        <div class="text-2xl  font-bold">{{ averageAgeDisplay }}</div>
      </div>
      <div class="bg-white rounded-lg shadow p-6 flex flex-col items-start">
        <div class="text-gray-500 text-xs mb-2">Adresses renseignées</div>
        <div class="text-2xl font-bold">{{ addressesCount }}</div>
      </div>
      <div class="bg-white rounded-lg shadow p-6 flex flex-col items-start">
        <div class="text-gray-500 text-xs mb-2">Nombre d'utilisateurs</div>
        <div class="text-2xl font-bold">{{ usersCount }}</div>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <div class="text-gray-500 text-xs mb-2">Répartition des utilisateurs par genre</div>
         <div class="w-48 h-48"> 
        <Doughnut v-if="loaded" :data="chartData" />
      </div>
    </div>
      </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import {  getUsersByGender, getUsersCount, getAddressesCount, getAverageAge } from '@/api/statisticsApi';
import { getUsers } from '@/api/userApi.js';

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'DoughnutChart',
  components: { Doughnut },
  data: () => ({
    loaded: false,
    chartData: null,
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
      this.chartData = {
        labels: ['Male', 'Female'],
        datasets: [
          {
            label: 'Number of users',
            backgroundColor: ['#f87979', '#7CBB00'],
            data: [nbUsersByGender.male, nbUsersByGender.female]
          }
        ]
      }
      this.loaded = true
    } catch (e) {
      console.error(e)
    }   
  }
}
</script>