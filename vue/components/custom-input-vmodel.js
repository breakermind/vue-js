// Component with v-model
// <custom-input-vmodel v-model="searchText"></custom-input-vmodel>

app.component('custom-input-vmodel', {
	props: ['modelValue'],
	emits: ['update:modelValue'],
	template: `
	<input
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
	>
	`
})

// Component with v-model
// <custom-input v-model="searchText"></custom-input>

app.component('custom-input', {
	props: ['modelValue'],
	emits: ['update:modelValue'],
	template: `
		<input v-model="value">
	`,
	computed: {
		value: {
			get() {
				return this.modelValue
			},
			set(value) {
				this.$emit('update:modelValue', value)
			}
		}
	}
})