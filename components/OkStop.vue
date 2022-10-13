<template>
  <div v-if="isStopped" @click="unstop">
    <div class="fixed inset-0 crt-background z-50">
      <div class="max-w-[1200px] w-full mx-auto relative">
        <Transition name="bounce">
          <img v-if="logoShown" src="@/assets/img/ok_stop_organisation.png" alt="Ok Stop!" class="absolute top-12 right-12 w-48">
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      logoShown: false
    }
  },
  computed: {
    ...mapGetters({
      isStopped: 'isStopped'
    })
  },
  watch: {
    isStopped(v) {
      if (v) {
        setTimeout(() => {
          this.logoShown = true
        }, 200)
      } else {
        this.logoShown = false
      }
    }
  },
  methods: {
    ...mapActions({
      setStopped: 'setStopped'
    }),
    unstop() {
      this.setStopped(false)
    }
  },
}
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0) rotate(30deg);
  }
  50% {
    transform: scale(1.25) rotate(-10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
</style>