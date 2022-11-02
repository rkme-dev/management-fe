<template>
  <v-row>
    <v-icon
      large
      color="green darken-2"
    >
      mdi-domain
    </v-icon>
    <v-col
      v-for="data in solidCardData"
      :key="data.icon"
      cols="4"
      md="4"
      lg="4"
    >
      <v-card
        :elevation="24"
        :color="data.cardBg"
        dark
        class="text-center"
      >
        <v-img
          class="auth-tree"
          width=""
          height="150"
          :src="data.cardImage"
        ></v-img>
        <v-card-title class="align-center d-flex flex-column justify-center align-center">
          <span class="white--text  text-center align-center">{{ data.title }}</span>
          <v-icon
            color="white"
            class="me-2"
            size="3.5rem"
            @click="redirect(data.link)"
          >
            {{ data.icon }}
          </v-icon>
        </v-card-title>
        <v-card-actions class="justify-space-between">
          <div>
          </div>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiHelpCircleOutline, mdiHeart, mdiShareVariant, mdiOfficeBuilding, mdiFormatListNumbered } from '@mdi/js'
import router from '@/router'

export default {
  setup() {
    const redirect = link => {
      router.push(link)
    }

    const solidCardData = [
      {
        cardBg: 'primary',
        cardImage: require('@/assets/images/logos/warehouse-building.jpg'),
        title: 'Warehouse Branches',
        icon: mdiOfficeBuilding,
        link: '/warehouses',
      },
      {
        cardBg: 'success',
        title: 'Inventory',
        cardImage: require('@/assets/images/logos/waterbottles.png'),
        icon: mdiFormatListNumbered,
        link: '/products',
      },
    ]

    return {
      redirect,
      solidCardData,
      icons: {
        mdiOfficeBuilding,
        mdiHelpCircleOutline,
        mdiHeart,
        mdiShareVariant,
      },
    }
  },
}
</script>
