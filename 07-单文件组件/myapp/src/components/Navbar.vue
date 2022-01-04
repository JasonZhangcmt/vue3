<template>
  <div>
    <slot name="left"></slot>
    navbar-<button @click="handleClick">click</button>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$emit('myevent')
    }
  }
}
</script>
