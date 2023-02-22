<template>
    <div class="page">
        <div>
            <img src="../assets/top_bar.png" style="height:32px; width: 320px">
        </div>
        <div id="top-bar" style="height: 33px; margin-bottom: 10px;">
            <!-- 상단 바, 음표버튼 -->
            <button @click='goToStockList' style="width:32px; height: 33px; float:left; border: none;" aria-label="주식목록페이지로 돌아가는 버튼입니다.">&lt;</button>
            <router-view />
            <span id="name" style="width: 150px; height: 33px">{{ stocks[$route.params.name-1].name}}</span>
            <i class="fa-solid fa-magnifying-glass" id="search-icon"></i>
            <i class="fa-solid fa-music" id="music-icon" @click="play"></i>
        </div>
        <div style="overflow: scroll; height: 460px">
            <div id="chart" >
                <!-- 차트 -->
                <highcharts :options="chartOptions" ref="highchart" id="chart-container" style="height: 300px"></highcharts>
                <!-- <div id="chart-container" style="height: 300px"> -->
                <!-- 현재가 -->
                <h2 class="current-price" v-if="stocks[$route.params.name-1].fluctuationRate < 0" style="color: blue">{{stocks[$route.params.name-1].price}}</h2>
                <h2 class="current-price" v-if="stocks[$route.params.name-1].fluctuationRate > 0" style="color: red">{{stocks[$route.params.name-1].price}}</h2>
                <!-- 일반모드 전환 -->
                <router-link :to="`/order/${stocks[$route.params.name-1].id }/chart`" style="text-decoration: none ">
                    <button id="chart-mode" aria-label="차트분석을 하는 페이지로 이동하는 버튼입니다.">차트</button>
                </router-link>
                <router-link to="/">
                    <button id="live-mode" @click='goToMenu'>Live</button>
                </router-link>
            </div>
            <div id="count">
                <!-- 플러스마이너스 버튼, 현재 수 -->
                <button id="minusone" :style="{ 'background-color': '#FB5A6B' }" @click="down">-</button>
                <input id="input-count" type="text" v-model="count" placeholder="0">
                <button id="plusone" :style="{ 'background-color': '#6F4BFD' }" @click="up">+</button>
            </div>
            <div class="trade">
                <!-- 구매 판매 버튼 -->
                <button id="buy_button" @click="showBuyPopup" :style="{ 'background-color': '#FB5A6B' }">구매</button>
                <button id="sell_button" @click="showSellPopup" :style="{ 'background-color': '#6F4BFD' }">판매</button>
            </div>
            <div class="popup-overlay" v-if="isPopupOpen">
                <div class="popup">
                    <div>
                        <button @click="onConfirm" class="popup-button" :style="{ 'background-color': '#FB5A6B' }">예</button>
                        <button @click="onCancel" class="popup-button"
                            :style="{ 'background-color': '#6F4BFD' }">아니오</button>
                    </div>
                </div>
            </div>
            <div style="height: 155px"></div>
            <div class="btns">
                <!-- 예수금, 수익률 버튼 -->
                <button id="deposit">예수금</button>
                <button id="erate">수익률</button>
            </div>
            <div style="height: 135px"></div>
        </div>
        <div style="position: fixed">
            <img src="..\assets\bottom_bar.png" id="bottom-bar">
        </div>
    </div>
</template>

<script>
import Highcharts from 'highcharts'
import sonificationInit from 'highcharts/modules/sonification'
import { Chart } from 'highcharts-vue' 
    
sonificationInit(Highcharts)
let currentTime = new Date().toTimeString().split(' ')[0];
const categories = [currentTime];

