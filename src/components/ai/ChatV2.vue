<template>
  <div class="mt-1">
    <!-- DEBUG -->
    <!-- <div class="fixed pt-18" style="top: 0; right: 0;">
      <details>
        <summary class="text-gray-400 dark:text-gray-500 transition-colors cursor-pointer">DEBUG</summary>
        <div class="rounded-lg p-3 bg-gray-50 dark:bg-gray-700 dark:text-gray-200 shadow-lg">
          <p @click="deleteComment(-1)">-> Delete stored comments</p>
          <p v-for="(item, index) in preSets" :key="item.name">
            <div @click="selectedPreSet = index">-> {{ item.name }} preset {{ selectedPreSet == index && 'SELECTED' }}</div>
          </p>
        </div>
      </details>
    </div>  -->

    <!-- Nothing here (Guide for beginners) -->
    <div class="grid grid-cols-1 md:grid-cols-2">
      <transition appear enter-active-class="duration-200 ease-in-out transition" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100">
        <BaseCard v-if="!comments[9]">
          <h2 class="px-3 pt-3 text-3xl font-extrabold leading-9 tracking-tight sm:leading-10">Що це?</h2>
          <p class="text-lg px-3 mt-2 sm:mb-2">Ласкаво просимо до чату з ШІ, який допоможе вам обрати ідеальні окуляри! Тут ви можете ставити будь-які запитання щодо вибору оправ, лінз та стилю, а також отримувати швидкі й корисні відповіді.</p>
        </BaseCard>
      </transition>
      <transition appear enter-active-class="duration-200 ease-in-out transition" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100">
        <BaseCard v-if="!comments[9]">
          <h2 class="px-3 pt-3 text-3xl font-extrabold leading-9 tracking-tight sm:leading-10">Приклади</h2>
          <p class="text-lg px-3 mt-2 sm:mb-2">
            <div v-for="item in examples" :key="item" @click="setExample(item)" class="cursor-pointer">
              -> {{ item }}
            </div>
          </p>
        </BaseCard>
      </transition>
    </div>

    <!-- Popup btns -->
    <div class="flex mb-4 md:mb-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 rounded-md mx-auto">
        <transition-group appear enter-active-class="duration-200 ease-in-out transition" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100">
          <button @click="this.preSets[0] && $refs.popup1.changeOpen()" key="1" class="items-center m-2 text-center px-7 py-2 shadow-lg text-base font-medium leading-6 text-white transition-colors ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 dark:hover:bg-indigo-700 focus:outline-none">
            Вибрати асистента
          </button>
          <button @click="deleteComment(-1)" key="2" class="items-center m-2 text-center px-7 py-2 shadow-lg text-base font-medium leading-6 text-white transition-colors ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 dark:hover:bg-indigo-700 focus:outline-none">
            Очистити історію
          </button>
        </transition-group>
      </div>
    </div>

    <!-- Character popup -->
    <FullScreenPopup :openDefaultProps="false" nameBlockProps="Асистент" maxWProps="max-w-lg" ref="popup1">
      <!-- <h2 class="px-3 pt-3 text-3xl font-extrabold leading-9 tracking-tight sm:leading-10">Выбор собеседника:</h2> -->
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="flex cursor-pointer" v-for="(item, index) in preSets" :key="item.name" @click="setPreset(index)">
          <!-- Image loading -->
          <LazyImage class="shrink-0">
            <template v-slot:image>
              <img class="w-16 h-16 mx-3 my-3 shadow-lg rounded-xl transition" :style="selectedPreSet != index && 'filter: opacity(75%) saturate(25%);'" :src="'/img/avatars/'+item.avatarId+'.jpg'" alt="char-avatar">
            </template>
            <template v-slot:preloader> 
              <div class="w-16 h-16 bg-gray-200 dark:bg-gray-600 shadow-lg rounded-xl mx-3 my-3 animate-pulse"></div>
            </template>
            <template v-slot:error>
              <div class="w-16 h-16 bg-red-200 dark:bg-red-800 shadow-lg rounded-xl mx-3 my-3 animate-pulse text-center">img</div>
            </template>
          </LazyImage>
          <!-- /Image -->
          <div class="px-1 py-1 my-auto">
            <div class="font-bold text-xl inline-flex items-center">
              {{ item.name }} 
              <!-- to disable animation on safari: :appear="!isSafari" -->
              <transition enter-active-class="ease-out duration-150" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <CheckIcon v-if="selectedPreSet == index" class="ml-1 h-6 w-6 shrink-0"/>
              </transition>
            </div>
            <!-- <div class="text-lg mb-1">{{ selectedPreSet == index && 'SELECTED' }}</div> -->
          </div>
        </div>
      </div>
      <div class="flex justify-center w-full">
        <button @click="$refs.popup1.changeOpen()" class="items-center mb-4 mt-2 text-center px-7 py-2 shadow-lg text-base font-medium leading-6 text-white transition ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 dark:hover:bg-indigo-700 focus:outline-none">
          Закрити вибір
        </button>
      </div>
    </FullScreenPopup>

    <transition appear enter-active-class="duration-200 ease-in-out transition" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100">
      <div v-if="comments == ''" class="mx-auto text-center max-w-xl mb-4 md:mb-8">
        <p class="text-gray-400 dark:text-gray-500 text-base transition-colors">Тут будуть ваші повідомлення</p>
      </div>
      <h3 v-else class="pb-3 px-1 sm:text-center sm:mb-3 text-3xl font-extrabold leading-9 tracking-tight sm:leading-10 text-gray-900 dark:text-gray-200 transition-colors">
        Повідомлення
      </h3>
    </transition>

    <!-- comments -->
    <transition-group appear enter-active-class="duration-200 ease-in-out" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100" leave-active-class="ease-in duration-150" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-90">
      <div v-for="(item, index) in comments" :key="index">
        <Comment :usernameProps="item.name" :commentProps="item.comment" :avatarProps="item.avatar" :enableHTMLProps="item.isAI" :idProps="index+1" @deleteComment='deleteComment'/>
      </div>
    </transition-group>
  </div>

  <!-- 
  FIXED VARIANT:

  <div class="sm:mt-4" style="height: 172px;"></div>

  <div class="fixed flex max-w-7xl mx-auto z-10" style="bottom: 0; left: 0; right: 0; padding-bottom: calc(env(safe-area-inset-bottom));">
    <transition appear enter-active-class="duration-200 ease-in-out transition" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100">
      <BaseCard class="mx-4 w-full">
  -->
  
  <div class="flex max-w-7xl mx-auto z-10" style="position: sticky; bottom: 0; left: 0; right: 0; padding-bottom: calc(env(safe-area-inset-bottom));">
    <transition appear enter-active-class="duration-200 ease-in-out transition" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100">
      <BaseCard class="w-full">
        <div v-if="selectedPreSet == -1" @click="$refs.popup1.changeOpen()" class="h-full w-full text-center cursor-pointer">
          <p class="px-3 pt-3 mb-1 text-lg">
            <b>Для початку виберіть співрозмовника, для цього можете натиснути сюди.</b>
          </p>
        </div>
        <div v-else-if="comments[0] && selectedPreSet != comments[0].selectedPreSet" @click="deleteComment(-1)" class="h-full w-full text-center cursor-pointer">
          <p class="px-3 pt-3 mb-1 text-lg">
            <b>Щоб розпочати діалог з новим асистентом, очистьте історію.</b>
          </p>
        </div>
        <!-- Form -->
        <div v-else class="max-w-xl mx-auto">
          <div class="w-full px-3 sm:px-4 my-4" @keyup.enter="sendComment()">
            <div class="relative">
              <input v-model="comment" type="text" ref="mainInput" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="comment" autocomplete="off" />
              <label for="comment" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Запит</label>
            </div>
          </div>
          <!-- Btns -->
          <div class="px-3 sm:px-4 mb-3 flex">
            <div class="w-full">
              <!-- Not active btn -->
              <button v-if="comment.length < 6 || this.comment.length > 150" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-500 dark:bg-indigo-700" style="cursor: not-allowed">Відправити</button>
              <div v-else>
                <button v-if="isSendBtn" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-500 dark:bg-indigo-700"><svg class="inline animate-spin -ml-1 mr-2 mb-0.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Відправка...</button>
                <button v-else @click="sendComment()" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-600 hover:bg-indigo-500 dark:hover:bg-indigo-700 focus:outline-none">Відправити</button>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>
    </transition>
  </div>
