const Home = {
	template: `
	<div class="btc">
		<h1>Bitcoin Price Index</h1>

		<section v-if="errored">
		<p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
		</section>

		<section v-else>
			<div v-if="loading">Loading...</div>

			<div
				v-else
				v-for="currency in info"
				class="currency"
			>
				{{ currency.description }}:
				<span class="lighten">
					<span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
				</span>
			</div>
		</section>
	</div>
	`,
	data() {
		return {
			question: '',
			counter: 0,
			info: null,
			loading: true,
			errored: false,
		}
	},
	updated() {},
	unmounted() {},
	mounted() {
		setInterval(() => {
			this.counter++
		}, 1000),

		axios.get('https://api.coindesk.com/v1/bpi/currentprice.json', {})
			.then(response => {
				this.info = response.data.bpi
			})
			.catch(error => {
				console.log(error)
				console.log(JSON.stringify(error))

				this.errored = true

				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
			})
			.finally(() => this.loading = false)
	},
	created() {
		// `this` points to the app instance
		console.log('count is: ' + this.counter) // => "count is: 0"
	},
	methods: {
		currencydecimal (value) {
			return value.toFixed(2)
		},
		getAnswer() {
			this.answer = 'Thinking...'
			axios
				.get('https://yesno.wtf/api')
				.then(response => {
					this.answer = response.data.answer
				})
				.catch(error => {
					this.answer = 'Error! Could not reach the API. ' + error
				})
		}
	},
	computed: {
		// a computed getter
		publishedBooksMessage() {
		  // `this` points to the vm instance
		  return this.author.books.length > 0 ? 'Yes' : 'No'
		},
		now() {
			return Date.now()
		},
		fullName() {
			// return this.firstName + ' ' + this.lastName
		},
		classObject() {
			return {
				// active: this.isActive && !this.error,
				// 'text-danger': this.error && this.error.type === 'fatal'
			}
		}
	},
	watch: {
		// whenever question property changes, this function will run
		question(newQuestion, oldQuestion) {
			if (newQuestion.indexOf('?') > -1) {
				this.getAnswer()
			}
		}
	},
}

const User = {
	template: `
		<div> User {{ $route.params.id }} </div>

		<input type="button" value="Get store increment" @click="getIncrement()">
	`,
	created() {
		this.$watch(() => this.$route.params, (toParams, previousParams) => {
			// react to route changes...
			console.log("Watcher", toParams, previousParams)
		})
	},
	methods: {
		// Get store from component
		getIncrement() {
			// store.commit('increment')
			console.log(store.state.count)
		}
	}
}

const routes = [
	{ path: '/users/:id', component: User },
	{ path: '/about', component: About },
	{ path: '/', component: Home },
	// { path: '/:catchAll(.*)', component: NotFoundComponent, name: 'NotFound' }
]

const router = VueRouter.createRouter({
	// history: VueRouter.createWebHashHistory(),
	history: VueRouter.createWebHistory(),
	routes,
	linkActiveClass: "active",
})

// router.beforeEach((to, from, next) => {
// 	// this.$router.push(to)
// 	if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
// 	else next()
// })

app.use(store)
app.use(router)
let vm = app.mount('#app')

// console.log(vm.$data.count) // => 4
// console.log(vm.count)       // => 4
// methods:
// vm.increment()