export default {
    name: 'Query',
    components: {
        highcharts: Chart,
    },
    data() {
        return {
            isPopupOpen: false,
            data: [{ data: [], categories: [new Date().toTimeString().split(" ")[0]] }],
            state: null,
            chartOptions: {
                series: [{
                    showInLegend: false,
                    data: [1,2,3],
                    point: {
                        events: {
                            click: function () {
                                this.sonify({
                                    instruments: [{
                                        instrument: "triangleMajor",
                                        instrumentMapping: {
                                            volume: function (point) {
                                                return point.color === "red" ? 0.2 : 0.8;
                                            },
                                            duration: 200,
                                            pan: "x",
                                            frequency: "y",
                                        },
                                        instrumentOptions: {
                                            minFrequency: 520,
                                            maxFrequency: 1050,
                                        }
                                    }
                                    ]
                                });
                            }
                        }
                    }
                }],
                xAxis: {
                   
                    categories: [new Date().toTimeString().split(" ")[0]],
                    labels: {
                        style: {
                            fontSize: "5px",
                        },
                    },
                    title: {
                        text: "Date/time",
                        align: "high",
                    },
                },
                yAxis: {
                    title: {
                        text: "price",
                        align: "high",
                    },
                    labels: {
                        style: {
                            fontSize: "10px",
                        },
                    },
                },
                title: {
                    text: "실시간 차트",
                    style: "10px",
                },
                accessibility: {
                        enabled: false
                },
            }
        };
    },
    mounted() {
        this.isloaded = true;
    },
    methods: {
        goToStockList() {
            this.$router.go(-1);
        },
        up() {
            let count = Number(document.getElementById("input-count").value)
            let plusone = document.getElementById("plusone");
            let up = document.querySelector("#plusone")
            count = count + 1
            document.getElementById("input-count").value = count
            plusone.setAttribute("aria-labelledby", "input-count")
            up.classList.remove("aria-labelledby");
        },
        down() {
            let count = Number(document.getElementById("input-count").value)
            let minusone = document.getElementById("minusone");
            let down = document.querySelector("#minusone")
            if (count > 0) {
                count = count - 1
                document.getElementById("input-count").value = count
                minusone.setAttribute("aria-labelledby", "input-count")
                down.classList.remove("aria-labelledby");
            }
        },
        showBuyPopup() {
            this.isPopupOpen = true;
        },
        showSellPopup() {
            this.isPopupOpen = true;
        },
        onConfirm() {
            // 구매 확인 로직
            this.isPopupOpen = false;
        },
        onCancel() {
            this.isPopupOpen = false;
        },

        drawChart(data, name = "") {
            Highcharts.chart("container", {
                chart: {
                    width: 230 + 'px',
                    height: 200 + 'px',
                },
                title: {
                    text: "실시간 차트",
                    style: "10px",
                },
                accessibility: {
                    announceNewData: {
                        enabled: true,
                    },
                },
                xAxis: {
                    
                    categories: data.categories,
                    labels: {
                        style: {
                            fontSize: "5px",
                        },
                    },
                    title: {
                        text: "Date/time",
                        align: "high",
                    },
                },
                yAxis: {
                    title: {
                        text: "price",
                        align: "high",
                    },
                    labels: {
                        style: {
                            fontSize: "10px",
                        },
                    },
                },
                series: [{
                    showInLegend: false,
                    data: data.data.map(function (item) {   
                        return item[1];
                    }),
                    point: {
                        events: {
                            click: function () {
                                this.sonify({
                                    instruments: [{
                                        instrument: "triangleMajor",
                                        instrumentMapping: {
                                            volume: function (point) {
                                                return point.color === "red" ? 0.2 : 0.8;
                                            },
                                            duration: 200,
                                            pan: "x",
                                            frequency: "y",
                                        },
                                        instrumentOptions: {
                                            minFrequency: 520,
                                            maxFrequency: 1050,
                                        }
                                    }
                                    ]
                                });
                            }
                        }
                    }
                }]
            });
        },
        liveplay() {
            const chart = Highcharts.charts[0];
            const series = chart.series[0];
            const points = series.points;
            console.log(chart)
            let i = 0;
            const interval = setInterval(() => {
                if (i == 1) {
                    clearInterval(interval);
                    return;
                }
                const point = points[points.length - i - 1];
                point.sonify({
                    instruments: [{
                        instrument: "triangleMajor",
                        instrumentMapping: {
                            volume: function (point) {
                                return point.color === 'red' ? 0.2 : 0.8;
                            },
                            duration: 200,
                            pan: "x",
                            frequency: "y",
                        },
                        // Start at C5 note, end at C6
                        instrumentOptions: {
                            minFrequency: 520,
                            maxFrequency: 1050,
                        }
                    }]
                })
                i++
            }, 500)
        },
        main(data) {
            const temp = document.getElementById('container')
            const chart = Highcharts.charts[temp.getAttribute('data-highcharts-chart')]
            let currentTime = new Date().toTimeString().split(' ')[0];
            let randomprice = Math.round(Math.random() * 10);
            console.log(chart.series[0].data)
            chart.series[0].addPoint(randomprice)
            data.categories.push(currentTime)
            chart.series[0].data[chart.series[0].data.length - 1].category = currentTime
            liveplay()
        },
    },
    computed: {
        stocks() {
            return this.$store.state.stocks;
        }
    },
    created() { },
}
</script>

