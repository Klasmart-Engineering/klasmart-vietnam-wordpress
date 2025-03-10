<cx-vui-component-wrapper
	:elementId="currentId"
	:label="label"
	:description="description"
	:wrapper-css="wrapperCss"
	:preventWrap="preventWrap"
	v-if="isVisible()"
>
	<input
		:id="currentId"
		:type="type"
		:class="controlClasses"
		:disabled="disabled"
		:readonly="readonly"
		:name="name"
		:value="currentValue"
		:autofocus="autofocus"
		@keyup.enter="handleEnter"
		@keyup="handleKeyup"
		@keypress="handleKeypress"
		@keydown="handleKeydown"
		@focus="handleFocus"
		@blur="handleBlur"
		@input="handleInput"
		@change="handleChange"
	>
</cx-vui-component-wrapper>
