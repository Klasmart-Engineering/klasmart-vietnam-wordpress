<div
	class="cx-vui-repeater"
	tabindex="0"
	@focus="inFocus = true"
	@blur="inFocus = false"
	@keyup.alt.n.stop="handleClick"
	v-if="isVisible()"
>
	<div class="cx-vui-repeater__items">
		<slot></slot>
	</div>
	<div class="cx-vui-repeater__actions">
		<cx-vui-button
			:button-style="buttonStyle"
			:size="buttonSize"
			@click="handleClick"
		><span slot="label">{{ buttonLabel }}</span></cx-vui-button>
		<i class="cx-vui-repeater__tip" v-if="inFocus">
			Or press <kbd>alt</kbd>+<kbd>n</kbd> to add new item
		</i>
	</div>
</div>
