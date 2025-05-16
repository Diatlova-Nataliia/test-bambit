import { defineStore } from "pinia";

export const usePaginationStore = defineStore("pagination", {
  state: () => ({
    items: [],
    loading: false,
    error: null,
    page: 1,
    limit: 30,
    total: 0,
    filterAlbumIds: [],
    sortKey: "",
    sortOrder: "asc",
  }),
  actions: {
    reset() {
      this.items = [];
      this.page = 1;
      this.total = 0;
    },

    setSort(key, order) {
      this.sortKey = key;
      this.sortOrder = order;
      this.reset();
      this.getItems();
    },

    setFilterAlbumIds(ids) {
      this.filterAlbumIds = ids;
      this.getItems();
    },

    async getAllItemsNumber() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos",
      );
      const data = await response.json();
      this.total = data.length;
    },

    async getItems() {
      console.log(this.sortOrder);
      if (this.loading) return;
      this.loading = true;

      const params = [
        `_page=${this.page}`,
        `_limit=${this.limit}`,
        ...this.filterAlbumIds.map((id) => `albumId=${id}`),
      ];

      if (this.sortKey) {
        params.push(`_sort=${this.sortKey}`, `_order=${this.sortOrder}`);
      }

      try {
        const url = `https://jsonplaceholder.typicode.com/photos?${params.join("&")}`;
        const response = await fetch(url);
        const data = await response.json();

        if (this.page === 1) {
          this.items = data;
        } else {
          this.items.push(...data);
        }
      } catch (error) {
        console.error("Fetch error", error);
      } finally {
        this.loading = false;
      }
    },

    nextPage() {
      if (this.page * this.limit >= this.total) return;
      this.page++;
      this.getItems();
    },
  },
});
