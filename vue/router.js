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
				@{{ currency.description }}:
				<span class="lighten">
					<span v-html="currency.symbol"></span>@{{ currency.rate_float | currencydecimal }}
				</span>
			</div>
		</section>
	</div>
	`,
	data() {
		return {
			counter: 0,
			info: null,
			loading: true,
			errored: false,
		}
	},
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
	methods: {
		currencydecimal (value) {
			return value.toFixed(2)
		}
	}
}

// const About = { template: '<div> About </div>',}

const User = {
	template: '<div> User @{{ $route.params.id }} </div>',
	created() {
		this.$watch(() => this.$route.params, (toParams, previousParams) => {
			// react to route changes...
			console.log("Watcher", toParams, previousParams)
		})
	},
}

const routes = [
	{ path: '/', component: Home },
	{ path: '/about', component: About },
	{ path: '/users/:id', component: User },
]

const router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(),
	routes: routes,
})

const app = {
	data() {
		return {
			counter: 0,
			info: null,
			loading: true,
			errored: false,
			isAuthenticated: false,
		}
	},
	// mounted() {
	// 	setInterval(() => {
	// 		this.counter++
	// 	}, 1000),

	// 	axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
	// 		.then(response => {
	// 			this.info = response.data.bpi
	// 		})
	// 		.catch(error => {
	// 			console.log(error)
	// 			this.errored = true
	// 		})
	// 		.finally(() => this.loading = false)
	// },
	computed: {
		username() {
			// We will see what `params` is shortly
			return this.$route.params.username
		},
	},
	methods: {
		goToDashboard() {
			if (isAuthenticated) {
				this.$router.push('/dashboard')
			} else {
				this.$router.push('/login')
			}
		},
	},
	// filters: {
	// 	currencydecimal (value) {
	// 		return value.toFixed(2)
	// 	}
	// }
}

// Without router
// Vue.createApp(app).mount('#app')

// With router
let a = Vue.createApp(app)
a.use(router)
a.mount('#app')