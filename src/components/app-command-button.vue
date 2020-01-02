<template>
  <div class="command-button">
    <input
      type="text"
      placeholder="Input command..."
      v-model="command"
      @keyup.enter="executeCommand"
    >
    <input
      type="button"
      :value="value"
      @click="executeCommand"
    >
  </div>
</template>

<script>
  export default {
    name: "app-command-button",
    props: ['value'],
    data() {
      return {
        command: "",
      }
    },
    methods: {
      executeCommand() {
        // console.log(this.command);
        let parsedCommand = this.parsingCommand(this.command);
        if (parsedCommand) {
          this.$emit("canvasCommand", parsedCommand);
        } else {

        }
        this.command = "";
      },
      parsingCommand(command) {
        if (!command) return false;
        let commandObj = true;
        let flag = true;
        let commArr = command.match(/\b(\w+)\b/g);
        switch (commArr[0].toUpperCase()) {
          case 'C':
            if (commArr.length < 3) wrongCommand(command, "ned");
            commandObj = {
              type: "canvas",
              w: isNumber(commArr[1]) + 1,
              h: isNumber(commArr[2]) + 1
            };
            break;
          case 'L':
            if (commArr.length < 5) wrongCommand(command, "ned");
            commandObj = {
              type: "line",
              x1: isNumber(commArr[1]),
              y1: isNumber(commArr[2]),
              x2: isNumber(commArr[3]),
              y2: isNumber(commArr[4])
            };
            break;
          case 'R':
            if (commArr.length < 5) wrongCommand(command, "ned");
            commandObj = {
              type: "rectangle",
              x1: isNumber(commArr[1]),
              y1: isNumber(commArr[2]),
              x2: isNumber(commArr[3]),
              y2: isNumber(commArr[4])
            };
            break;
          case 'B':
            if (commArr.length < 4) wrongCommand(command, "ned");
            commandObj = {
              type: "bucket fill",
              x1: isNumber(commArr[1]),
              y1: isNumber(commArr[2]),
              symbol: commArr[3]
            };
            break;
          default:
            wrongCommand(command, "wc");
        }

        console.log(commandObj);
        if (flag) return commandObj;
        return false;

        function wrongCommand(command, er) {
          if (er == "ned") er = "not enough data for operation";
          if (er == "wc") er = "wrong command";
          if (er == "wa") er = "wrong argument";
          if (!er) er = "unknown";
          if (commandObj) {
            console.log(`Wrong command: ${command}. Error: ${er}`);
          }
          flag = false;
          commandObj = false;
        }

        function isNumber(num) {
          if (isNaN(parseInt(num))) return wrongCommand(command, "wa");
          return (parseInt(num) - 1);
        }
      }
    }
  }
</script>

<style scoped>

</style>
