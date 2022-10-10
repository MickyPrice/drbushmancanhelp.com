<template>
  <div class="bg-white shadow-2xl p-4 pb-12">
    <div class="space-y-4">

      <div v-for="option, i in options" :key="i" class="flex items-center space-x-2">
        <button class="bg-blue-500 aspect-square overflow-visible h-8 w-8 shadow-xl text-5xl block active:scale-95 transition" :class="{ 'cursor-not-allowed' : !shown.includes(option) }" :disabled="!shown.includes(option)" @click="$emit('click', option)">
          <span v-if="ticked.includes(option)" class="block -mt-3 -mr-2">&#x2714;</span>
        </button>
        <div class="flex-1 border-b-4 border-black text-3xl h-8 overflow-y-visible">
          <div class="max-w-[210px]">
            <span v-if="shown.includes(option)">{{ option }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    shown: {
      default: () => [],
      type: Array,
    },
    ticked: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      options: [
        "Breathing",
        "History",
        "My Hair",
        "Worm In Brain"
      ]
    }
  },
}
</script>

<style>

</style>