<template>
  <div ref="popup" class="bg-white max-w-lg rounded-xl overflow-hidden transition fixed w-full desktop:w-[500px] shadow-2xl z-40" :style="{ top: `${y}px`, left: `${x}px` }">
    <header class="bg-gray-100 flex items-center space-x-2 p-2 cursor-move" @mousedown="isDragging = true">
      <div class="bg-red-500 aspect-square w-4" @click="$emit('close')"/>
      <div class="bg-yellow-500 aspect-square w-4"/>
    </header>
    <div class="p-4 bg-gray-50">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    startingX: {
      type: Number,
      default: 0
    },
    startingY: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      x: 0,
      y: 0,
      isDragging: false,

      pos1: 0,
      pos2: 0,
      pos3: 0,
      pos4: 0
    }
  },
  mounted() {
    this.x = this.startingX || (window.innerWidth/2) - (this.$refs.popup.clientWidth/2)
    this.y = this.startingY || (this.$refs.popup.clientHeight/2)
    document.addEventListener('mouseup', () => {this.isDragging = false})
    document.addEventListener('mousemove', this.updatePosition)
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', () => {this.isDragging = false})
    document.removeEventListener('mousemove', () => this.updatePosition)
  },
  methods: {
    updatePosition($event) {
      if (this.isDragging) {
        const x = $event.clientX - (this.$refs.popup.clientWidth/2);
        const y = $event.clientY - 10;
        this.x = Math.max(Math.min(x, window.innerWidth - (this.$refs.popup.clientWidth)), 0)
        this.y = Math.max(Math.min(y, window.innerHeight - (this.$refs.popup.clientHeight)), 0)
      }
    }
  }
}
</script>

<style>

</style>