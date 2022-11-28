<template>
  <v-card class="v-btn-toggle--borderless">
    <v-card-title class="align-start">
      <v-avatar
        :color="color"
        size="32"
        class="elevation-3"
      >
        <v-icon
          size="18"
          color="white"
          class="rounded-0"
        >
          {{ icon }}
        </v-icon>
      </v-avatar>
      <p class="ml-4 font-weight-semibold mb-1 text-lg">
        {{ unitTitle }}
      </p>

      <v-spacer></v-spacer>
    </v-card-title>

    <v-card-text
      v-for="(unit, index) in units"
      class="text-no-wrap text--primary mt-3"
    >
      <div
        :key="index"
        class="d-flex align-end flex-wrap"
      >
        <span class="font-weight-semibold me-1 mb-2">{{ unit.name }}</span>
      </div>
      <p class="text-xs text--secondary mb-0">
        <v-currency-field
          v-model="unit.pivot.actual_balance"
          filled
          class="shrink text-green"
          readonly
          :decimal-length="0"
          label="Total Item Inventory"
        >
        </v-currency-field>
      </p>
      <p>
        <v-currency-field
          v-model="unit.pivot.reserved_balance"
          filled
          class="shrink text-green"
          readonly
          :decimal-length="0"
          label="Total Available Item Inventory"
        >
        </v-currency-field>
      </p>
      <p>
        <v-currency-field
          v-model="unit.pivot.reserved"
          filled
          class="shrink text-green"
          readonly
          :decimal-length="0"
          label="Total Reserved Items"
        >
        </v-currency-field>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'UnitPackInventory',
  props: {
    unitTitle: { type: String, default: '' },
    units: { type: Array, default: (() => []) },
    icon: { type: String, default: '' },
    color: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    statistics: { type: String, default: '' },
    change: { type: String, default: '' },
  },
  setup() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
.percentage {
  top: -8px;
  position: relative;
}
</style>
