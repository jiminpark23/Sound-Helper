<template>
    <div class="page">
        <div>
            <img src="../assets/top_bar.png" style="height:32px; width: 320px">
        </div>
        <div id="top-bar" style="height: 33px; margin-bottom: 10px">
            <!-- 상단 바, 음표버튼 -->
            <button @click='goToStockList' style="width:32px; height: 33px; float:left; border: none;">&lt;</button>
            <router-view />
            <span id="name" style="width: 150px; height: 33px"></span>
            <i class="fa-solid fa-magnifying-glass" id="search-icon"></i>
            <i class="fa-solid fa-music" id="music-icon" @click="play"></i>
        </div>
        <div style="overflow: scroll; height: 460px">
            <div id="chart" >
                <!-- 차트 -->
                <highcharts :options="chartOptions" ref="highchart" id="chart-container" style="height: 300px"></highcharts>
                <!-- <div id="chart-container" style="height: 300px"> -->
                <!-- 현재가 -->
                <!-- <h2 class="current-price" v-if="stocks[$route.params.name-1].fluctuationRate < 0" style="color: blue">{{stocks[$route.params.name-1].price}}</h2>
                <h2 class="current-price" v-if="stocks[$route.params.name-1].fluctuationRate > 0" style="color: red">{{stocks[$route.params.name-1].price}}</h2> -->
                <!-- 일반모드 전환 -->
                <router-link :to="`/order/${$route.params.name}`">
                    <button id="chart-mode" class="on" style="color: white; border: none">차트</button>
                </router-link>
                <router-link :to="`/order/${$route.params.name}/live`">
                    <button id="live-mode">Live</button>
                </router-link>
            </div>
            <!-- <div id="count">
                <button id="minusone" :style="{ 'background-color': '#FB5A6B' }" @click="down">-</button>
                <input id="input-count" type="text" v-model="count" placeholder="0">
                <button id="plusone" :style="{ 'background-color': '#6F4BFD' }" @click="up">+</button>
            </div> -->
            <!-- <div class="trade">
                <button id="buy_button" @click="showBuyPopup" :style="{ 'background-color': '#FB5A6B' }">구매</button>
                <button id="sell_button" @click="showSellPopup" :style="{ 'background-color': '#6F4BFD' }">판매</button>
            </div> -->
            <div class="popup-overlay" v-if="isPopupOpen">
                <div class="popup">
                    <div>
                        <button @click="onConfirm" class="popup-button" :style="{ 'background-color': '#FB5A6B' }">예</button>
                        <button @click="onCancel" class="popup-button"
                            :style="{ 'background-color': '#6F4BFD' }">아니오</button>
                    </div>
                </div>
            </div>
            <!-- <div style="height: 155px"></div> -->
            <div class="btns">
                <!-- 예수금, 수익률 버튼 -->
                <button id="voice" @click='voice' aria-label="음성인식 버튼입니다. 신한지주 2023년 3월 이렇게 말씀해주세요">음성인식</button>
                <button id="reset" @click="reset" aria-label="음성인식 버튼입니다. 신한지주 2023년 3월 이렇게 말씀해주세요">리셋</button>
                <!-- <button id="erate">수익률</button> -->
            </div>
            <!-- <div style="height: 135px"></div> -->
        </div>
        <div style="position: fixed">
            <img src="..\assets\bottom_bar.png" id="bottom-bar">
        </div>
    </div>
</template>

<script>
// import Highcharts, { chart } from 'highcharts'
// import sonificationInit from 'highcharts/modules/sonification'
// import { Chart } from 'highcharts-vue' 
    
// sonificationInit(Highcharts)
// let currentTime = new Date().toTimeString().split(' ')[0];
// const categories = [currentTime];

// export default {
    
//     components: {
//         highcharts: Chart,
//     },
//     data() {
//         return {
//             isPopupOpen: false,
//             data: [{ data: [], categories: [new Date().toTimeString().split(" ")[0]] }],
//             state: null,
//             chartOptions: {
//                 series: [{
//                     showInLegend: false,
//                     data: [1,2,3],
//                     point: {
//                         events: {
//                             click: function () {
//                                 this.sonify({
//                                     instruments: [{
//                                         instrument: "triangleMajor",
//                                         instrumentMapping: {
//                                             volume: function (point) {
//                                                 return point.color === "red" ? 0.2 : 0.8;
//                                             },
//                                             duration: 200,
//                                             pan: "x",
//                                             frequency: "y",
//                                         },
//                                         instrumentOptions: {
//                                             minFrequency: 520,
//                                             maxFrequency: 1050,
//                                         }
//                                     }
//                                     ]
//                                 });
//                             }
//                         }
//                     }
//                 }],
//                 xAxis: {
                   
