<template>
  <div>
    <audio ref="audio" :src="track" @timeupdate="$emit('timeupdate', $event)" @ended="isPlaying = false" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    track: {
      type: String,
      default: null
    }
  },
  computed: {
    isPlaying: {
      set(v) {
        this.$emit('input', v)
      },
      get() {
        return this.value
      }
    }
  },
  watch: {
    isPlaying(isPlaying) {
      if (isPlaying) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    }
  }
}
</script>

<style>

</style>