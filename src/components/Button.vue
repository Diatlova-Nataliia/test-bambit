<template xmlns="http://www.w3.org/1999/html">
  <button type="button" v-bind="attrs">
    <slot />
  </button>
</template>

<script setup>
import { useAttrs } from "vue";

const attrs = useAttrs();
</script>
