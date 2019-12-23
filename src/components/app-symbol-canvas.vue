<template>
  <div class="symbol-canvas">
    <pre>{{horBorder}}</pre>
    <pre
      class="canvas-line"
      v-for="(line, index) in pattern"
      :item="line"
      :key="index"
      :title="index"
    >{{verticalBorderSymbol}}{{line}}{{verticalBorderSymbol}}</pre>
    <pre>{{horBorder}}</pre>
  </div>
</template>

<script>
  export default {
    name: "app-symbol-canvas",
    props: {
      width: {
        type: Number,
        default: 20,
      },
      height: {
        type: Number,
        default: 10,
      },
      drawAction: {
        type: Object,
      }
    },
    data() {
      return {
        horBorder: this.horizontalBorder(),
        verticalBorderSymbol: '|',
        pattern: this.emptyPattern(),
        drawSymbol: 'x'
      }
    },
    methods: {
      horizontalBorder() {
        let borderSymbol = '-';
        return (new Array(+this.width + 3)).join(borderSymbol);
      },
      emptyPattern(symb) {
        let sym = symb || ' ';
        let pattern = new Array(+this.height);
        for (let i = 0; i < pattern.length; i++) {
          pattern[i] = (new Array(+this.width + 1)).join(sym);
        }
        return pattern;
      },
      drawLine(x1, y1, x2, y2) {
        // console.log("dl");
        if (!(x1 == x2 || y1 == y2)) {
          this.trowError("wrong line coordinates, line can be only vertical or horizontal");
          return false;
        }
        let paintOutArr = [];
        let i = 0;
        if (x1 == x2) {
          let start = y1 < y2 ? y1 : y2;
          let end = y1 > y2 ? y1 : y2;
          // console.log(y1, y2, start, end);
          for (i = start; i <= end; i++) {
            paintOutArr.push({x: x1, y: i});
          }
        } else {
          let start = x1 < x2 ? x1 : x2;
          let end = x1 > x2 ? x1 : x2;
          for (i = start; i <= end; i++) {
            paintOutArr.push({x: i, y: y1});
          }
        }
        this.paintOutDots(paintOutArr);
        this.pattern.reverse().reverse();
      },
      drawRectangle(x1, y1, x2, y2) {
        // console.log("dr");
        let startX = x1 < x2 ? x1 : x2;
        let endX = x1 > x2 ? x1 : x2;
        let startY = y1 < y2 ? y1 : y2;
        let endY = y1 > y2 ? y1 : y2;

        // console.log(startX, startY, endX, endY);

        this.drawLine(startX, startY, startX, endY);
        this.drawLine(startX, startY, endX, startY);
        this.drawLine(startX, endY, endX, endY);
        this.drawLine(endX, startY, endX, endY);

      },
      bucketFill(x1, y1, c) {
        let saveSymb = this.drawSymbol;
        this.drawSymbol = c;
        console.log("bf", x1, y1, c);

        let ss = {}, dotsArr = [];
        //find left side
        ss = {x: x1, y: y1};
        while (this.pattern[ss.y][ss.x - 1] == ' ') {
          ss.x--;
          dotsArr.push({x: ss.x, y: ss.y});
        }

        // console.log("dots arr left side", dotsArr);

        this.drawLine(x1, y1, ss.x, ss.y);
        //find right side
        ss = {x: x1, y: y1};
        while (this.pattern[ss.y][ss.x + 1] == ' ') {
          ss.x++;
          dotsArr.push({x: ss.x, y: ss.y});
        }
        this.drawLine(x1, y1, ss.x, ss.y);

        // this.drawSymbol = 'Ж';
        // this.paintOutDots([{x: x1, y: y1}]);
        // this.drawSymbol = c;

        filing.apply(this, [dotsArr, "vertical"]);

        function filing(filledDotsArr, direction) {
          // console.log("filing", filledDotsArr, direction);
          if (direction == "horizontal") {
            filledDotsArr.forEach(dot => {
              // console.log("filing line");
              let ss;
              let dotsArr = [];
              //find left side
              ss = {x: dot.x, y: dot.y};
              while (this.pattern[ss.y][ss.x - 1] == ' ') {
                ss.x--;
                dotsArr.push({x: ss.x, y: ss.y});
              }
              // console.log(ss.x);
              // if (ss.x == 1 && this.pattern[ss.y][0] == ' ') dotsArr.push({x: 0, y: ss.y});
              this.drawLine(dot.x, dot.y, ss.x, ss.y);
              //find right side
              ss = {x: dot.x, y: dot.y};
              while (this.pattern[ss.y][ss.x + 1] == ' ') {
                ss.x++;
                dotsArr.push({x: ss.x, y: ss.y});
              }
              this.drawLine(dot.x, dot.y, ss.x, ss.y);

              if (dotsArr.length) filing.apply(this, [dotsArr, "vertical"]);
            });
          } else {
            filledDotsArr.forEach(dot => {
              // console.log("filing line");
              let ss;
              let dotsArr = [];
              //find top side
              ss = {x: dot.x, y: dot.y};
              // while (this.pattern[ss.y - 1][ss.x] == ' ' && ss.y > 1) {

              while (this.pattern[ss.y - 1] && this.pattern[ss.y - 1][ss.x] == ' ') {
                ss.y--;
                dotsArr.push({x: ss.x, y: ss.y});
              }

              // while (this.pattern[ss.y] && this.pattern[ss.y - 1][ss.x] == ' ' ) {
              //   ss.y--;
              //   dotsArr.push({x: ss.x, y: ss.y - 1});
              // }

              this.drawLine(dot.x, dot.y, ss.x, ss.y);
              //find bottom side
              ss = {x: dot.x, y: dot.y};
              // while (this.pattern[ss.y + 1][ss.x] == ' ' && ss.y < this.height - 2) {
              while (this.pattern[ss.y + 1] && this.pattern[ss.y + 1][ss.x] == ' ') {

                // console.log({x: ss.x, y: ss.y}, this.height);
                dotsArr.push({x: ss.x, y: ss.y});
                ss.y++;
              }
              this.drawLine(dot.x, dot.y, ss.x, ss.y);

              if (dotsArr.length) filing.apply(this, [dotsArr, "horizontal"]);
            });
          }
        }

        this.drawSymbol = saveSymb;
      },
      paintOutDots(arr) {
        arr.forEach(dot => {
          // console.log(dot.x, this.pattern[0].length - 1, dot.y, this.pattern.length - 1);
          if (dot.y <= this.pattern.length - 1 && dot.x <= this.pattern[0].length - 1 && dot.x != 0 && dot.y != 0) {
            // console.log(this.pattern[dot.x][dot.y]);
            // console.log(this.pattern[dot.y].substr(0, dot.x) + this.drawSymbol + this.pattern[dot.y].substr(dot.x + 1));
            this.pattern[dot.y] = this.pattern[dot.y].substr(0, dot.x) + this.drawSymbol + this.pattern[dot.y].substr(dot.x + 1);
            // console.log(this.pattern);
          }
        });
      },
      trowError(e) {
        console.log(`Error: ${e}`)
      }
    },
    created: function () {
      // this.drawRectangle(45, 40, 5, 10);
      // this.drawRectangle(25, 5, 15, 15);
      // this.drawRectangle(20, 20, 40, 27);
      // this.drawRectangle(2, 28, 20, 34);
      // this.drawRectangle(30, 28, 50, 34);
      // this.bucketFill(47, 35, 'q');
      // this.bucketFill(1, 1, 'k');
    },
    watch: {
      drawAction: function () {
        let {x1, y1, x2, y2, symbol} = this.drawAction;
        switch (this.drawAction.type) {
          case "line":
            this.drawLine(x1, y1, x2, y2);
            break;
          case "rectangle":
            this.drawRectangle(x1, y1, x2, y2);
            break;
          case "bucket fill":
            this.bucketFill(x1, y1, symbol);
            break;
          default:
            console.log(`Wrong draw action:`, this.drawAction);
        }
      }
    }
  }
</script>

<style scoped>
  .symbol-canvas {
    line-height: 0.1;
  }

  .canvas-line {
    white-space: pre;
    /*font-stretch: ultra-expanded;*/
  }
</style>
