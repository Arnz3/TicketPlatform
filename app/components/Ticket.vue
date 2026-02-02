<template>
  <UCard>
    <h5>Dit is een ticket</h5>
    <ul>
      <li>{{ ticket.title }}</li>
      <li>{{ ticket.price }}</li>
    </ul>
    <template #footer>
      <UButton>Buy</UButton>
    </template>
    </UCard>
</template>

<script lang="ts" setup>
import type { Ticket } from '~/types';
defineProps<{
  ticket: Ticket
}>()

</script>

<style>

</style>