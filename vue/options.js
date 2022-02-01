export default {
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