<template>
    <div class="tally">
        <div class="result">
            <div class="left">
                <a-tag :color="colors[status]">{{$t('tally.'+status)}}</a-tag>
                <h2>{{title}}</h2>
                <p class="mate">
                    <span>{{$t('tally.creater')}}: {{proposer}}</span>
                    <span>{{$t('tally.expiry')}}: {{start}} ~ {{end}}</span>
                    <span>{{$t('tally.address')}}: {{address}}</span>
                </p>
                <p class="desc">{{description}}</p>
            </div>
            <div class="center">
                <p class="label">
                    {{$t('tally.doneLabel')}}
                    <span>{{done}} / {{total}}</span>
                </p>
                <a-progress class="done" :percent="done/total*100" :show-info="false" />
                <p class="label">{{$t('tally.chartLabel')}}</p>
                <hr/>
                <div id="tally-chart"></div>
            </div>
            <div class="right">
                <p class="label">{{$t('tally.candidates')}}</p>
                <hr/>
                <div class="cand" v-for="cand in candidates" :key="cand.key">
                    <p class="title">{{cand.name}}</p>
                    <div class="precent">
                        <a-progress :percent="cand.ballot/done*100" :show-info="false" />
                        <span>{{cand.ballot}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="check"></div>
    </div>
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted } from 'vue'
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

export default {
    name: 'Tally',
    setup(props) {
        const { ctx } = getCurrentInstance()
        const data = reactive({
            colors: {
                'ERROR': 'red',
                'VOTING': 'blue',
                'DONE': 'orange',
            },
            title: '这是一个投票',
            proposer: '易投官方',
            start: '2021-4-2',
            end: '2021-8-1',
            done: 652,
            total: 1232,
            address: '0x876345436654203746328463434',
            status: 'VOTING',
            description: 'e9ruhfer9gfrefriegfyoiergfoigfoisgfrsfgrferiofhuerfrufhripeufyyrepferfjnreifghrfgrpfgerifrefreferfergrgerfe',
            candidates: [{
                key: '0xssdibdfbvfvbvbfivfv',
                name: ' 俄国和认同人人肉体和他',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf',
                ballot: 32
            }, {
                key: '0xsbvfvbfbfivfv',
                name: ' 让任何人人人人热',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf',
                ballot: 76
            }, {
                key: '0xssdibdfbvfvbfivfv',
                name: ' 忍痛割肉让他让他哈如 ',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf',
                ballot: 3
            }, {
                key: '0xssdibbvfvbfivbfivfv',
                name: '人工和 人工如何',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf',
                ballot: 82
            }, {
                key: '0xssdibdfbvfvivbfivfv',
                name: '让他会突然给人',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf',
                ballot: 193
            }, {
                key: '0xsibdfbvfvbfivbfivfv',
                name: '的沟通认同感和给让他',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf',
                ballot: 102
            },{
                key: '0xssdibdfbvfvbfivbfivffhtv',
                name: ' 俄格更让人韩国日本和人人',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf',
                ballot: 81
            },{
                key: '0xsbdfbvfvbfivbfivfv',
                name: '好帖让个额沟通给人不会让她更好',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf',
                ballot: 73
            },{
                key: '0xssdibdfbvfvbfirgrgvbfivfv',
                name: '如果让他俄国人他给',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf',
                ballot: 10
            }]
        })
        onMounted(() => {
            var chartDom = document.getElementById('tally-chart');
            const chartData = data.candidates.map(cand => {return {value: cand.ballot, name: cand.name}})
            let option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    bottom: '5%',
                    left: 'center',
                    show: true,
                },
                series: [{
                    name: ctx.$i18n.tc('tally.chartTitle'),
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: chartData
                }]
            }
            function resizeChart() {
                if (window.innerWidth >= 700) {
                    chartDom.style.width = '600px'
                    chartDom.style.height = '700px'
                } else {
                    option.legend.show = false
                    const width = chartDom.parentNode.clientWidth + 'px'
                    console.log(width)
                    chartDom.style.width = width
                    chartDom.style.height = width
                }
                var myChart = echarts.init(chartDom);
                myChart.setOption(option)
            }
            window.onresize = resizeChart
            resizeChart()
        })
        return {
            ...toRefs(data),
        }
    }
}
</script>

<style scoped>
.tally {
    /* text-align: center; */
}
@media screen and (min-width: 1000px) {
    .result {
        margin: 3em auto;
        display: grid;
        grid-template-columns: 1fr 600px 1fr;
        align-items: start;
        gap: 2em;
    }
    .result>.left {
        max-width: 325px;
        min-width: 200px;
        justify-self: end;
        padding: 1em;
        background-color: white;
        border-radius: 0.2em;
        box-shadow: 0 0 5px var(--back-color);
    }
    .result>.center {
        justify-self: center;
        padding: 1em;
        background-color: white;
        border-radius: 0.2em;
        box-shadow: 0 0 5px var(--back-color);
    }
    .result>.right {
        justify-self: start;
        padding: 1em;
        background-color: white;
        border-radius: 0.2em;
        box-shadow: 0 0 5px var(--back-color);
    }
    #tally-chart {
        width: 600px;
        height: 750px;
    }
}
@media screen and (max-width: 999px) {
    .result {
        margin: 3em auto;
        max-width: 700px;
        padding: 1.5em;
        background-color: white;
        border-radius: 0.2em;
        box-shadow: 0 0 5px var(--back-color);
    }
    .left {
        margin-bottom: 3em;
    }
    .center {
        margin-bottom: 3em;
    }
}
@media screen and (max-width: 400px) {
    .result {
        margin: 0 auto;
    }
}
.left .ant-tag {
    float: right;
    margin: 0;
}
.left .mate {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.left .mate span {
    margin: 0 1.5em 0 0;
    color: var(--assist-color)
}
.left .desc {
    word-wrap: break-word;
}
.right .cand {
    margin: 1em 0 0 0;
}
.right .cand .title {
    margin: 0;
    color: var(--words-color);
    overflow: hidden;
    text-overflow: ellipsis;
}
.right .cand .precent {
    display: grid;
    grid-template-columns: 1fr 2em;
}
.right .cand .precent span {
    margin: 0 0 0 0.5em;
}
.label {
    font-size: 1.2em;
    font-weight: 500;
    margin: 0 0 0.5em 0;
}
.label span {
    float: right;
    font-weight: normal;
    color: var(--words-color);
}
.ant-progress.done {
    margin: 0 0 3em 0;
}
</style>