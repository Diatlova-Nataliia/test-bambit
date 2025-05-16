<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    :class="inputClass"
  />
</template>

<script setup>
defineProps(["modelValue", "placeholder", "inputClass"]);
defineEmits(["update:modelValue"]);
</script>
