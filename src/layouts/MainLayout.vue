<template>
  <q-layout view="lHh Lpr lFf">
    <header-main  @openRightDrawer="openRightDrawer"/>

    <drawerCom v-model="onToggle" />


    <q-page-container>
       <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>

import headerMain from '../components/mainHeader.vue'
import drawerCom from 'src/components/drawerItem.vue';
import { ref } from 'vue';



const onToggle = ref(false)

function openRightDrawer(){
  onToggle.value = !onToggle.value
}

</script>
