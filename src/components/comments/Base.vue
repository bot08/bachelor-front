<template>
  <div>
    <transition appear enter-active-class="duration-200 ease-in-out" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100">
      <BaseCard class="transition">
        <!-- Form -->
        <div v-if="setProfile" class="max-w-xl mx-auto">
          <div class="w-full px-3 sm:px-4 my-4" @keyup.enter="sendComment()">
            <div class="relative">
              <input v-model="comment" type="text" class="peer pt-8 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 dark:text-gray-200 transition-colors focus:outline-none rounded-lg focus:shadow-sm w-full p-3 h-16 placeholder-transparent" placeholder="comment" autocomplete="off" />
              <label for="comment" class="dark:text-gray-200 peer-placeholder-shown:opacity-100 opacity-75 peer-focus:opacity-75 peer-placeholder-shown:scale-100 scale-75 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 translate-x-1 peer-focus:translate-x-1 absolute top-0 left-0 px-3 py-5 h-full pointer-events-none origin-left transition-all duration-100 ease-in-out">Комментарий</label>
            </div>
          </div>
          <!-- Btns -->
          <div class="px-3 sm:px-4 mb-3 flex">
            <div class="mr-3 w-full">
              <!-- Not active btn -->
              <button v-if="comment.length < 8" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-500 dark:bg-indigo-700" style="cursor: not-allowed">Отправить</button>
              <div v-else>
                <button v-if="isSendBtn" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-500 dark:bg-indigo-700"><svg class="inline animate-spin -ml-1 mr-2 mb-0.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Отправка...</button>
                <button v-else @click="sendComment()" class="w-full py-2 px-4 text-base font-medium rounded-md text-white transition ease-in-out bg-indigo-600 hover:bg-indigo-500 dark:hover:bg-indigo-700 focus:outline-none">Отправить</button>
              </div>
            </div>
            <!-- <Wardrobe :picProps="21"/> -->
            <router-link to="/wardrobe" class="inline-flex justify-center rounded-md shadow-lg p-2 transition-colors ease-in-out bg-indigo-600 focus:outline-none hover:bg-indigo-500 dark:hover:bg-indigo-700 text-base font-medium text-white">
              <IdentificationIcon class="h-6 w-6"/>
            </router-link>
          </div>
        </div>
        <!-- Set profile text -->
        <router-link v-else to="/wardrobe" class="h-full w-full text-center">
          <p class="px-3 pt-3 mb-1 text-lg">
            <div v-if="!checkNoPromoOnly()">
              <!-- Mobile -->
              <b class="md:hidden">Чтобы написать свой чудесный комментарий, нажми сюда</b>
              <!-- PC -->
              <b class="hidden md:block">Прежде чем оставить свой замечательный комментарий, нажми сюда</b>
            </div>
            <b v-else>Промокод не указан или исчерпаны все его использования</b>
          </p>
        </router-link>
      </BaseCard>
    </transition>

    <!-- comments -->
    <transition-group enter-active-class="duration-200 ease-in-out" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100">
      <div v-for="(item, index) in comments" :key="item.id" :style="{ 'transition-delay': index * 100 + 'ms' }">
        <Comment :usernameProps="item.username" :commentProps="item.comment" :avatarProps="item.avatar_id" :idProps="item.id" @deleteComment='deleteComment'/>
      </div>
    </transition-group>

    <!-- Nothing here -->
    <transition enter-active-class="duration-200 ease-in-out transition" enter-from-class="opacity-0 scale-90" enter-to-class="opacity-100 scale-100">
      <div v-if="comments == ''" class="mx-auto text-center max-w-xl mb-4 md:mb-8">
        <p class="text-gray-400 dark:text-gray-500 text-base transition-colors">Комментариев пока нет</p>
      </div>
    </transition>
  </div>
</template>


<script>
import axios from 'axios'
import BaseCard from '@/components/BaseCard.vue'
import Comment from '@/components/comments/Comment.vue'
import { IdentificationIcon } from '@heroicons/vue/solid'
//import Wardrobe from '@/components/comments/WardrobeFullScreen.vue'

// Preload wardrobe
import Wardrobe from '@/views/Wardrobe.vue'

export default {
  name: "CommentsBase",

  components: {
    Comment,
    Wardrobe, // preload not for use
    IdentificationIcon,
    BaseCard
  },

  data: () => ({
    setProfile: false,
    comment: "",
    comments: null,
    isSendBtn: false,
  }),

  props:[
    'branchProps'
  ],

  created(){
    this.getComments();
    this.checkProfile();
  },

  methods: {
    getComments(){
      axios.get('/additional/comments/get.php?branch='+this.branchProps)
      .then(response => {
        this.comments = response.data
      })
      .catch(e => {
        // TODO: error
        console.log(e)
      })
      .finally(() => (
        console.log(this.comments)
      ));
    },

    sendComment(){
      // todo validation on client!
      if (this.comment.length < 8 || this.isSendBtn) return;

      this.isSendBtn = true;
      axios.get(`/additional/comments/add.php?username=${localStorage.getItem('username')}&avatar_id=${localStorage.getItem('avatar')}&comment=${this.comment}&branch=${this.branchProps}&code_use=${localStorage.getItem('promo')}`)
      .then(response => {
        console.log(response);
        this.comment = '';
        this.getComments();
        // -1 code usage & re-check profile (if 0)
        localStorage.setItem("promo_usages", localStorage.getItem("promo_usages")-1);
        this.checkProfile();
      })
      .catch(e => {
        // TODO error
        console.log(e);
      })
      .finally(() => (
        this.isSendBtn = false
      ));
    },

    deleteComment(id){
      axios.get(`/additional/comments/delete.php?id=${id}&secret=${localStorage.getItem("secret")}`)
      .then(response => {
        console.log(response);
        this.getComments();
      })
      .catch(e => {
        // TODO error
        console.log(e);
      })
    },

    checkProfile(){
      if(localStorage.getItem('comments_rules') && localStorage.getItem('username') && localStorage.getItem('promo') && localStorage.getItem('promo_usages') > 0 && localStorage.getItem('avatar')) {
        this.setProfile = true;
      }
      else {
        this.setProfile = false;
      }
    },

    checkNoPromoOnly(){
      if(localStorage.getItem('comments_rules') && localStorage.getItem('username') && localStorage.getItem('avatar')) {
        return true
      }
      return false
    },
  },

  // if change route check profile
  watch: {
    '$route.path'() {
      this.checkProfile();
    }
  }
}
</script>