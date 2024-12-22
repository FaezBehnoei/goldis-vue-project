<template>
  <q-drawer
    dir="rtl"
    bordered
    side="right"
    elevated
    width="250"
  >
    <q-list bordered>
      <q-item-label header class="drawer-header text-center">
         دسته بندی
      </q-item-label>

      <EssentialLink
        v-for="link in linksList"
        :key="link.title"
        v-bind="link"
        class="drawer-item"
      />
    </q-list>
  </q-drawer>
</template>

<script setup>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'لیست محصولات',
    link: '/list',
    icon: 'inventory'
  },
  {
    title: 'خانه',
    link: '/',
    icon: 'home'
  }
]
</script>

<style scoped>
.drawer-header {
  font-size: 1.5em;
  font-weight: bold;
  color: #4A4A4A;
  padding: 16px 0;
  border-bottom: 1px solid #e0e0e0;
}

.drawer-item {
  transition: background-color 0.3s ease;
  padding: 12px 16px;

}

.drawer-item:hover {
  background-color: #e0e0db;
  transform: scale(1.02);
  border-bottom: 1px solid #444;
}


</style>
