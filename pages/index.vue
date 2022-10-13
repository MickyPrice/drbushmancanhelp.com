<template>
  <div>
    <Transition name="zoom">
      <Window v-if="commentPopup" @close="startTrack(10)">
        <div class="bg-teal-500 -m-4 p-4">
          <div>
            <h2 class="text-5xl text-black">LEAVE A<br>COMMENT</h2>
          </div>
          <form @submit.prevent="startTrack(10)">
            <textarea v-model="comments" class="w-full min-h-[100px] border p-1 shadow-lg focus:outline-none bg-white mt-4 rounded"/>
            <button :disabled="isSendingComment" type="submit" class="mt-4 block w-fit bg-blue-500 text-black px-4 py-2 hover:text-white shadow-2xl transition active:scale-95">
              <span v-if="!isSendingComment">Send Comment</span>
              <span v-else>Sending...</span>
            </button>
          </form>
        </div>
      </Window>
    </Transition>

    <Transition name="zoom">
      <Window v-if="diagnosisPopupOpen" @close="startTrack(9)">
        <div class="flex items-center justify-between">
          <h2 class="text-5xl text-black">DIAGANOSIS</h2>
          <img src="@/assets/img/face_is_longer_than_it_should_be.png" alt="Dr. Bushman Can Help" class="w-16 drop-shadow-2xl select-none pointer-events-none">
        </div>
        <div>
          <img src="@/assets/img/diagnosis.png" alt="Diagnosis: Worm in brain" class="w-full mt-2" />
          <button class="mx-auto mt-4 block w-fit bg-blue-500 text-black px-4 py-2 hover:text-white shadow-2xl transition active:scale-95"  @click="startTrack(9)" >
            Understood
          </button>
        </div>
      </Window>
    </Transition>

    <div v-if="welcomeWrapper" class="fixed inset-0 bg-blue-700/50 z-20 flex items-center justify-center">
      <Transition name="zoom" @after-leave="welcomeWrapper = false">
      <div v-if="welcome" class="bg-white max-w-lg rounded-xl overflow-hidden">
        <header class="bg-gray-100 flex items-center space-x-2 p-2">
          <button class="bg-red-500 aspect-square w-4 hover:bg-red-400" @click="setStopped(true)"/>
          <div class="bg-yellow-500 aspect-square w-4"/>
        </header>
        <div class="text-center p-4">
          <p class="text-2xl bg-blue-700 text-teal-300 w-fit p-1 mx-auto">Welcome to Dr. Bushman MD</p>
          <p class="text-lg bg-blue-700 text-black w-fit p-1 mt-1 mx-auto">Please accept the following:</p>
          <ul class="my-4">
            <li class="my-1">Dr. Bushman does not claim to be a licensed doctor</li>
            <li class="my-1">Dr. Bushman only offers opinions, not true diagnosis</li>
            <li class="my-1">Dr. Bushman holds no liability to your health after appointment</li>
          </ul>
          <button class="mx-auto block w-fit bg-blue-500 text-black px-4 py-2 hover:text-white shadow-2xl transition active:scale-95" @click="startTrack(1)">
            I accept
          </button>
        </div>
      </div>
      </Transition>
    </div>

    <header class="p-1 flex justify-between items-center">
      <div>
        <h1 class="capitalize text-8xl p-1 pr-4 bg-blue-700 mb-2 text-teal-300 w-fit shadow-2xl">
          <span class="drop-shadow-2xl">
            Dr. Bushman
          </span>
        </h1>
        <h2 class="capitalize text-5xl p-1 pr-4 bg-blue-700 mb-2 text-black w-fit shadow-2xl">
          <span class="drop-shadow-2xl">
            Dr Bushman Can Help!
          </span>
        </h2>
      </div>
      <div class="pr-4">
        <img src="@/assets/img/face_is_longer_than_it_should_be.png" alt="Dr. Bushman Can Help" class="w-48 drop-shadow-2xl select-none pointer-events-none">
      </div>
    </header>

    <div class="grid grid-cols-2 gap-4">

      <section class="col-span-1 p-6">
        <Testimonials v-if="showTestimonials" />
        <List v-if="showList" :shown="shownListItems" :ticked="tickedListItems" @click="tickListItem"/>
        <!-- <button @click="dr = 'Wave'">Wave</button>
        <button @click="dr = 'Bandanna'">Bandanna</button>
        <button @click="dr = 'Clipboard'">Clipboard</button>
        <button @click="isTalking = !isTalking">Toggle Talking</button><br> -->
      </section>

      <section class="col-span-1">
        <div>
          <Dr-Wave v-if="dr === 'Wave'" :is-talking="isTalking" class="w-[120%] -ml-[20%]" />
          <Dr-Clipboard v-else-if="dr === 'Clipboard'" :is-talking="isTalking" class="w-[120%] -ml-[20%]" />
          <Dr-Bandanna v-else-if="dr === 'Bandanna'" :is-talking="isTalking" class="w-[120%] -ml-[20%]" />
        </div>
      </section>

    </div>
    <Audio-Player v-model="isTalking" :track="currentTrack" @timeupdate="currentAudioTime = $event.target.currentTime"/>
  </div>
</template>

