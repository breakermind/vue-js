import MenuPanel from './Menu.js'

export default {
	components: {
		MenuPanel
	},
	template: `
		<MenuPanel></MenuPanel>

		<div id="box">
			<h1> {{ title }} </h1>

			<div class="info"> User {{ $route.params.id }} </div>

			<div class="info"> Counter {{ $store.state.count }} </div>

			<button @click="getIncrement()">Get store increment</button>
		</div>
	`,
	data() {
		return {
			count: 1,
			title: 'Profil page'
		}
	},
	methods: {
		// Get store from component
		getIncrement() {
			this.$store.commit('increment')
			console.log(this.$store.state.count)
		}
	}
}