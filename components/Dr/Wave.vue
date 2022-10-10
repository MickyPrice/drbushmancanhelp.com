<template>
  <div>
    <img v-if="state" class="w-full" src="@/assets/img/dr/wave_up.png" alt="Dr. Bushman">
    <img v-if="!state" class="w-full" src="@/assets/img/dr/wave_down.png" alt="Dr. Bushman">
  </div>
</template>

<script>
export default {
  props: {
    isTalking: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      state: true,
      interval: 0
    }
  },
  mounted() {
    this.setTalking()
  },
  beforeDestroy() {
    this.setTalking(false)
  },
  methods: {
    setTalking() {
      setTimeout(() => {
        this.state = this.isTalking ? !this.state : true;
        this.setTalking(true)
      // }, Math.floor(Math.random() * 300))
      }, 150)
    }
  },
}
</script>

<style>

</style>