<template>
  <div id="menu">
    <router-link to="/stocks">
      <button id="sound_mode" @click='goToStockList'>Sound Mode</button>
    </router-link>
    <router-view></router-view>
  </div>
  <div class="blue-screen" v-show="showBlueScreen" >
      <div class="progressBar">
        <div id="bar" class="innerbar"></div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBlueScreen: true,
      progressbarHandler: null,
      timeBegan: null,
      MAX_TIME: 1300,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showBlueScreen = false;
    }, 1300);
    // this.start()
  },
  methods: {
    goToStockList() {
      this.$router.push('/stocks')
    },
    // start() {
    //   this.timeBegan = new Date();
    //   let el = document.getElementById("bar");
    //   el.style.width = "0%";

    //   if (this.progressbarHandler == null) {
    //     this.progressbarHandler = setInterval(this.updateProgressbar, 15);
    //   }
    // },
    // updateProgressbar() {
    //   var currentTime = new Date(),
    //     timeElapsed = new Date(
    //       this.countDownTime - (currentTime - this.timeBegan)
    //     );
    //   let time = currentTime - this.timeBegan;
    //   let el = document.getElementById("bar");
    //   let width = (time / this.MAX_TIME) * 100 + "%";
    //   width = parseFloat(width).toFixed(2);
    //   if (width > 100) width = 100;

    //   //console.log("width" + width);
    //   let widthStr = width + "%";
    //   el.style.width = widthStr;
    // },
  }
}
</script>


<style>
#menu {
  width: 320px;
  height: 568px;
  background-image: url('../assets/menu.jpg');
  margin: auto;
  display: block;
}

#sound_mode {
  position: absolute;
  width: 60px;
  height: 60px;
  left: 10px;
  top: 355px;
  background-color: #41FFCF;
  border: none;
  border-radius: 12px;
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 26px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
}

.blue-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 320px;
  height: 568px;
  z-index: 1;
  background-image: url("../assets/alpha.jpg")
}

.progressBar {
  max-width: 280px;
  width: 90%;
  margin: 10px auto;
  margin-top: 512px;
  height: 7px;

  border-radius: 3px;
  background: linear-gradient(#503BD9, #503BD9);
}

.innerbar {
  max-width: 280px;
  height: 100%;
  text-align: right;
  height: 8px; /* same as #progressBar height if we want text middle aligned */
  width: 30%;
  border-radius: 3px;
  background: linear-gradient(#ffffff, #ffffff);
}
</style>