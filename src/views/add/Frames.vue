<template>
  <div class="max-w-lg w-full mx-auto mt-1">
    <BaseCard>
      <h2 class="px-3 sm:px-4 pt-3 text-3xl font-extrabold leading-9 tracking-tight sm:leading-10">
        Добавити оправу
      </h2>

      <!-- Forms -->
      <form class="w-full px-3 sm:px-4 pt-3 mb-4">
        <div class="mb-4 relative">
          <input v-model="name" type="text" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Назва</label>
        </div>
        <div class="mb-4 relative">
          <input v-model="manufacturer" type="text" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="password" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Виробник</label>
        </div>
        <div class="mb-4 relative">
          <input v-model="price" type="number" step="0.01" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Ціна (грн)</label>
        </div>
        <div class="mb-4 relative">
          <input v-model="description" type="text" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="text" autocomplete="off" />
          <label for="text" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Опис</label>
        </div>
        <div class="relative px-1 mb-4">
          <label class="block mb-2 text-baase font-medium dark:text-white transition-colors" for="file_input">Картинка (макс. розмір 2мб):</label>
          <input ref="imageInput" @change="onFileChange" type="file" accept="image/png, image/jpeg" class="block w-full text-smborder border-gray-200 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 transition-colors">
        </div>
      </form>

      <!-- Btns -->
      <div class="px-3 sm:px-4 mb-4">
        <button v-if="loadingbtn" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-500 dark:bg-indigo-700"><svg class="inline animate-spin -ml-1 mr-2 mb-0.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Добавляю...</button>
        <button v-else @click="add()" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-600 hover:bg-indigo-500 dark:hover:bg-indigo-700 focus:outline-none">Добавити</button>
      </div>

      <p class="text-md text-center text-gray-400 dark:text-gray-400 mb-3">
        <router-link to="/user">Вернутись</router-link>
      </p>
    </BaseCard>
  </div>
</template>


<script setup>
defineOptions({
  name: 'notAlive',
})

import BaseCard from '@/components/BaseCard.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';
const router = useRouter();

import { useAuthStore } from '@/store/user.js'

const authStore = useAuthStore()
// завантажуєм дані
authStore.loadAuthState()

// Якщо користувач не увійшов
if (!authStore.isAuthenticated) {
  router.push('/user');
}

// зміні
const name = ref('')
const manufacturer = ref('')
const price = ref('')
const description = ref('')
const imageInput = ref(null)
const imageHref = ref('')
const loadingbtn = ref(false)

// завантаження картинки
const onFileChange = (event) => {
  imageInput.value = event.target.files[0];
};

const uploadImage = () => {
  return new Promise((resolve, reject) => {
    const file = imageInput.value;
    // виходимо
    if (!file) {
      return
    }
    const formData = new FormData();
    formData.append('image', file);

    axios
    .post('/api/upload_image.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      if (res.data.error) {
        alert(`Помилка: ${res.data.error}`);
        loadingbtn.value = false;
        reject(new Error(`Помилка: ${res.data.error}`));
      } else {
        console.log(res.data.path)
        imageHref.value = res.data.path;
        resolve();
      }
    })
    .catch(error => {
      reject(error);
    });
  });
};

// Добавляєм
const add = () => {
  if(!(name.value && manufacturer.value && price.value && description.value)) {
    alert("Поля не заповнено");
    return
  }
  
  loadingbtn.value = true;

  uploadImage()
  .then(() => {
    axios({
      method: 'post', 
      url:'/api/frames/add.php', 
      data: {
        token: authStore.token,
        manufacturer: manufacturer.value,
        name: name.value,
        image: imageHref.value,
        description: description.value,
        price: price.value
      }, 
      headers: {
        'Content-Type': 'application/json'
      } 
    })
    .then(res => {
      if (res.data.message) {
        alert('Оправу успішно додано');
        router.push('/user');
      }
      else {
        alert('Помилка даних');
      }
    })
    .catch(() => {
      alert('Помилка')
    })
    .finally(() => loadingbtn.value = false)
  })
}
</script>