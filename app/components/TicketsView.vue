<template>
  <section class="grid grid-cols-3 gap-4">
    <Ticket 
      v-for="ticket in tickets"
      :ticket="ticket" 
      :key="ticket.id"
    />
  </section>
</template>

<script lang="ts" setup>

const tickets = ref([
  {
    id: 1,
    title: "Regular",
    price: 45.5
  },
  {
    id: 2,
    title: "VIP",
    price: 95.5
  },
  {
    id: 3,
    title: "early",
    price: 15
  },
])
</script>

<style>

</style>