import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductStore = defineStore('product', () => {
  const addedProducts = ref([]);
  function addProduct(product) {
      addedProducts.value.push(product);
  }
  function removeProduct(productId){
      addedProducts.value = addedProducts.value.filter(p => p.id !== productId)
  }

  return { addedProducts, addProduct, removeProduct };
});
