import MenuPanel from './Menu.js'

export default {
	components: {
		MenuPanel
	},
	template: `
		<MenuPanel/>

		<div id="box">
			<h1> {{ title }} </h1>
		</div>

		<p>Select your preferred contact method:</p>
		<p> Selected: {{ checkedContact }} </p>

		<label>Email contact</label>
		<div class="cool-checkbox">
			<input type="checkbox"
				name="contact"
				:value="1"
				id="cat1"
				@change="checkContact($event)"
				v-model="checkedContact"
			>
			<div class="sbtn"><div class="dot"></div></div>
		</div>

		<label>Phone contact</label>
		<div class="cool-checkbox">
			<input type="checkbox"
				name="contact"
				:value="2"
				id="cat2"
				@change="checkContact($event)"
				v-model="checkedContact"
			>
			<div class="sbtn"><div class="dot"></div></div>
		</div>

		<!--
		<style>
			input[type="checkbox"]:checked + label {
				font-weight: bold;
			}
		</style>
		-->
	`,
	props: {
		title: {
			type: String,
			default: 'Welcome again!',
			// required: true
		}
	},
	emits: ['submit'],
	data() {
		return {
			count: 1,
			checkedContact: [],
			// title_attr: this.$attrs.title,
		}
	},
	methods: {
		checkContact: function(e) {
			this.$nextTick(() => {
				console.log(this.checkedContact, e)

				this.$emit('submit', { options: this.checkedContact })
			})
		}
	}
}