<template>
  <v-row>
    <v-col cols="12">
      <div class="ms-3">
        <p class="text-2xl mt-14 mb-1">
          Master Files
        </p>
      </div>
    </v-col>

    <v-col
      v-for="(data, index) in accessControlMenu"
      :key="index"
      md="4"
      lg="4"
      sm="6"
      xs="12"
    >
      <v-card
        :elevation="24"
        :color="data.cardBg"
        dark
        class="text-center"
        @click="redirect(data.link)"
      >
        <v-img
          class="auth-tree"
          height="150"
          :src="data.cardImage"
        ></v-img>
        <v-card-title class="align-center d-flex flex-column justify-center align-center">
          <span class="white--text text-center align-center">{{ data.title }}</span>
          <v-icon
            color="white"
            size="3.5rem"
          >
            {{ data.icon }}
          </v-icon>
        </v-card-title>
        <v-card-actions class="justify-space-between">
          <div></div>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiCash,
  mdiFolderStarMultipleOutline,
  mdiHomeGroup,
  mdiApplicationSettings,
  mdiAccountCog,
  mdiOfficeBuilding,
  mdiPackageVariant,
  mdiFormatListNumbered,
  mdiAccountBoxMultipleOutline,
  mdiHeadPlusOutline,
  mdiInboxFullOutline,
  mdiAccountKey,
  mdiWheelBarrow
} from '@mdi/js'
import router from '@/router'

export default {
  setup() {
    const redirect = link => {
      router.push(link)
    }

    const accessControlMenu = [
      {
        cardBg: 'info',
        title: 'Accounts',
        link: '/accounts',
        cardImage: require('@/assets/images/pages/master-file/accounts.jpg'),
        icon: mdiAccountCog,
      },
      {
        cardBg: 'info',
        title: 'Documents',
        link: '/documents',
        cardImage: require('@/assets/images/pages/master-file/documents.jpg'),
        icon: mdiApplicationSettings,
      },
      {
        cardBg: 'info',
        title: 'Locations',
        link: '/locations',
        cardImage: require('@/assets/images/pages/master-file/locations.jpg'),
        icon: mdiHomeGroup,
      },
      {
        cardBg: 'info',
        title: 'Salesman',
        link: '/salesman',
        cardImage: require('@/assets/images/pages/master-file/salesperson.jpg'),
        icon: mdiHeadPlusOutline,
      },
      {
        cardBg: 'info',
        title: 'Terms',
        link: '/terms',
        cardImage: require('@/assets/images/pages/master-file/terms.jpg'),
        icon: mdiInboxFullOutline,
      },
      {
        cardBg: 'info',
        title: 'VAT',
        link: '/vats',
        cardImage: require('@/assets/images/pages/master-file/vat.jpg'),
        icon: mdiCash,
      },
      {
        cardBg: 'info',
        title: 'Customers',
        link: '/customers',
        cardImage: require('@/assets/images/pages/card-basic-user.jpeg'),
        icon: mdiAccountBoxMultipleOutline,
      },
      {
        cardBg: 'info',
        title: 'Products',
        link: '/finish-products',
        cardImage: require('@/assets/images/pages/master-file/products.jpg'),
        icon: mdiFolderStarMultipleOutline,
      },
      {
        cardBg: 'info',
        title: 'Unit Packing',
        link: '/unit-packing',
        cardImage: require('@/assets/images/pages/master-file/packing.jpg'),
        icon: mdiPackageVariant,
      },
      {
        cardBg: 'info',
        title: 'Raw Materials',
        link: '/raw-materials',
        cardImage: require('@/assets/images/logos/bottled-water.jpg'),
        icon: mdiWheelBarrow,
      },
    ]

    return {
      redirect,
      accessControlMenu,
      icons: {
        mdiOfficeBuilding,
        mdiAccountBoxMultipleOutline,
        mdiFormatListNumbered,
        mdiAccountKey,
        mdiWheelBarrow
      },
    }
  },
}
</script>
<style lang="scss"></style>
