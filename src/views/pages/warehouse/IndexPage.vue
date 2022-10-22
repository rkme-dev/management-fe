<template>
  <div>
    <p class="text-2xl mt-14 mb-6">
      Warehouse Menu
    </p>
    <menu-cards></menu-cards>
  </div>
</template>

<script>
import MenuCards from './components/MenuCards.vue'

export default {
  components: {
    MenuCards,
  },
}
</script>
