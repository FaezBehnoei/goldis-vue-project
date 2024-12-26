<template>
  <div class="q-mb-md">
    <div v-if="loading" class="text-center">
      <q-spinner-dots color="primary" size="3em" />
      <p class="text-h6 text-primary">Loading images...</p>
    </div>

    <div v-else-if="error" class="text-center text-negative">
      <q-icon name="error_outline" size="3em" color="negative" />
    </div>

    <q-carousel
      v-else
      animated
      v-model="slide"
      arrows
      navigation
      infinite
      control-color="white"
      :swipeable="true"
      class="my-carousel"
      style="width: 100vw; margin: 0;"
    >
      <q-carousel-slide
        v-for="(imageUrl, index) in selectedImg"
        :key="index"
        :name="index + 1"
        :img-src="imageUrl.image"
        class="my-carousel-slide"
      >
        <template v-slot:default>
          <div class="carousel-caption">
            <p class="text-h5 text-shadow ">{{ imageUrl.description || 'Image Caption' }}</p>
          </div>
        </template>
      </q-carousel-slide>

      <template v-slot:control-left>
        <q-btn icon="keyboard_arrow_left" color="primary" round dense flat />
      </template>
      <template v-slot:control-right>
        <q-btn icon="keyboard_arrow_right" color="primary" round dense flat />
      </template>
    </q-carousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const slide = ref(1);
const images = ref([]);
const loading = ref(true);
const selectedImg = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/products');
    images.value = data;
    selectedImg.value = images.value.splice(0,4)

  }finally {
    loading.value = false;
  }
});


</script>

<style scoped>
.my-carousel {
  max-width: 100vw;
  height: 90vh;
  width: 100%;
  margin: 0;
}

.my-carousel-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30rem;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.my-carousel-slide:hover {
  transform: scale(1.01);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
}

.my-carousel-slide > img {
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
}

.carousel-caption {
  position: absolute;
  bottom: 5rem;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
  text-align: center;
}
</style>
