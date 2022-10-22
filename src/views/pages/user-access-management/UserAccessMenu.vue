<template>
  <v-row>
    <v-col cols="12">
      <div class="ms-3">
        <p class="text-2xl mt-14 mb-1">
          User Control
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
import { mdiOfficeBuilding, mdiFormatListNumbered, mdiAccountBoxMultipleOutline, mdiAccountKey } from '@mdi/js'
import router from '@/router'

export default {
  setup() {
    const redirect = link => {
      router.push(link)
    }

    const accessControlMenu = [
      {
        cardBg: 'info',
        title: 'Users',
        link: '/users',
        cardImage: require('@/assets/images/pages/card-basic-user.jpeg'),
        icon: mdiAccountBoxMultipleOutline,
      },
      {
        cardBg: 'primary',
        cardImage: require('@/assets/images/pages/card-basic-department.webp'),
        title: 'Department',
        icon: mdiOfficeBuilding,
        link: '/departments',
      },
      {
        cardBg: 'success',
        title: 'Access Levels',
        cardImage: require('@/assets/images/pages/card-basic-permission.png'),
        icon: mdiAccountKey,
        link: '/access-levels',
      },
      {
        cardBg: 'warning',
        title: 'Roles',
        cardImage: require('@/assets/images/pages/card-basic-permission.png'),
        icon: mdiAccountKey,
        link: '/roles',
      },
      {
        cardBg: 'error',
        title: 'Abilities',
        cardImage: require('@/assets/images/pages/card-basic-permission.png'),
        icon: mdiAccountKey,
        link: '/abilities',
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
      },
    }
  },
}
</script>
<style lang="scss"></style>
