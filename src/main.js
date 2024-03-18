import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import router from "@/router";
import store from "@/store/store";

const app = createApp(App);

const vuetify = createVuetify({
    components,
    directives,
});

app
    .use(router)
    .use(store)
    .use(vuetify)
    .mount('#app');
