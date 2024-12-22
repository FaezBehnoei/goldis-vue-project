<template>
  <q-page padding>
    <div class="q-pa-md">
      <div align="right" class="text-h5 q-mb-xl q-mt-xl">محصولات</div>

      <q-spinner v-if="loading" size="3em" color="primary" />

      <div v-else>
        <div class="q-gutter-xl row justify-center">
          <q-card
            v-for="product in paginatedProducts"
            :key="product.id"
            class="col-12 col-sm-6 col-md-4 col-lg-3 shadow-10 hover:shadow-16 transition-all"
            :style="{ maxWidth: '300px', minWidth: '250px' }"
            :class="{
              'bg-grey-1': product.id % 2 === 0,
              'bg-white': product.id % 2 !== 0
            }"
          >
            <q-card-section class="q-pt-none">
              <div class="q-mb-xs flex justify-center">
                <q-img
                  :src="product.image"
                  :alt="product.name"
                  class="q-mb-sm q-mt-sm"
                  style="height: 200px; width: 100%; border-radius: 8px;"
                />
              </div>
            </q-card-section>

            <q-card-section class="column items-center text-center">
              <div class="text-h6 q-mb-xs">{{ product.name }}</div>
              <div class="text-subtitle2 text-grey-7 q-mb-sm">قیمت: {{ product.price }} تومان</div>

              <q-btn align="between"
               class="btn-fixed-width"
               color="positive"
               label="افزودن به سبد خرید"
               icon="shopping_cart"
               :loading="loading"
               @click="addToDropdown(product)"
               />

            </q-card-section>
          </q-card>
        </div>

        <div class="q-mt-md flex justify-center">
          <q-pagination
            v-model="currentPage"
            :max="totalPages"
            color="primary"
            :boundary-links="true"
            class="q-mt-md"
            size="md"
          />
        </div>
      </div>
    </div>

    <add-product-dialog
      @update="handleUpdateProduct"
      @success="handleNewProduct"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { api } from 'src/boot/axios';
import addProductDialog from 'src/components/addProductDialog.vue';
import { useProductStore } from 'src/stores/productStore';

const loading = ref(true);
const products = ref([]);

const currentPage = ref(1);
const itemsPerPage = 9;
const productStore = useProductStore();



async function fetchProducts() {
  try{
    const { data } = await api.get('/products');
    products.value = data
  }finally{
    loading.value = false
  }

}

onMounted(fetchProducts);


function handleNewProduct(newProduct) {
  products.value.unshift(newProduct);
}

function handleUpdateProduct(updatedProduct) {
  const index = products.value.findIndex((product) => product.id === updatedProduct.id);
  if (index !== -1) {
    products.value[index] = updatedProduct;
  }
}

const totalPages = computed(() => {
  return Math.ceil(products.value.length / itemsPerPage);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return products.value.slice(start, end);
});

function addToDropdown(product) {
  productStore.addProduct(product);
}
</script>

<style scoped>
.q-card {
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.q-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
}

.q-btn.full-width {
  width: 100%;
}
</style>