//                     categories: [new Date().toTimeString().split(" ")[0]],
//                     labels: {
//                         style: {
//                             fontSize: "5px",
//                         },
//                     },
//                     title: {
//                         text: "Date/time",
//                         align: "high",
//                     },
//                 },
//                 yAxis: {
//                     title: {
//                         text: "price",
//                         align: "high",
//                     },
//                     labels: {
//                         style: {
//                             fontSize: "10px",
//                         },
//                     },
//                 },
//                 title: {
//                     text: "실시간 차트",
//                     style: "10px",
//                 },
//                 accessibility: {
//                         enabled: false
//                 },
//             }
//         };
//     },
//     mounted() {
//         this.isloaded = true;
//     },
import Highcharts from 'highcharts'
import sonificationInit from 'highcharts/modules/sonification'
import { Chart } from 'highcharts-vue' 

sonificationInit(Highcharts)
var data = [];
var recognition = new webkitSpeechRecognition(); // Chrome에서 사용하는 객체입니다.
export default {
    name: 'Query',
    components: {
        highcharts: Chart,
    },
    data() {
        return {
            isPopupOpen: false,
            state: null,
            chartOptions: {
                series: [{
                    
                    showInLegend: false,
                    data: data.map(function(item){return item[1];}),
                    categories: data.map(function(item){return item[0];}),
                    point: {
                        events: {
                            click: function () {
                                this.sonify({
                                    instruments: [{
                                        instrument: "triangleMajor",
                                        instrumentMapping: {
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
                    categories: data.map(function(item){return item[0];}),
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
                    text: "차트분석",
                    style: "10px",
                },
                accessibility: {
                    enabled: true
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
        reset(){
            window.location.reload()
        },
    //     // clickbtn(){
    //     //     let chartBtn = document.getElementById("chart-mode")
    //     //     if(chartBtn.classList.contains("on")){
    //     //         chartBtn.classList.remove('on')
    //     //     }else {
    //     //         chartBtn.classList.add('on')
    //     //     }
    //     // },
    //     drawChart(data, name = "") {
    //         Highcharts.chart("container", {
    //             chart: {
    //                 width: 230 + 'px',
    //                 height: 200 + 'px',
    //             },
    //             title: {
    //                 text: "실시간 차트",
    //                 style: "10px",
    //             },
    //             accessibility: {
    //                 announceNewData: {
    //                     enabled: true,
    //                 },
    //             },
    //             xAxis: {
                    
    //                 categories: data.categories,
    //                 labels: {
    //                     style: {
    //                         fontSize: "5px",
    //                     },
    //                 },
    //                 title: {
    //                     text: "Date/time",
    //                     align: "high",
    //                 },
    //             },
    //             yAxis: {
    //                 title: {
    //                     text: "price",
    //                     align: "high",
    //                 },
    //                 labels: {
    //                     style: {
    //                         fontSize: "10px",
    //                     },
    //                 },
    //             },
    //             series: [{
    //                 showInLegend: false,
    //                 data: data.data.map(function (item) {   
    //                     return item[1];
    //                 }),
    //                 point: {
    //                     events: {
    //                         click: function () {
    //                             this.sonify({
    //                                 instruments: [{
    //                                     instrument: "triangleMajor",
    //                                     instrumentMapping: {
    //                                         volume: function (point) {
    //                                             return point.color === "red" ? 0.2 : 0.8;
    //                                         },
    //                                         duration: 200,
    //                                         pan: "x",
    //                                         frequency: "y",
    //                                     },
    //                                     instrumentOptions: {
    //                                         minFrequency: 520,
    //                                         maxFrequency: 1050,
    //                                     }
    //                                 }
    //                                 ]
    //                             });
    //                         }
    //                     }
    //                 }
    //             }]
    //         });
    //     },
    //     liveplay() {
    //         const chart = Highcharts.charts[0];
    //         const series = chart.series[0];
    //         const points = series.points;
    //         console.log(chart)
    //         let i = 0;
    //         const interval = setInterval(() => {
    //             if (i == 1) {
    //                 clearInterval(interval);
    //                 return;
    //             }
    //             const point = points[points.length - i - 1];
    //             point.sonify({
    //                 instruments: [{
    //                     instrument: "triangleMajor",
    //                     instrumentMapping: {
    //                         volume: function (point) {
    //                             return point.color === 'red' ? 0.2 : 0.8;
    //                         },
    //                         duration: 200,
    //                         pan: "x",
    //                         frequency: "y",
    //                     },
    //                     // Start at C5 note, end at C6
    //                     instrumentOptions: {
    //                         minFrequency: 520,
    //                         maxFrequency: 1050,
    //                     }
    //                 }]
    //             })
    //             i++
    //         }, 500)
    //     },
    //     main(data) {
    //         const temp = document.getElementById('container')
    //         const chart = Highcharts.charts[temp.getAttribute('data-highcharts-chart')]
    //         let currentTime = new Date().toTimeString().split(' ')[0];
    //         let randomprice = Math.round(Math.random() * 10);
    //         console.log(chart.series[0].data)
    //         chart.series[0].addPoint(randomprice)
    //         data.categories.push(currentTime)
    //         chart.series[0].data[chart.series[0].data.length - 1].category = currentTime
    //         liveplay()
    //     },
    // },
    voice() {
            function searchstock(name){
                var data2 = []
                var categories2 = []
                const xhr = new XMLHttpRequest();
                const voice_result = name.split(' ')
                document.getElementById('name').innerText = voice_result[0]
                var api_url = ''

                if (voice_result.length === 3) {
                    api_url = api_url + "https://soundhelper.duckdns.org/stocks/" + voice_result[0] + '/' + voice_result[1].split('년')[0] + '-' + voice_result[2].split('월')[0] + '/';
                }
                else if (voice_result.length === 2) {
                    console.log(voice_result[1].split('월')[0])
                    api_url = api_url + "https://soundhelper.duckdns.org/stocks/" + voice_result[0] + '/' + '2023-' + '2' + '/';
                    console.log(api_url)
                }
                else {
                    api_url = api_url + "https://soundhelper.duckdns.org/stocks/" + voice_result[0] + '/';
                }

                xhr.open('GET', api_url, false);
                xhr.send(null);

                if (xhr.status === 200) {
                    const db = JSON.parse(xhr.responseText);
                    // JSON 데이터를 이용한 코드
                    for (let i in db.reverse()) {
                        // 30개의 데이터만 가져오기
                        if (i < 30) {
                            data2.push(Number(db[i].close))
                            categories2.push(db[i].date)
                        }
                        else {
                            break;
                        }
                    }
                }
            data2 = data2.reverse()
            categories2 = categories2.reverse()
            console.log(document.Highcharts)
            const chart = Highcharts.charts[0];
            // chart.series[0].data = []
            // chart.series[0].points = []
            // chart.series[0].yData = []
            // chart.series[0].xData = []

            console.log(chart.series[0])
            for (let i = 0; i < data2.length; i++)
            {
                chart.series[0].addPoint([categories2[i],data2[i]])
            }
            chart.series[0].xAxis.setCategories(categories2)
            // Highcharts.charts[0].addSeries([1,'2'])
            // chart.series[0].data = data
            // chart.series[0].categories = categories
            }
                recognition.start(); // 음성 인식 시작
                recognition.onresult = function (event) {
                    var result = event.results[0][0].transcript; // 음성 인식 결과를 가져옵니다.
                    recognition.stop();
                    searchstock(result);
                };
            
        },
        play() {
            const chart = Highcharts.charts[0];
            console.log(chart)
            const series = chart.series[0];
            console.log(series)
            const points = series.points;
            console.log(points)
            let i = 0;
            const interval = setInterval(() => {
                if (i >= points.length) {
                    clearInterval(interval);
                    return;
                }

                const point = points[i];
                point.sonify({
                    instruments: [{
                        instrument: 'triangleMajor',
                        instrumentMapping: {
                            //   volume: function (point) {
                            //     return point.color === 'red' ? 0.2 : 0.8;
                            //   },
                            duration: 200,
                            pan: 'x',
                            frequency: 'y'
                        },
                        // Start at C5 note, end at C6
                        instrumentOptions: {
                            minFrequency: 520,
                            maxFrequency: 1050
                        }
                    }]
                });

                i++;
            }, 500);
        }
    },
    computed: {
        stocks() {
            return this.$store.state.stocks;
        }
    },
    created() { 

    },
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

.current-price {
    width: 40px;
    height: 20px;
    position: absolute;
    top: 7px;
    left: 7px;
    font-weight: bold;
    font-size: 30px;
}

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
    /* display: flex; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: none;
}

#voice {
    border: none;
    margin-left: 15px;
    margin-right: 5px;
    border-radius: 15px;
    width: 130px;
    height: 80px;
    font-size: 20px;
}
#reset {
    border: none;
    margin-top: 40px;
    margin-right: 5px;
    margin-left: 10px;
    border-radius: 15px;
    width: 130px;
    height: 80px;
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
.product {
    width: 320px;
    height: 568px;
    padding: 16px;
    box-sizing: border-box;
    border: 1px solid black;
}
.on {
    color: white;
    background-color: blue;
}

</style>