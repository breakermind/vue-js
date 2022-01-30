const About = {
	template: `
	<div class="content">
		<login-form @login-submitted="sendLogin" title="Login now!" />

		<!-- <todo-item v-for="item in groceryList"v-bind:todo="item" v-bind:key="item.id"></todo-item> -->

		<p> {{ data }} </p>
	</div>`,
	data() {
		return {
			data: '',
			count: 11,
		}
	},
	mounted() {
		setInterval(() => {
			this.counter++
		}, 1000)
	},
	created() {
		// `this` points to the app instance
		console.log('count is: ' + this.count) // => "count is: 11"
	},
	methods: {
		sendLogin(data) {
			console.log("Parent catch event", data)
		}
	},
}