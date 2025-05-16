<script setup>
import Input from "./components/Input.vue";
import Button from "./components/Button.vue";
import Table from "./components/Table.vue";
import { usePaginationStore } from "../stores/items";
import { onMounted, ref } from "vue";

const store = usePaginationStore();
const scroller = ref(null);
const message = ref("");
const isDark = ref(false);

const headerNames = {
  id: "ID",
  albumId: "Альбом",
  title: "Название",
  url: "Ссылка",
  thumbnailUrl: "Миниатюра",
};

const columns = [
  { key: "id", isLink: false },
  { key: "albumId", isLink: false },
  { key: "title", isLink: false },
  { key: "url", isLink: true },
  { key: "thumbnailUrl", isLink: true },
];

function onSearch() {
  store.getAllItemsNumber();
  store.reset();
  const ids = message.value
    .split(/\s+/)
    .map((n) => Number(n))
    .filter((n) => Number.isInteger(n) && n > 0);

  store.setFilterAlbumIds(ids);
}

function onSort({ key, order }) {
  store.setSort(key, order);
}

function onScroll() {
  const el = scroller.value;
  // когда почти у низа контейнера, подгружаем следующую страницу
  if (
    !store.loading &&
    store.page * store.limit < store.total &&
    el.scrollTop + el.clientHeight >= el.scrollHeight - 10
  ) {
    store.nextPage();
  }
  console.log(store.total);
}

function toggleTheme() {
  isDark.value = !isDark.value;
  const html = document.documentElement;
  if (isDark.value) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark"); // ← ОБЯЗАТЕЛЬНО!
  }
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
}

onMounted(async () => {
  await store.getAllItemsNumber();
  store.getItems();
  isDark.value = document.documentElement.classList.contains("dark");
});
</script>

<template>
  <div class="h-screen">
    <div class="flex justify-between p-4 gap-4">
      <Button
        @click="toggleTheme"
        class="relative w-14 h-8 bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 focus:outline-none shadow-inner"
      >
        <span
          class="absolute top-1 left-1 w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow transform transition-transform duration-300"
          :class="{ 'translate-x-6': isDark }"
        ></span>
        <span class="absolute left-2 top-1.5 text-xs" v-if="!isDark">☀️</span>
        <span class="absolute right-2 top-1.5 text-xs" v-else>🌙</span>
      </Button>
      <Input
        v-model="message"
        placeholder="Введите ID альбомов через пробел (например: 1 2 3)"
        inputClass="w-5/6 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-indigo-500 hover:border-indigo-300 shadow-sm focus:shadow"
      />
      <Button
        @click="onSearch"
        class="w-1/6 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-slate-200 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >Поиск
      </Button>
    </div>
    <div class="flex justify-center">
      <div
        ref="scroller"
        @scroll="onScroll"
        class="rounded-lg overflow-hidden overflow-y-auto border border-gray-300 w-[600px] h-[600px]"
      >
        <Table
          :items="store.items"
          :headerNames="headerNames"
          :sortKey="store.sortKey"
          :sortOrder="store.sortOrder"
          :columns="columns"
          @sort="onSort"
        />
      </div>
    </div>
  </div>
</template>
