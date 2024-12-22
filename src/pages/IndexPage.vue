<template>
  <q-page class="flex flex-center">

    <carousel-section />
    <product-section />
  </q-page>
</template>

<script setup>
import productSection from 'src/components/productCard.vue';
import carouselSection from 'src/components/carouselSection.vue';
</script>
