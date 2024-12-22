<template>
  <q-header dir="rtl" elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="$emit('openRightDrawer')"
      />

      <q-toolbar-title> فروشگاه آنلاین </q-toolbar-title>



      <div >
        <div
         class="q-pa-sm">
          <q-btn-dropdown
           color="primary" icon="shopping_cart">
            <template #label>
              <q-img
                :src="user.avatar"
                style="width: 50px; border-radius: 50%;"
                class="q-ml-sm q-mr-md"
              />
            </template>
            <q-list dir="rtl">
                <template v-if="addedProducts.length == 0">
                    <q-item >
                     <q-item-section>
                       <q-item-label>محصولی وجود ندارد</q-item-label>
                     </q-item-section>
                   </q-item>
                </template>
               <template v-else>

                    <q-item
                    v-for="product in addedProducts"
                    :key="product.id"
                    clickable
                    v-close-popup
                    style="border-top: 1px solid #e0e0e0;"
                >
                    <q-item-section
                     class="flex row items-center"
                    >
                      <q-img :src="product.image"
                      style="width: 50px; border-radius: 10%;"
                      class="q-mb-sm"
                      />
                      <q-item-label align="center">{{ product.name }}</q-item-label>
                      <span>{{ product.price }}</span>
                    </q-item-section>

                </q-item>

               </template>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { computed, onMounted , ref} from 'vue';
import { useProductStore } from '../stores/productStore'
import { api } from 'src/boot/axios';

const productStore = useProductStore()
const user = ref([])
const addedProducts = computed(() => productStore.addedProducts)

async function fetchUser() {
    const userData  = await api.get('/users/1')
    user.value = userData.data
}
onMounted(fetchUser)


defineEmits(['openRightDrawer']);
</script>
