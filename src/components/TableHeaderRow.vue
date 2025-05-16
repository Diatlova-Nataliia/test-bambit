<template>
  <tr class="headerRowClass">
    <slot />
  </tr>
</template>

<script setup>
defineProps(["headerRowClass"]);
</script>
