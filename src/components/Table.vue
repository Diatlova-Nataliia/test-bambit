<template>
  <table
    class="border-separate border-spacing-0 table-auto text-sm text-gray-500 dark:text-gray-400"
  >
    <thead
      class="sticky top-0 bg-white z-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
    >
      <TableHeaderRow headerRowClass="border-b border-gray-300 px-2 py-1">
        <TableHeadCell
          v-for="column in columns"
          :key="column.key"
          headerCellClass="px-6 py-3"
          :label="headerNames[column.key]"
          :sortKey="column.key"
          :activeSortKey="sortKey"
          :sortOrder="sortOrder"
          @sort="$emit('sort', $event)"
        />
      </TableHeaderRow>
    </thead>
    <tbody>
      <TableRow
        v-for="item in items"
        :key="item.id"
        rowClass="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
      >
        <TableCell
          v-for="column in columns"
          :key="column"
          :value="item[column.key]"
          :isLink="column.isLink"
          :truncate="
            ['title', 'url', 'thumbnailUrl'].includes(column.key) &&
            item[column.key].length > 21
          "
          cellClass=" py-4  max-w-36 text-center relative"
          linkClass="text-blue-600 hover:underline max-w-36 px-2"
          target="_blank"
        />
      </TableRow>
    </tbody>
  </table>
</template>

<script setup>
import TableHeaderRow from "./TableHeaderRow.vue";
import TableHeadCell from "./TableHeadCell.vue";
import TableRow from "./TableRow.vue";
import TableCell from "./TableCell.vue";

defineEmits(["sort"]);

const { items, headerNames, columns, sortKey, sortOrder } = defineProps({
  items: Array,
  headerNames: Object,
  columns: Array,
  sortKey: String,
  sortOrder: String,
});
</script>
