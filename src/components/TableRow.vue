<template>
  <tr :class="rowClass">
    <slot />
  </tr>
</template>

<script setup>
defineProps(["rowClass"]);
</script>
