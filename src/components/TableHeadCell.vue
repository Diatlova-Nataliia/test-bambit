<template>
  <th
    :class="headerCellClass"
    @click="emitSort"
    class="cursor-pointer select-none"
  >
    {{ label }}{{ sortOrder === "asc" ? "↑" : "↓" }}
  </th>
</template>

<script setup>
import { computed } from "vue";

const { label, activeSortKey, sortOrder, sortKey, headerCellClass } =
  defineProps([
    "label",
    "headerCellClass",
    "sortKey",
    "sortOrder",
    "activeSortKey",
  ]);

const emit = defineEmits(["sort"]);

function emitSort() {
  const order = sortOrder === "asc" ? "desc" : "asc";

  emit("sort", { key: sortKey, order });
}
</script>
