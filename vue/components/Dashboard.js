import MenuPanel from './Menu.js'

export default {
	components: {
		MenuPanel
	},
	template: `
		<MenuPanel></MenuPanel>

		<div id="box">
			<h1> {{ title }} </h1>

			<p>User route id: {{ $route.params.id }} </p>
			<p>Store counter {{ $store.state.count }} x 2 = {{ getMultipleCount }}</p>

			<button @click="getCounter()">Display store counter</button>
			<button @click="incraseCounter()">Incrase store counter</button>
		</div>
	`,
	data() {
		return {
			title: 'User Dashboard (auth only)'
		}
	},
	mounted() {
		this.$store.dispatch('isLoggedIn')
	},
	methods: {
		// Get store from component
		getCounter() {
			alert(this.$store.state.count)
		},
		// Commit method from store
		incraseCounter() {
			this.$store.commit('increment')
		},
		// Logout user
		logout() {
			// Logged user (state mutation)
			this.$store.commit('setNotAuthenticated')
			// Redirect to /panel
			this.$store.dispatch('isLoggedIn')
		}
	},
	computed: {
		getMultipleCount () {
			return this.$store.state.count * 2
		},
	}
}