<template>
    <div class="poll">
        <div class="result">
            <div class="left">
                <a-tag :color="colors[status]">{{$t('poll.'+status)}}</a-tag>
                <h2>{{title}}</h2>
                <p class="mate">
                    <span>{{$t('poll.creater')}}: {{proposer}}</span>
                    <span>{{$t('poll.expiry')}}: {{start}} ~ {{end}}</span>
                    <span>{{$t('poll.address')}}: {{address}}</span>
                </p>
                <p class="desc">{{description}}</p>
                <a-button v-if="status==='VOTING'" type="danger" block>{{$t('poll.stopButton')}}</a-button>
            </div>
            <div class="center">
                <div class="item">
                    <p class="label">
                        {{$t('poll.doneLabel')}}
                        <span>{{done}} / {{total}}</span>
                    </p>
                    <a-progress class="done" :percent="done/total*100" :show-info="false" />
                    <p class="label">{{$t('poll.chartLabel')}}</p>
                    <hr/>
                    <div id="poll-chart"></div>
                </div>
                <div class="item">
                    <p class="label">{{$t('poll.candidates')}}</p>
                    <hr/>
                    <div class="cand" v-for="cand in candidates" :key="cand.name">
                        <p class="title">
                            {{cand.name}}
                            <span>{{cand.ballot}}</span>
                        </p>
                        <a-progress :percent="cand.ballot/done*100" :show-info="false" />
                        <p class="desc">{{cand.description}}</p>
                    </div>
                </div>
                <div class="item">
                    <p class="label">{{$t('poll.voters')}}</p>
                    <hr/>
                    <div class="voter" v-for="voter in voters" :key="voter.contact">
                        {{voter.contact}}
                        <a-tag :color="types[voter.type]">{{$t('poll.'+voter.type)}}</a-tag>
                        <span v-if="voter.sendLink" class="right">{{$t('poll.sended')}}</span>
                        <a-button v-else class="right" size="small">{{$t('poll.sendButton')}}</a-button>
                    </div>
                </div>
            </div>
            <div class="right"></div>
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
    name: 'poll',
    setup(props) {
        const { ctx } = getCurrentInstance()
        const data = reactive({
            colors: {
                'ERROR': 'red',
                'VOTING': 'blue',
                'DONE': 'orange',
            },
            types: {
                'EMAIL': 'blue',
                'MOBILE': 'orange',
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
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveveafvearfvrefffffffffffffffffffffffffffffffffffff ffffffferfvfvryugfver8ykgfverbv8fyegbvg8eygfve8rygkf',
                ballot: 32
            }, {
                key: '0xsbvfvbfbfivfv',
                name: ' 让任何人人人人热',
                description: 'eferfuherferfhre8f refgrefgre sdbvudfsf而非 绿儿Greg二个人通过二个人通过他忍 痛割肉 oygveryu gfver8ykgfverbv 8fyegbvg8eygfve8rygkf',
                ballot: 76
            }, {
                key: '0xssdibdfbvfvbfivfv',
                name: ' 忍痛割肉让他让他哈如 ',
                description: 'eferfuherferfhre8frefgr efgresdbvudf oygveryugfver8ykgfverbv8fyegbvg8eygfv e8rygkf',
                ballot: 3
            }, {
                key: '0xssdibbvfvbfivbfivfv',
                name: '人工和 人工如何',
                description: 'eferfuherferfhre8fre fgrefgresdbv udfoygveryugfver8ykgfve rbv8fyegbvg 8eygfve8rygkf',
                ballot: 82
            }, {
                key: '0xssdibdfbvfvivbfivfv',
                name: '让他会突然给人',
                description: 'eferfuher ferfhre8frefgr efgre大哥v如果如 果egre gious二拐 呃呃各个额二拐二拐 俄格给 额额二拐 sdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf',
                ballot: 193
            }, {
                key: '0xsibdfbvfvbfivbfivfv',
                name: '的沟通认同感和给让他',
                description: 'eferfuhe rferf hre8frefgre fgresdbvudf oygveryug fver8ykgfverb v8fyegbvg8eygfve8rygkf',
                ballot: 102
            },{
                key: '0xssdibdfbvfvbfivbfivffhtv',
                name: ' 俄格更让人韩国日本和人人',
                description: 'eferfuherf erfhre8f refgrefgresd 而割让给让他干欸问个二通过二拐 额二哥哥额额二哥哥 通过通过通过二哥哥 哥额额额沟通过 bvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf',
                ballot: 81
            },{
                key: '0xsbdfbvfvbfivbfivfv',
                name: '好帖让个额沟通给人不会让她更好',
                description: 'eferfuherf erfhre8frefgre fgresdbvudfoygveryugfver8yk gfve rbv8fyegbvg8ey gfve8rygkf',
                ballot: 73
            },{
                key: '0xssdibdfbvfvbfirgrgvbfivfv',
                name: '如果让他俄国人他给',
                description: 'eferf uherferfhre8fr efgrefgresdb风热风热  个人额二拐个各个而  vudfoygveryugfve 8ykgfverbv8fyegbvg8 eygfve8rygkf',
                ballot: 10
            }],
            voters: [{
                    contact: 'user@mail.com',
                    type: 'EMAIL',
                    sendLink: true,
                }, {
                    contact: '86+13258317902',
                    type: 'MOBILE',
                    sendLink: true,
                }, {
                    contact: 'test@mail.com',
                    type: 'EMAIL',
                    sendLink: true,
                }, {
                    contact: '21+13258317909',
                    type: 'MOBILE',
                    sendLink: false,
                }
            ],
        })
        onMounted(() => {
            var chartDom = document.getElementById('poll-chart');
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
                    name: ctx.$i18n.tc('poll.chartTitle'),
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
.poll {
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
    }
    .result>.center .item {
        margin: 0 0 2em 0;
        padding: 1em;
        background-color: white;
        border-radius: 0.2em;
        box-shadow: 0 0 5px var(--back-color);
    }
    #poll-chart {
        width: 600px;
        height: 750px;
    }
}
@media screen and (max-width: 999px) {
    .result {
        margin: 3em auto;
        max-width: 700px;
        padding: 1em;
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
    .center .item {
        margin: 0 0 2em 0;
    }
}
@media screen and (max-width: 425px) {
    .result {
        margin: 0 auto;
        border-radius: 0;
        box-shadow: 0 0 0 var(--back-color);
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
.cand {
    margin: 0.5em 0 0 0;
    padding: 0.5em;
}
.cand:hover {
    background-color: var(--tiny-back-color);
    border-radius: 0.2em;
    box-shadow: 0 2px 5px var(--theme-color);
}
.cand .title {
    margin: 0 0 0.2em 0;
    /* font-size: 1.2em; */
    font-weight: 500;
}
.cand .title span {
    float: right;
    font-size: 1.2em;
    font-weight: normal;
}
.cand .desc {
    color: var(--assist-color);
    white-space: pre-wrap;
    overflow: hidden;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
}
.voter {
    margin: 0.5em 0 0 0;
    padding: 0.5em;
}
.voter:hover {
    background-color: var(--tiny-back-color);
    border-radius: 0.2em;
    box-shadow: 0 2px 5px var(--theme-color);
}
.voter .ant-tag {
    /* float: right; */
    margin: 0 0 0 1em;
}
.voter .right {
    float: right;
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