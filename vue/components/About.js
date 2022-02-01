import MenuPanel from './Menu.js'

export default {
	components: {
		MenuPanel
	},
	template: `
		<MenuPanel></MenuPanel>

		<div id="box">
			<h1> {{ title }} </h1>
			<p>
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
			</p>

			<router-link to="/" class="rlink">Back to Home</router-link>

			<ul v-for="i in btcRate" class="info">
				<li> {{ i.code }} : {{ fixDecimal(i.rate) }} </li>
			</ul>
		</div>
	`,
	data() {
		return {
			title: 'About component from Vue 3',
			btc: null,
			btc_error: null,
			btc_loading: true,
		}
	},
	mounted() {
		console.log("About component mounted."),
		this.getAxios(),
		this.getBtc()
	},
	methods: {
		getAxios() {
			axios.get("https://api.coindesk.com/v1/bpi/currentprice.json")
				.then(res => {
					console.log(res.data.bpi)
				})
				.catch(err => {
					 if (err.response) {
						console.log("ERROR",err.response.data)
					}else if (err.request) {
						console.log("ERROR", err.request);
					} else {
						console.log('ERROR', err.message);
					}
				})
		},
		async getBtc() {
			if(this.btc_loading) {
				const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
				if(res) {
					const json = await res.json();
					console.log(json.bpi)
					this.btc = json.bpi
				}
			}
		},
		fixDecimal(value) {
			return parseFloat(value.replace(',','')).toFixed(2)
		}
	},
	computed: {
		btcRate() {
			return this.btc
		}
	},
	watch: {
		btc(newBtc, oldBtc) {
			console.log("Btc Watcher", newBtc, oldBtc)
		}
	}
}