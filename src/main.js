import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount("#app");

const userTheme = localStorage.getItem("theme");
if (userTheme === "dark") {
  document.documentElement.classList.add("dark");
}
