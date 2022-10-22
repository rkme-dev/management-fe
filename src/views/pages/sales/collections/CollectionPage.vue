<template>

</template>

<script>
import store from '@/store'
import { onMounted } from '@vue/composition-api'

export default {
  name: 'CollectionPage',
  props: {

  },
  setup(props, context) {
    const collectionId = context.root.$route.params.id
    const initialize = () => {
      store.dispatch('CollectionStore/get', collectionId)
    }

    onMounted(async () => {
      await initialize()
    })

    return {
    }
  }
}
</script>

<style scoped>

</style>
