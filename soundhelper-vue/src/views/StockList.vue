<template>
  <div id="page">
    <div>
      <img src="../assets/top_bar.png" style="height:32px; width: 320px">
    </div>
    <div id="top">
      <!-- 상단 바 (뒤로가기, 실시간종목순위, 하트, 더보기) -->
      <button @click='goToMenu' style="width:32px; height: 33px; float:left; border: none;">&lt;</button>
      <router-view/>
      <span id="rank">실시간 종목순위</span>
      <span id="more">.&nbsp;.&nbsp;.<br>더보기</span>
      <i class="fa-regular fa-heart" id="heart-icon"></i>
    </div>
    <br>
    <div id="search-container">
      <!-- 검색창 -->
      <input id="search" type="text" placeholder="&nbsp&nbsp검색" v-model="searchTerm" @input="search">
    </div>
    <br>
    <div>
      <!-- 정렬 버튼  -->
      <ul class="nav nav-tabs justify-content-center">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" @click="sortByMarketCap">시가총액순</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" @click="sortByVolume">거래량순</a>
        </li>
      </ul>
    </div>
    <div style="height: 302px; overflow: scroll;">
      <!-- 주식 종목 목록 -->
      <div v-for="stock in stocks" :key="stock.id">
        <table>
            <tbody>
              <router-link :to="`/order/${stock.id}`" style="text-decoration: none ">
                <!-- <router-link :to="{name: 'Query', query: {name: '${stock.name}', price:'${stock.price}'}}"></router-link> -->
                <tr>
                    <td style="width:150px; text-align:left; padding: 10px; color: black">{{ stock.name }}</td>
                    <td style="width: 100px; text-align: right; color:black">{{ stock.price }}</td>
                    <td  v-if="stock.fluctuationRate < 0" style="width: 70px; text-align: right; padding: 10px; color: blue">{{ (-1) * Number(stock.fluctuationRate) }}%</td>
                    <td  v-if="stock.fluctuationRate > 0" style="width: 70px; text-align: right; padding: 10px; color: red">{{ stock.fluctuationRate }}%</td>
                </tr>
              </router-link>
            </tbody>
        </table>
        <hr>
      </div>
    </div>
    <div id="bar">
      <img src="../assets/bottom_bar.png">
    </div>
    <router-view></router-view>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        searchTerm: '',
        // stocks: [
        //   { id: 1, name: '삼성전자', price: 62000, fluctuationRate: -1.58, marketCap: 520000000000, volume: 1000000 },
        //   { id: 2, name: 'LG에너지솔루션', price: 516000, fluctuationRate: -3.19, marketCap: 80000000000, volume: 500000 },
        //   { id: 3, name: 'SK하이닉스', price: 92500, fluctuationRate: 0.54, marketCap: 60000000000, volume: 200000 },
        //   { id: 4, name: '삼성바이오로직스', price: 805000, fluctuationRate: 0.75, marketCap: 450000000000, volume: 300000 },
        //   { id: 5, name: '삼성SDI', price: 692000, fluctuationRate: -1.56, marketCap: 450000000000, volume: 300000 },
        //   { id: 6, name: 'LG화학', price: 667000, fluctuationRate: -3.19, marketCap: 450000000000, volume: 300000 },
        //   { id: 7, name: '삼성전자우', price: 55900, fluctuationRate: 0.18, marketCap: 450000000000, volume: 300000 },
        // ],
      sortOption: 'marketCap',
      sortAscending: false,
    };
  },
  computed: {
    sortedStocks() {
      // 선택된 정렬 옵션을 기반으로 정렬된 주식 종목 목록 반환
      let sorted = this.stocks.sort((a, b) => {
        if (this.sortAscending) {
          return a[this.sortOption] - b[this.sortOption];
        } else {
          return b[this.sortOption] - a[this.sortOption];
        }
      });
      return sorted.filter(stock => stock.name.includes(this.searchTerm));
    },
    stocks() {
      return this.$store.state.stocks;
    }
  },
  methods: {
    // toDetail() {
    //   this.$router.push({name: '/order/:name', params: {stocks: this.stocks}})
    // },
    goToMenu() {
      this.$router.push('/')
    },
    search() {



    },
    sortByMarketCap() {
      // 시가총액순으로 정렬
      this.sortOption = 'marketCap';
      this.sortAscending = !this.sortAscending;
    },
    sortByVolume() {
      // 거래량순으로 정렬
      this.sortOption = 'volume';
      this.sortAscending = !this.sortAscending;
    },
  },
};
</script>

<style>
body {

}
#page {
  width: 320px;
  height: 568px;

}

#top {
  position: fixed;
  width: 320px;
  height: 33px;
  background-color: lightgray;
}

#rank {
  line-height: 33px;
  float: left;
  margin-left: 10px;
}

#more {
  height: 33px;
  width: 33px;
  float: right;
  font-size: 10px;
  vertical-align: middle;
  margin-top: 3px;
}

#heart-icon {
  height: 33px;
  width: 25px;
  align-items: center;
  margin-top: 9px;
  float:right;
}

#search-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

#search {
  width: 280px;
  height: 80px;
  margin: 0 auto;
}

#bar {
  position: relative;
}

#bar img {
  position: absolute;
  width: 320px;
  height: 33px
}


</style>
