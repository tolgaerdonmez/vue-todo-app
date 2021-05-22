import { createApp } from "vue";
import App from "./App.vue";

import PlusIcon from "./components/icons/Plus.vue";
import CloseIcon from "./components/icons/Close.vue";
import RemoveIcon from "./components/icons/Remove.vue";
import CheckmarkIcon from "./components/icons/Checkmark.vue";
import TrashIcon from "./components/icons/Trash.vue";

const app = createApp(App);

app.component("PlusIcon", PlusIcon);
app.component("CloseIcon", CloseIcon);
app.component("RemoveIcon", RemoveIcon);
app.component("CheckmarkIcon", CheckmarkIcon);
app.component("TrashIcon", TrashIcon);

app.mount("#app");
