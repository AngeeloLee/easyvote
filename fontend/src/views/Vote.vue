<template>
    <div class="vote">
        <!-- 投票 -->
        <div v-if="showPoll" class="contract">
            <div class="left header">
                <a-tag v-if="open" color="blue">{{$t('vote.public')}}</a-tag>
                <a-tag v-else color="orange">{{$t('vote.private')}}</a-tag>
                <h2>{{title}}</h2>
                <p class="mate">
                    <span>{{$t('vote.proposer')}}: {{proposer}}</span>
                    <span>{{$t('vote.time')}}: {{start}} ~ {{end}}</span>
                    <span>{{$t('vote.address')}}: {{address}}</span>
                </p>
                <p class="desc">{{description}}</p>
            </div>
            <div class="center">
                <div class="label">
                    <span class="left">{{$t('vote.candidates')}}<span>
                    <span class="right">{{$t('vote.choosed')}}: {{choosed.name}}</span>
                </div>
                <hr/>
                <div class="candidates">
                    <div class="cand" v-for="cand in candidates" :active="choosed.key==cand.key" :key="cand.key" @click="choose(cand)">
                        <p class="title">{{cand.name}}</p>
                        <p class="desc">{{cand.description}}</p>
                    </div>
                </div>
                <p class="choose">{{$t('vote.choosed')}}: {{choosed.name}}</p>
            </div>
            <a-button class="right" type="primary" @lick="submit" block>{{$t('vote.submitButton')}}</a-button>
        </div>
        <!-- 验证投票人 -->
        <div v-else class="verify">
            <h3>{{$t('vote.title')}}</h3>
            <p class="label">{{$t('vote.ticketNumber')}}</p>
            <a-input :value="vid" :placeholder="$t('vote.ticketNumberHolder')" @change="e=>vid=e.target.value" :disabled="hasVid"/>
            <p class="label">{{$t('vote.passcode')}}</p>
            <a-input :value="passcode" :placeholder="$t('vote.passcodeHolder')" @change="e=>passcode=e.target.value"/>
            <a-button type="primary" @click="getPoll" block>{{$t('vote.verifyButton')}}</a-button>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
export default {
    name: 'Vote',
    setup(props) {
        const { ctx } = getCurrentInstance()
        const route = useRoute()
        const data = reactive({
            vid: '',
            passcode: '',
            showPoll: true,
            hasVid: true,
            title: '这是一个投票',
            description: 'Unix时间传统用一个32位的整数进行存储。这会导致“2038年”问题，当这个32位的unix时间戳不够用，产生溢出，使用这个时间的遗留系统就麻烦了。所以，如果我们想让我们的 DApp 跑够20年，我们可以使用64位整数表示时间，但为此我们的用户又得支付更多的 gas。',
            address: '0x0000000000000000000000000000000000',
            proposer: '易投官方',
            start: '2021-9-2',
            end: '2021-10-2',
            open: false,
            stoped: false,
            choosed: {
                key: '',
                name: ''
            },
            candidates: [{
                key: '0xssdibdfbvfvbvbfivfv',
                name: ' 俄国和认同人人肉体和他',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf'
            }, {
                key: '0xsbvfvbfbfivfv',
                name: ' 让任何人人人人热',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf'
            }, {
                key: '0xssdibdfbvfvbfivfv',
                name: ' 忍痛割肉让他让他哈如 ',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf'
            }, {
                key: '0xssdibbvfvbfivbfivfv',
                name: '人工和 人工如何',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf'
            }, {
                key: '0xssdibdfbvfvivbfivfv',
                name: '让他会突然给人',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf'
            }, {
                key: '0xsibdfbvfvbfivbfivfv',
                name: '的沟通认同感和给让他',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf'
            },{
                key: '0xssdibdfbvfvbfivbfivffhtv',
                name: ' 俄格更让人韩国日本和人人',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf'
            },{
                key: '0xsbdfbvfvbfivbfivfv',
                name: '好帖让个额沟通给人不会让她更好',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf'
            },{
                key: '0xssdibdfbvfvbfirgrgvbfivfv',
                name: '如果让他俄国人他给',
                description: 'eferfuherferfhre8frefgrefgresdbvudfoygveryugfver8ykgfverbv8fyegbvg8eygfve8rygkf'
            }]
        })
        // 选择候选人
        const choose = (cand) => {
            data.choosed.key = cand.key
            data.choosed.name = cand.name
        }
        // 提交
        const submit = () => {
            ctx.axios.post(ctx.$api.vote, {
                vid: data.vid,
                passcode: data.passcode,
                candidate: data.choosed.key,
            }).then(res => {
                // 保存凭证
                const content = JSON.stringify(res.data)
                const eleLink = document.createElement('a')
                eleLink.download = 'easyvote-voucher-'+(new Date()).valueOf()+'.json'
                eleLink.style.display = 'none'
                const blob = new Blob([content])
                eleLink.href = URL.createObjectURL(blob)
                document.body.appendChild(eleLink)
                eleLink.click()
                document.body.removeChild(eleLink)
                // 弹出notice
                ctx.$notification.success({
                    message: ctx.$i18n.tc('vote.succSubmitTitle'),
                    description: ctx.$i18n.tc('vote.succSubmitDesc')
                })
                // 页面跳转
                ctx.$router.push({path:'/tally', params: {
                    vid: data.vid,
                }})
            })
        }
        // 获取投票
        const getPoll = () => {
            ctx.$router.get(ctx.$api.getPoll, {
                vid: data.vid,
                passcode: data.passcode,
            }).then(res => {
                data.title = res.data.title
                data.description = res.data.description
                data.address = res.data.address
                data.proposer = res.data.proposer
                data.start = res.data.start
                data.end = res.data.end
                data.open = res.data.open
                data.stoped = res.data.stoped
                data.candidates = res.data.candidates
                data.showPoll = true
            })
        }
        onBeforeMount(() => {
            if (route.params.vid) {
                data.vid = route.params.vid
                data.hasVid = true
            }
        })
        return {
            ...toRefs(data),
            choose,
            submit,
            getPoll,
        }
    }
}
</script>

