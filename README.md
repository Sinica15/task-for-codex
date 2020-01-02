Task For Codex
==============

> Created using Vue.js

App for drawing simple figure, using for drawing pseudographics symbols

![app in work](https://raw.githubusercontent.com/Sinica15/task-for-codex/master/forRM/app_in_work.png)
## Commands which can used

C w h​ (C 20 25): create canvas with width w and height h.

L x1 y1 x2 y2 (L 15 9 7 9): create line from (x1,y1) to (x2,y2), using for drawing pseudographic symbol “x”. Only vertical and horizontal lines supported.

R x1 y1 x2 y2 (R 5 4 12 14): create rectangle with upper left corner at the point (x1,y1), bottom right corner at point (x2,y2).

B x y c (B 1 2 c): fill all area (x,y) color ("colour", c), working like a bucket fill in common images editors.

## Build Setup

``` bash
# Install dependencies
npm install

# Serve with hot reload at localhost:8080
npm run dev

# Build for production with minification
npm run build

# Run unit tests
npm run unit
```