<style scoped>
.page {
    width: 320px;
    height: 568px;
}

#chart {
    position: relative;
    border: 0.5px solid lightgray
}
/*
#chart-container2 {
    width: 300px;
    height: 230px;
    top: 30px;
    left: 10px;
}
*/

.current-price {
    width: 40px;
    height: 20px;
    position: absolute;
    top: 7px;
    left: 7px;
    font-weight: bold;
    font-size: 30px;
}

/* #voice {
    justify-content: space-between;
  width: 130px;
  height: 45px;
  border: 1px solid;
  border-radius: 25px;
  padding: 10px;
  margin: 5px 10px 5px 10px;
  background-color: rgb(241, 241, 241);
} */

#chart-mode {
    width: 48px;
    height: 48px;
    top: 7px;
    right: 7px;
    position: absolute;
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #000000;
    border-radius: 12px;
    border: 0.5px solid lightgray
}
#live-mode {
    width: 48px;
    height: 48px;
    top: 60px;
    right: 7px;
    position: absolute;
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #000000;
    border-radius: 12px;
    border: 0.5px solid lightgray
}

#name {
    line-height: 33px;
    float: left;
    margin-left: 10px;
    border: 1px solid;
    padding-left: 5px;
}

#search-icon {
    width: 25px;
    height: 33px;
    align-items: center;
    margin-top: 10px;
    margin-left: 10px;
}

#music-icon {
    margin-left: 60px;
}

#count {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-top: 5px;
}

.trade {
    display: flex;
    justify-content: center;
    border: none;
}

.btns {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: none;
}

#deposit {
    border: none;
    margin-bottom: 10px;
    border-radius: 15px;
    width: 181px;
    height: 80px;
    font-size: 20px;
}

#erate {
    border: none;
    margin-top: 10px;
    border-radius: 15px;
    width: 181px;
    height: 80px;
    font-size: 20px;
}

/* #button {
  justify-content: space-between;
  width: 130px;
  height: 45px;
  border: 1px solid;
  border-radius: 25px;
  padding: 10px;
  margin: 5px 10px 5px 10px;
  background-color: rgb(241, 241, 241);
} */

#voice {
    border: none;
    border-radius: 15px;
    width: 120px;
    height: 40px;
    margin: 10px 100px 10px 100px;
    font-size: 20px;
}

#bottom-bar {
    height: 33px;
    width: 320px
}

#bar img {
    position: absolute;
    width: 320px;
}

#buy_button {
    border: none;
    width: 120px;
    height: 50px;
    margin-right: 5px;
    border-radius: 15px;
    font-size: 20px;
    color: white;
}

#sell_button {
    border: none;
    width: 120px;
    height: 50px;
    margin-left: 5px;
    border-radius: 15px;
    font-size: 20px;
    color: white;
}

#minusone {
    border-radius: 15px 0 0 15px;
    width: 60px;
    height: 50px;
    border: none;
    font-size: 20px;
    color: white;
}

.product {
    width: 320px;
    height: 568px;
    padding: 16px;
    box-sizing: border-box;
    border: 1px solid black;
}

#plusone {
    border-radius: 0 15px 15px 0;
    width: 60px;
    height: 50px;
    border: none;
    font-size: 20px;
    color: white;
}

#input-count {
    width: 80px;
    height: 50px;
    border: 0.5px solid lightgray;
    font-size: 20px;
    text-align: center;
    color: black;
}

.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 320px;
    height: 568px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup {
    width: 300px;
    height: 450px;
    top: 40px;
    left: 10px;
    background-color: white;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
}

.popup-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 181px;
    height: 97px;
    margin: 20px 0px 20px 0px;
    border-radius: 25px;
    justify-content: center;
    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 1000;
    font-size: 25px;
    border: none;
    color: white
}</style>