<style scoped>
@media screen and (min-width: 1250px) {
    .vote {
        margin: 3em auto;
        padding: 0 1em;
    }
    .contract {
        display: grid;
        grid-template-columns: 1fr 775px 1fr;
        align-items: start;
    }
    .contract>.left {
        max-width: 325px;
        min-width: 200px;
        justify-self: end;
        padding: 1em;
        background-color: white;
        border-radius: 0.2em;
        box-shadow: 0 0 5px var(--back-color);
    }
    .contract>.center {
        justify-self: center;
        padding: 1em;
        margin: 0 2em 0 2em;
        background-color: white;
        border-radius: 0.2em;
        box-shadow: 0 0 5px var(--back-color);
    }
    .contract>.right {
        justify-self: start;
        max-width: 100px;
    }
    .candidates .cand {
        max-width: 200px;
        margin: 0.8em;
    }
}
@media screen and (max-width: 1249px) {
    .vote {
        max-width: 700px;
        margin: 3em auto;
        padding: 1.5em 1em;
        background-color: white;
        border-radius: 0.2em;
        box-shadow: 0 0 5px var(--back-color);
    }
    .contract .header {
        margin: 0 0 3em 0;
    }
    .candidates .cand {
        max-width: 200px;
        margin: 0.8em;
    }
}
@media screen and (max-width: 450px) {
    .vote {
        margin: 0 auto;
    }
    .candidates .cand {
        max-width: 160px;
        margin: 0.4em;
    }
    .right {
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .center .label .right {
        display: none;
    }
}
@media screen and (max-width: 385px) {
    .candidates .cand {
        max-width: 130px;
        margin: 0.4em;
    }
}
@media screen and (max-width: 300px) {
    .candidates .cand {
        max-width: 110px;
        margin: 0.4em;
    }
}
.contract .header .ant-tag {
    float: right;
}
.contract .header h2 {
    color: var(--words-color);
    font-weight: 500;
}
.contract .header .mate {
    margin: 0 0 0.5em 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.contract .header .mate span {
    margin: 0 1.5em 0 0;
    color: var(--assist-color)
}
.contract .label {
    margin: 0 0 0.5em 0;
}
.contract .label span.left {
    color: var(--words-color);
    font-weight: 500;
}
.contract .label span.right {
    float: right;
    color: var(--assist-color);
    font-weight: normal;
}
.candidates {
    margin-bottom: 3em;
    padding: 0 -1em;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}
.candidates .cand {
    /* max-width: 200px;
    min-width: 100px; */
    padding: 0.5em;
    /* margin: 0.8em; */
    background-color: var(--tiny-back-color);
    border-radius: 0.2em;
}
.candidates .cand:hover {
    box-shadow: 0 2px 5px var(--theme-color);
}
.candidates .cand:hover .title {
    color: var(--theme-color);
}
.candidates .cand[active="true"] {
    box-shadow: 0 2px 5px var(--theme-color);
    background-color: var(--theme-color);
}
.candidates .cand[active="true"] .title {
    color: white;
}
.candidates .cand[active="true"] .desc {
    color: white;
}
.candidates .cand p {
    word-wrap: break-word;
}
.candidates .cand p.title {
    font-size: 1.2em;
    font-weight: 600;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.candidates .cand p.desc {
    color: var(--assist-color);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
.choose {
    color: var(--assist-color);
    
    overflow: hidden;
    text-overflow: ellipsis;
}
.verify h3 {
    text-align: center;
    color: var(--words-color);
}
.verify .label {
    margin: 0;
    padding: 1.5em 0 0.5em 0.5em;
    font-weight: 500;
}
.verify .ant-btn {
    margin-top: 2em;
}
</style>