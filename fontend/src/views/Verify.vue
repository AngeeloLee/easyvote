<template>
    <div class="verify">
        <div v-if="hasVoucher" class="result">
            <div class="left">
                <h2>{{$t('verify.resultTitle')}}</h2>
                <p class="info">
                    <span>{{$t('verify.blockHash')}}：{{voucher.blockHash}}</span>
                    <span>{{$t('verify.txHash')}}：{{voucher.txHash}}</span>
                    <span>{{$t('verify.voterAccount')}}：{{voucher.account}}</span>
                    <span>{{$t('verify.voteTime')}}：{{voucher.time}}</span>
                    <img src="../../public/pass.png" alt="">
                </p>
            </div>
            <div class="center">
                <p class="label">{{$t('verify.pollLabel')}}</p>
                <hr/>
                <div class="poll">
                    <p class="title">{{poll.title}}</p>
                    <p class="mate">
                        <span>{{$t('verify.pollAddress')}}：{{poll.address}}</span>
                        <span>{{$t('verify.pollTime')}}：{{poll.createAt}}</span>
                    </p>
                    <div class="candidates">
                        <div class="cand" v-for="cand in poll.candidates" :active="voucher.elected==cand.key" :key="cand.key">
                            <p class="title">{{cand.name}}</p>
                            <p class="desc">{{cand.description}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right"></div>
        </div>
        <div v-else class="check">
            <h2 class="title">{{$t('verify.checkTitle')}}</h2>
            <p class="desc">{{$t('verify.checkDesc')}}</p>
            <a-upload accept=".json" @change="openVoucher">
                <a-button>{{$t('verify.selectButton')}}</a-button>
            </a-upload>
            <a-button class="btn" type="primary" @click="checkVoucher" block>{{$t('verify.checkButton')}}</a-button>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
export default {
    name: 'Verify',
    setup(props) {
        const { ctx } = getCurrentInstance();
        const route = useRoute();
        const data = reactive({
            hasVoucher: true,
            voucher: {
                txHash: '0xurhfirhfrifgrifhrfrfref',
                blockHash: '0xeuhfurhfrfhr9fhrifuhibfvfv',
                account: '0xeuhfieurhfriefhruferfrf',
                time: '2021-3-23 12:42:41',
                elected: '0xssdibdfbvfvivbfivfv',
            },
            poll: {
                title: '这是一个投票',
                address: '0x8745634958435734658734650293743',
                createAt: '2020-12-4 15:32:38',
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
                }],
            }
        });
        // 打开凭证文件
        const openVoucher = (e) => {}
        // 检查凭证
        const checkVoucher = () => {
            ctx.axios.post(ctx.$api.verify, {
                tx: data.voucher.txHash,
                block: data.voucher.blockHash,
                account: data.voucher.account
            }).then(res => {
                data.poll.title = res.poll.title
                data.poll.address = res.poll.address
                data.poll.createAt = res.poll.createAt
                data.poll.candidates = res.poll.candidates
            })
        }
        onMounted(() => {
            if (route.query.tx) {
                data.hasVoucher = true
                data.voucher.txHash = route.query.tx || null
                data.voucher.blockHash = route.query.block || null
                data.voucher.account = route.query.account || null
                data.voucher.elected = route.query.elect || null
            }
            if (data.hasVoucher) {
                checkVoucher()
            }
        })
        return {
            ...toRefs(data),
            openVoucher,
            checkVoucher,
        }
    }
}
</script>

<style scoped>
@media screen and (min-width: 1000px) {
    .verify {
        margin: 3em auto;
        padding: 0 1em;
    }
    .result {
        display: grid;
        grid-template-columns: 1fr 775px 1fr;
        align-items: start;
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
        margin: 0 2em 0 2em;
        background-color: white;
        border-radius: 0.2em;
        box-shadow: 0 0 5px var(--back-color);
    }
    .result>.left .info span {
        margin: 0 0 0.5em 0;
    }
    .result>.left img {
        margin: 0 auto;
        width: 70%;
    }
}
@media screen and (max-width: 999px) {
    .result {
        max-width: 700px;
        margin: 3em auto;
        padding: 1em;
        background-color: white;
        box-shadow: 0 0 5px var(--back-color);
    }
    .result>.left .info img {
        width: 6em;
        position: absolute;
        margin: -5em auto;
        z-index: 1;
    }
}
@media screen and (max-width: 400px) {
    .result {
        margin: 0 auto;
    }
    .result>.left .info img {
        width: 5em;
    }
}
.result h2 {
    text-align: center;
    margin: 0 auto 1.5em auto;
    z-index: 10;
}
.result .info {
    margin: 0 0 0.5em 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    z-index: 10;
}
.result .info span {
    margin: 0 1.5em 0 0;
}
.result p.label {
    margin: 0;
    padding: 1.5em 0 0.5em 0;
    font-weight: 500;
}
.result .poll .title {
    font-size: 1.5em;
    font-weight: 600;
    margin: 1em 0 0.5em 0;
}
.result .poll .mate {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.result .poll .mate span {
    margin: 0 1.5em 0 0;
    color: var(--assist-color);
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
    max-width: 200px;
    min-width: 100px;
    padding: 0.5em;
    margin: 0.8em;
    background-color: var(--tiny-back-color);
    border-radius: 0.2em;
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
.check {
    max-width: 600px;
    margin: 3em auto;
    padding: 1em 1em 2em 1em;
    border-radius: 0.2em;
    background-color: white;
    box-shadow: 0 0 5px var(--back-color);
}
.check .title {
    text-align: center;
    margin: 0 0 1.5em 0;
}
.check .btn {
    margin: 2em 0 0 0;
}
</style>