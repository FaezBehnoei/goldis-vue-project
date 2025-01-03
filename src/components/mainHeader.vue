<template>

  <div dir="rtl" >
    <q-toolbar style="width: 100%;" class="bg-white q-mx-auto q-mt-sm">
      <q-btn
        flat
        dense
        round
        aria-label="Menu"
        @click="$emit('openRightDrawer')"
        class="text-dark q-ml-lg"
      >
      <q-img style="max-width: 100%; vertical-align: middle; width: 6rem;" src="../../public/logo.png" />
    </q-btn>

      <div class="flex row items-center justify-center">


        <q-input  v-model="text" dense label="جستجو محصول"
        class="bg-secondary"
        style="border: none; border-radius: 8px; width: 545px;"
        >
        <template v-slot:prepend >
          <q-icon class="q-ml-sm text-dark"
          style="font-weight: bold; font-size:1.5rem; cursor: pointer;  "
          name="search" />
        </template>
      </q-input>


      </div>

      <q-space />

      <div >
        <div
         class="q-pa-sm flex row">
         <q-btn @click="goToLoginPage" dense class="btnStyle text-accent q-ml-md my-custom-font-bold-dana q-pa-none q-pl-sm " label=" سلام روژایی عزیز" icon="person"
         style="font-size: 0.9rem;border: 1px solid; border-radius: 0.375rem; "
         />

         <div class="hr-vertical"></div>

          <q-btn-dropdown
          icon="shopping_cart"
          class="bg-none text-info q-mr-md q-pl-none q-ml-none"
           >


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
                    class="flex row"
                >
                    <q-item-section
                     class="flex items-center"
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

    <q-toolbar class="flex justify-between items-center">


        <ul class="flex items-center q-gutter-x-lg ">
          <li style="border: none; gap: 5px;"><a class="text-accent my-custom-font-bold-dana " href="">دسته بندی محصولات</a>
            <svg class="text-accent " style="width: 12px;">
              <use xlink:href="#arrow" />
            </svg>
          <div>
            <ul class="hidden">
              <li ><a href="#">عطر </a></li>
              <li><a href="#">ارایشی</a></li>
              <li><a href="#">بهداشتی</a></li>
              <li><a href="#">مو</a></li>
              <li><a href="#">لوازم برقی</a></li>
              <li><a href="#">مد و فشن</a></li>

            </ul>
          </div>
          </li>
          <li>
            <svg >
              <use xlink:href="#star"  />
            </svg>
            <a href="">برند ها</a>

          </li>
          <li>
            <svg>
              <use xlink:href="#gift" />
            </svg>
            <a href="">کارت هدیه روژا</a></li>
          <li>
            <svg>
              <use xlink:href="#chat" />
            </svg>
            <a href="">مشاوره رایگان</a></li>
          <li>
            <svg>
              <use xlink:href="#building" />
            </svg>
            <a  href="">فروش سازمانی</a></li>
          <li>
            <svg>
              <use xlink:href="#blog" />
            </svg>
            <a href="">وبلاگ روژا</a></li>
          <li >
            <a class="text-accent"  href="">فروش ویژه روژا</a></li>
        </ul>

        <ul class="flex q-gutter-md">
          <li style="border: none;">
            <svg class="text-accent" >
              <use xlink:href="#users" />
            </svg>
            <a class="text-accent my-custom-font-bold-dana "  href="">باشگاه مشتریان</a></li>
          <li>
            <svg >
              <use xlink:href="#location" />
            </svg>
            <a href="">شعب وزرا</a></li>
        </ul>


    </q-toolbar>


  </div>
</template>

<script setup>
import { computed, onMounted , ref} from 'vue';
import { useProductStore } from '../stores/productStore'
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
const productStore = useProductStore()
const user = ref([])
const addedProducts = computed(() => productStore.addedProducts)
const router = useRouter()

async function fetchUser() {
    const userData  = await api.get('/users/1')
    user.value = userData.data
}
onMounted(fetchUser)

function goToLoginPage(){
  router.push("/login")
}


defineEmits(['openRightDrawer']);
</script>

<style scoped>
.hr-vertical{
  border-left: 1px solid #e6e6e6;
  height: 40px;
}
.q-btn:before {
  box-shadow: none;
}
ul > li{
  display: flex;
  gap: 3px;
  border-inline-start: 1px solid #e6e6e6;
  padding-right: 5px;

}

ul>li> a {
  color: rgba(0, 0, 0, 0.55);
}

ul>li> svg{
  width: 20px;
  height: 20px;
}

</style>

