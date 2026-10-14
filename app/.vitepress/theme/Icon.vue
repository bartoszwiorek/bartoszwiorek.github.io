<script setup lang="ts">
defineProps<{ name: 'arrow-up-right' | 'arrow-up' | 'asterisk' }>()
</script>

<template>
  <svg class="ui-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path v-if="name === 'arrow-up-right'" d="M6 18 18 6M6 6h12v12" />
    <path v-else-if="name === 'arrow-up'" d="M12 19V5m-7 7 7-7 7 7" />
    <path v-else d="M12 3v18M3 12h18M5.64 5.64l12.72 12.72M5.64 18.36 18.36 5.64" />
  </svg>
</template>
