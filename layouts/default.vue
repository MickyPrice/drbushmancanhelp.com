<template>
  <div class="bg-blue-700 min-h-screen py-8">
    <Transition name="zoom">
      <div  v-if="!isOut" class="w-[1000px] mx-auto rounded-xl overflow-hidden shadow-2xl shadow-black">
        <div class="bg-gray-100 rounded-t-xl p-4 flex items-center space-x-4">
          <a class="aspect-square bg-red-500 shadow-xl w-8 block hover:bg-red-400" href="https://twitter.com/michaelpricenz"/>
          <div class="aspect-square bg-yellow-500 shadow-xl w-8"/>
        </div>
        <main class="bg-teal-300">
          <nuxt/>
        </main>
      </div>
    </Transition>

    <div id="preload" class="hidden">
      <img src="@/assets/img/dr/bandanna_mouth_closed.png" alt="Dr. Bushman">
      <img src="@/assets/img/dr/bandanna_mouth_open.png" alt="Dr. Bushman">
      <img src="@/assets/img/dr/clipboard_mouth_closed.png" alt="Dr. Bushman">
      <img src="@/assets/img/dr/clipboard_mouth_open.png" alt="Dr. Bushman">
      <img src="@/assets/img/dr/wave_up.png" alt="Dr. Bushman">
      <img src="@/assets/img/dr/wave_down.png" alt="Dr. Bushman">
      <img src="@/assets/img/face_is_longer_than_it_should_be.png" alt="Dr. Bushman Can Help">
    </div>

    <div class="absolute bottom-2 right-2 text-white opacity-70" :class="{ 'hidden': !isOut }">
      Website recreated by <a href="https://twitter.com/michaelpricenz" class="underline text-white">Michael Price</a>.
    </div>

    <Ok-Stop />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      isOut: 'isOut'
    })
  }
}
</script>

<style>
@keyframes zoom {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.zoom-enter-active {
  animation: zoom 0.5s;
}
.zoom-leave-active {
  animation: zoom 0.5s reverse;
}

</style>