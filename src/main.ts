import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import { Quasar } from 'quasar'
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Quasar, {
    config: {
        brand: {
            primary: '#7868df',
            positive: '#54a982',
            negative: '#d96c65',
            warning: '#d59a47',
        },
    },
    plugins: {},
})

app.mount('#app')
