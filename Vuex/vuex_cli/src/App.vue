<template>
  <div>
    Hello World!~

    <my-addtion></my-addtion>
    <p>-------------------------------</p>
    <my-subtration></my-subtration>
  </div>
</template>

<script>
import Addition from './components/Addition.vue'
import Subtration from './components/Subtration.vue'
export default {
  data() {
    return {}
  },
  components: {
    'my-addtion': Addition,
    'my-subtration': Subtration,
  },
}
</script>

<style></style>
