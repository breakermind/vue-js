// Define a new global component called login-form
// this.$router.options.routes

app.component('login-form', {
	props: ['title'], // Accept properties from parent
	emits: ['loginSubmitted'], // Component events
	data() {
		return {
			email: '',
			password: ''
		}
	},
	methods: {
		onSubmit() {
			let credentials = {
				email: this.email,
				pass: this.password,
			}

			console.log("Form data onSubmit child event", credentials)

			this.$emit('loginSubmitted', credentials)
		},
		// Get store from component
		increment() {
			this.$store.commit('increment')
			console.log(this.$store.state.count)
		}
	},
	template: `
		<form
			class="login-form"
			@submit.prevent="onSubmit"

		>
			<h3 :class="$attrs.class">{{ title }}</h3>
			<input v-model="email" placeholder="Email address">
			<input v-model="password" type="password" placeholder="Password">
			<input type="submit" value="Login">
		</form>

		<input type="button" value="Store +1" @click="increment()">
	`
})

// const LoginForm = {
// 	template: `
// 	<form
// 		class="login-form"
// 		@submit.prevent="onSubmit"
// 	>
// 		<input v-model="email" placeholder="Email address">
// 		<input v-model="password" type="password" placeholder="Password">
// 		<input type="submit" value="Login">
// 	</form>
// 	`,
// 	data() {
// 		return {
// 			email: '',
// 			password: ''
// 		}
// 	},
// 	methods: {
// 		onSubmit() {
// 			let data = {
// 				email: this.email,
// 				pass: this.password,
// 			}

// 			console.log("Form data", data)

// 			this.$emit('login-form-submitted')
// 		},
// 		sendLogin(data) {
// 			console.log("Event data", data)
// 		}
// 	}
// }