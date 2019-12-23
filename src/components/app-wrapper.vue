<template>
  <div class="wrapper">
    <app-command-button
      value="Create canvas"
      @canvasCommand="updateAction"
    />
    <app-symbol-canvas
      v-if="canvasIsCrated"
      :width="canvasWidth"
      :height="canvasHeight"
      :drawAction="someAction"
    />
  </div>
</template>

<script>
  import appCommandButton from "./app-command-button";
  import appSymbolCanvas from "./app-symbol-canvas";

  export default {
    name: "app-wrapper",
    data() {
      return {
        canvasIsCrated: false,
        canvasHeight: 50,
        canvasWidth: 70,
        someAction: {
          type: "some action",
          patternSymbol: '4'
        }
      }
    },
    components: {
      "app-command-button": appCommandButton,
      "app-symbol-canvas": appSymbolCanvas,
    },
    methods: {
      updateAction(upd) {
        if (upd.type == "canvas") {
          this.canvasHeight = upd.h;
          this.canvasWidth = upd.w;
          this.canvasIsCrated = true;
        } else {
          this.someAction = upd;
        }
      }
    },
    created: function () {
      // setTimeout(() => {
      //   this.someAction = {
      //     type: "some action",
      //     patternSymbol: '4'
      //   };
      //   console.log(this);
      // }, 2000);
    }
  };

</script>

<style scoped>

</style>
