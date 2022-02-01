// import MenuPanel from './Menu.js'

export default {
	template: `
		<form
			id="loginForm"
			class="login-form"
			@submit.prevent="onSubmit"
		>
			<div class="form-title" :class="$attrs.class"> <i class="fas fa-star"></i> {{ title }}</div>

			<div class="error" v-show="error != ''"> {{ error }} </div>

			<input v-model="email" v-focus placeholder="Email address">
			<input v-model="password" type="password" placeholder="Password">

			<input type="submit" value="Login">
		</form>
	`,
	props: ['title'],
	emits: ['login-submitted'],
	data() {
		return {
			email: '',
			password: '',
			error: '',
		}
	},
	methods: {
		onSubmit() {
			let credentials = {
				email: this.email,
				pass: this.password,
			}

			let form = document.getElementById('loginForm');
			let formData = new FormData(form);

			console.log("Form data onSubmit child component event", credentials)

			// Login not empty (sample)
			if(this.email != '' && this.pass != '') {
				// Emit event
				this.$emit('login-submitted', credentials)
			} else {
				this.error = "Form can not be empty!"
			}
		},
		// Get store from component
		increment() {
			this.$store.commit('increment')
			console.log(this.$store.state.count)
		}
	},
	directives: {
		// directive definition use <input v-focus>
		focus: {
			mounted(el) {
				el.focus()
			}
		}
	}
}