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
	`,
	data() {
		return {
			count: 1,
			title: 'Error Page 404'
		}
	}
}