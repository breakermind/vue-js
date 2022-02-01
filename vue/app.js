// Vue app

console.log('App module loaded!')

import store from './store/index.js'
import router from './router/index.js'
import options from './options.js'

const app = Vue.createApp(options)

// app.component('hello-world', {
// 	template: `<h1> {{ title }} </h1>`,
// 	data() {
// 		return {
// 			title: 'Hello World',
// 		}
// 	}
// })

app.use(store)
app.use(router)
app.mount('#app')