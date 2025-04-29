<template>
  <div class="all">
    <div :class="{'ziti':isred}">
      <h1>距离2024年还有：{{ hours }}小时 : {{ minutes }}分钟 : {{ seconds }}秒</h1>
    </div>
    <div class="ersan" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
  </div>
</template>

<style>
.all{
  width: 98vw;
  background-color:antiquewhite;
  border-radius: 5%;
}
.ersan {
  border-radius: 5%;
  /* background:url("../images/ersan.jpg") ; */
  background-repeat: no-repeat;
  background-size: 100%;
  width: 98vw;
  height: 100vh;
  bottom: 10px;
}
.ziti {
  padding-top: 50px;
  font-size: 20pt;
  color: red;
}
</style>

<script>
export default {
  data() {
    return {
      isred: false,
      imgUrl: require("../images/ersan.jpg"),
      endTime: new Date().getTime() + 12 * 1000, // 倒计时结束时间（单位：毫秒）
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  },
  mounted() {
    this.countDown();
  },
  methods: {
    countDown() {
      setInterval(() => {
        let nowTime = new Date().getTime();
        let remainingTime = this.endTime - nowTime; // 剩余时间

        if (remainingTime <= 0) {
          clearInterval(this.countDown);
          this.imgUrl = require("../images/ersi.png");
          this.isred = true;
        } else {
          this.hours = Math.floor(remainingTime / (1000 * 60 * 60));
          this.minutes = Math.floor(
            (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
          );
          this.seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        }
      }, 1000);
    }
  }
};
</script>