<script>
import { addDoc, collection } from "firebase/firestore";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      dr: "Wave",
      isTalking: false,
      currentAudioTime: 0,
      currentTrackNo: 1,
      currentTrack: "/mp3/1_what_seems_to_be_the_problem.mp3",
      welcome: true,
      welcomeWrapper: true, // TODO: Change back
      showTestimonials: true,
      showList: false,
      diagnosisPopupOpen: false,
      commentPopup: false,

      shownListItems: [],
      tickedListItems: [],
      comments: "",
      isSendingComment: false
    }
  },
  methods: {
    ...mapActions({
      setStopped: 'setStopped'
    }),
    tickListItem(option) {
      if (option === 'Breathing' && this.currentTrackNo === 4 && !this.tickedListItems.includes("Breathing")) {
        this.startTrack(5)
        this.tickedListItems.push("Breathing")
      }
      if (option === 'History' && this.currentTrackNo === 5 && !this.tickedListItems.includes("History")) {
        this.startTrack(6)
        this.tickedListItems.push("History")
      }
      if (option === 'My Hair' && this.currentTrackNo === 6 && !this.tickedListItems.includes("My Hair")) {
        this.startTrack(7)
        this.tickedListItems.push("My Hair")
      }
      if (option === 'Worm In Brain' && this.currentTrackNo === 7 && !this.tickedListItems.includes("Worm In Brain")) {
        this.startTrack(8)
        this.tickedListItems.push("Worm In Brain")
      }
    },
    startTrack(track) {
      this.currentTrackNo = track;
      switch (track) {
        case (1): {
          this.welcome = false;
          setTimeout(() => {
            this.dr = "Wave";
            this.currentTrack = "/mp3/1_what_seems_to_be_the_problem.mp3"; // About 2.5 seconds
            this.isTalking = true;
            setTimeout(() => {
              this.startTrack(2) 
            }, 2500) // 5 seconds after track finishes
          }, 500)
          break;
        }
        case (2): {
          this.currentTrack = "/mp3/2_ok_im_sorry_to_hear_than.mp3"; // About 2.5 seconds
          setTimeout(() => {
            this.dr = "Clipboard"
            this.showTestimonials = false;
            this.isTalking = true;

            setTimeout(() => {
              this.startTrack(3)
            }, 3000) // 

          }, 100)
          break;
        }
        case (3): {
          this.currentTrack = "/mp3/3_please_answer_these_simple_questions.mp3"; // About 4 seconds
          setTimeout(() => {
            this.showList = true;
            this.isTalking = true;
            setTimeout(() => {
              this.startTrack(4)
            }, 6000)
          }, 100)
          break;
        }
        case (4): {
          this.currentTrack = "/mp3/4_is_he_breathing.mp3"; // About 4 seconds
          setTimeout(() => {
            this.isTalking = true;
            setTimeout(() => {
              this.shownListItems.push('Breathing')
            }, 4300)
          }, 100)
          break;
        }
        case (5): {
          this.currentTrack = "/mp3/5_does_he_have_a_history.mp3"; // About 3 seconds
          setTimeout(() => {
            this.isTalking = true;
            setTimeout(() => {
              this.shownListItems.push('History')
            }, 4000)
          }, 100)
          break;
        }
        case (6): {
          this.currentTrack = "/mp3/6_ok_great_would_he_be_surprised.mp3"; // About 8 seconds
          setTimeout(() => {
            this.isTalking = true;
            setTimeout(() => {
              this.dr = "Bandanna";
            }, 4400)
            setTimeout(() => {
              this.shownListItems.push("My Hair")
            }, 8500)
          }, 100)
          break;
        }
        case (7): {
          this.currentTrack = "/mp3/7_final_question_worm_in_his_brain.mp3"; // About 6 seconds
          this.dr = "Clipboard"
          setTimeout(() => {
            this.isTalking = true;
            setTimeout(() => {
              this.shownListItems.push("Worm In Brain")
            }, 6000)
          }, 100)
          break;
        }
        case (8): {
          this.currentTrack = "/mp3/8_ready_to_diaganose.mp3"; // About 8 seconds
          setTimeout(() => {
            this.isTalking = true;
            setTimeout(() => {
              // Print diaganosis
              this.diagnosisPopupOpen = true
            }, 4500)
          }, 100)
          break;
        }
        case (9): {
          this.diagnosisPopupOpen = false;
          this.showList = false;
          this.currentTrack = "/mp3/9_thank_you_for_visiting.mp3"; // About 7 seconds
          setTimeout(() => {
            this.isTalking = true;
            this.commentPopup = true;
          }, 100)
          break;
        }
        case (10): {
          this.commentPopup = false;
          this.currentTrack = "/mp3/10_out.mp3"; // About 1 seconds
          this.isSendingComment = true;
          setTimeout(() => {
            this.isTalking = true;
            if (this.comments) {
              addDoc(collection(this.$fire.firestore, "comments"), {
                comment: this.comments,
                date: new Date(),
              })
              .then(_ => {})
              .catch(e => {
                console.error("Error adding document: ", e);
              })
              .finally(() => {
                this.$store.dispatch('setOut')
              })
            } else {
              setTimeout(() => {
                this.$store.dispatch('setOut')
              }, 500)
            }
          }, 100)
          break;
        }
      }
    }
  }
}
</script>

<style>

/* .zoom-enter-active #popup,
.zoom-leave-active #popup {
  transition: all 1s ease;
  transform: scale(1)
}

.zoom-enter-from #popup,
.zoom-leave-to #popup {
  transform: scale(0)
} */


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