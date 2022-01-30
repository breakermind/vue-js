// Set route
// this.$router.push('/user-admin')

// Create a new store instance.
const store = Vuex.createStore({
	state () {
		return {
			count: 0,
			answer: '',
		}
	},
	mutations: {
		increment (state) {
			state.count++
		},
		incrementAmount (state, amount) {
			state.count += amount
		},
		setAnswer(state, answer) {
			state.answer = answer;
		}
	},
	actions: {
		async getAnswer(state_context) {
			const res = await fetch("https://yesno.wtf/api");
			const answer = await res.json();
			state_context.commit("setAnswer", answer);
			// console.log("Answear", answer)
		}
	}
})

const options = {
	data() {
		return {
			counter: 0,
			info: null,
			loading: true,
			errored: false,
			isAuthenticated: false,
		}
	},
	mounted() {
		this.$store.dispatch("getAnswer")

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
	},
	computed: {
		answer() {
			return this.$store.state.answer;
		},
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
let app = Vue.createApp(options)
