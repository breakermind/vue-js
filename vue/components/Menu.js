export default {
	template: `
	<div class="menu">

		<!-- Links -->
		<router-link to="/" class="rlink">Home</router-link>
		<router-link to="/about" class="rlink">About</router-link>
		<router-link to="/users/123" class="rlink">Profil</router-link>
		<span v-if="!$store.state.isAuthenticated">
			<router-link to="/login" class="rlink">Login</router-link>
		</span>

		<!-- Authenticated only -->
		<span v-if="$store.state.isAuthenticated">
			<router-link to="/panel" class="rlink">Dashboard</router-link>
		</span>
		<span v-if="$store.state.isAuthenticated">
			<div @click="logout" class="rlink logout-btn">Logout</div>
		</span>
	</div>
	`,
	data() {
		return {}
	},
	methods: {
		// Logout user
		logout() {
			// Logged user (state mutation)
			this.$store.commit('setNotAuthenticated')
			// Redirect to /panel
			this.$store.dispatch('isLoggedIn')
		}
	},
}