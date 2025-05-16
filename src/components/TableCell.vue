<template>
  <td :class="cellClass">
    <template v-if="truncate">
      <div class="relative group inline-block">
        <template v-if="isLink && value">
          <a
            :href="value"
            :target="target"
            :class="[linkClass, 'truncate', 'block']"
          >
            {{ value }}
          </a>
        </template>
        <template v-else>
          <span class="truncate block max-w-36">{{ value }}</span>
        </template>
        <div
          class="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10"
        >
          {{ value }}
        </div>
      </div>
    </template>
    <template v-else>
      {{ value }}
    </template>
  </td>
</template>

<script setup>
const { value, isLink, truncate, cellClass, linkClass, target } = defineProps([
  "value",
  "isLink",
  "truncate",
  "cellClass",
  "linkClass",
  "target",
]);
</script>