</template>


<script>
import axios from 'axios'
import BaseCard from '@/components/BaseCard.vue'
import LazyImage from '@/components/LazyImage.vue'
import Comment from '@/components/comments/Comment.vue'
import FullScreenPopup from '@/components/FullScreenPopup.vue'
import LazyLinkBtn from '@/components/LazyLinkBtn.vue'
import { IdentificationIcon } from '@heroicons/vue/solid'
import { nextTick } from 'vue'
import { CheckIcon } from '@heroicons/vue/solid'

// Preload wardrobe
//import Wardrobe from '@/views/Wardrobe.vue'

const examples = [
  'Які окуляри підійдуть для овального обличчя?',
  'На якій сторінкі можна знайти лінзи?',
  'Як вибрати сонцезахисні окуляри для водіння?',
  'Чи є різниця між матеріалами оправ?',
]

export default {
  name: "ChatMainV2",

  components: {
    Comment,
    //Wardrobe, // preload (not for use)
    FullScreenPopup,
    IdentificationIcon,
    BaseCard,
    LazyImage,
    LazyLinkBtn,
    CheckIcon,
  },

  data: () => ({
    comment: "",
    comments: [],
    isSendBtn: false,
    examples,
    preSets: [],
    selectedPreSet: -1,
    isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
  }),

  async created() {
    // laod comments
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      this.comments = JSON.parse(savedComments);
    }
    // load presset
    localStorage.getItem('ai_preset') && (this.selectedPreSet = localStorage.getItem('ai_preset'))
    // load data && examples
    const { preSets } = await import('@/components/ai/Data.js');
    this.preSets = preSets;
  },

  mounted(){
    this.comments.length > 3 && window.scrollTo(0, document.body.scrollHeight);
  },

  methods: {
    sendComment(){
      // todo: better validation on client!
      if (this.comment.length < 6 || this.comment.length > 150 || this.isSendBtn || !this.preSets[0]) return;

      this.addComment({ 
        name: (localStorage.getItem('username') ? localStorage.getItem('username') : 'Користувач'), 
        comment: this.comment, 
        avatar: (localStorage.getItem('avatar') ? localStorage.getItem('avatar') : '1'),
        isAI: false
      })
      
      this.isSendBtn = true;
      axios.post(`https://finnik.netlify.app/.netlify/functions/gemini-2-0`, {
        base: this.preSets[this.selectedPreSet].req,
        msg: this.comments
        .slice(-5)
        .map(comment => ({
          role: comment.isAI ? "model" : "user",
          parts: [{ text: comment.comment }]
        }))
      },
      {timeout: 20000})
      .then(response => {
        console.log(response);

        this.comment = '';
        this.addComment({ 
          name: this.preSets[this.selectedPreSet].name, 
          comment: response.data.text.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '').replace(/а[їі]мон/g, "аймон"), 
          avatar: this.preSets[this.selectedPreSet].avatarId, 
          isAI: true
        });
      })
      .catch(e => {
        this.addComment({ 
          name: this.preSets[this.selectedPreSet].name, 
          comment: `${this.preSets[this.selectedPreSet].name} не дає відповідь, спробуйте ще раз пізніше.`, 
          avatar: this.preSets[this.selectedPreSet].avatarId,
          isAI: true
        });
        console.log(e);
      })
      .finally(() => (
        this.isSendBtn = false
      ));
    },

    async addComment(data){
      data.selectedPreSet = this.selectedPreSet;
      this.comments.push(data);
      data.isAI && localStorage.setItem('comments', JSON.stringify(this.comments.slice(-10)));
      await nextTick();
      // https://stackoverflow.com/questions/43996535/how-to-fix-safaris-html-margin-bottom-bug-in-ios-10-3-1
      if(this.isSafari){
        this.$refs.mainInput.blur();
      }
      // scroll only when need (+ fix safari big page)
      // alert(document.body.scrollHeight +" > "+ (this.isSafari ? screen.height : window.innerHeight-170));
      if(document.body.scrollHeight > (this.isSafari ? screen.height : window.innerHeight -170)){
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    },

    deleteComment(id){
      console.log(this.comments[id-1]); 
      // delete all
      id == -1 && (() => {
        this.comments[0] && window.scrollTo({ top: 0, behavior: 'smooth' });
        this.comments = [];
        localStorage.setItem('comments', '');
      })();
    },

    setExample(t){
      this.comment = t;
      this.$refs.mainInput.focus();
    },

    setPreset(index){
      this.selectedPreSet = index;
      localStorage.setItem('ai_preset', index);
    },
  }
}
</script>
