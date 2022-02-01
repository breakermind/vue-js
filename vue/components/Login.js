import MenuPanel from './Menu.js'
import LoginForm from './forms/LoginForm.js'

export default {
	components: {
		MenuPanel,
		LoginForm: Vue.defineAsyncComponent(() => import('./forms/LoginForm.js'))
	},
	template: `
		<MenuPanel></MenuPanel>

		<div id="box">
			<!-- Component with event -->
			<login-form @login-submitted="onLoginUser" :title="title"/>
		</div>
	`,
	data() {
		return {
			count: 1,
			title: 'Sign Up'
		}
	},
	methods: {
		onLoginUser(data) {
			alert("Parent catch event from child component: " + JSON.stringify(data))
			console.log("Parent catch data from child component", data)
			// Logged user (state mutation)
			this.$store.commit('setAuthenticated')
			// Redirect to /panel
			this.$store.dispatch('isLoggedIn')
		}
	}
}