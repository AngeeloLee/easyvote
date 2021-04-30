<template>
    <div class="user">
        <div class="info">
            <p><a @click="editProfile"><h1>{{nickname}}</h1></a></p>
            <p class="mate">
                <span>{{username}}</span>
                <span>{{$t('user.balance')}}：{{balance}}TEH</span>
                <span>{{$t('user.account')}}：{{address}}</span>
            </p>
            <span>
                <a-button class="edit" size="small" @click="editProfile">{{$t('user.editButton')}}</a-button>
                <a-button class="logout" size="small" @click="logout">{{$t('user.logoutButton')}}</a-button>
            </span>
        </div>
        <div class="polls">
            <p class="label">{{$t('user.polls')}}</p>
            <hr/>
            <div class="card" v-for="poll in polls" :key="poll.address">
                <a-tag :color="status[poll.status]">{{$t('user.'+poll.status)}}</a-tag>
                <span class="right" v-if="poll.status==='VOTING'"><a @click="stopPoll(poll.address)">{{$t('user.stop')}}</a></span>
                <span class="right" v-if="poll.status==='READY'"><a @click="removePoll(poll._id)">{{$t('user.remove')}}</a></span>
                <span class="right" v-if="poll.status==='READY'"><a @click="editPoll(poll._id)">{{$t('user.edit')}}</a></span>
                <span class="right" v-if="poll.status==='READY'"><a @click="publishPoll(poll._id)">{{$t('user.publish')}}</a></span>
                <p class="title"><a @click="gotoPoll(poll._id, poll.status)">{{poll.title}}</a></p>
                <p class="desc">{{poll.description}}</p>
                <p class="mate">
                    <span>{{$t('user.voted')}} {{poll.done}}/{{poll.total}}</span>
                    <span>{{$t('user.createdAt')}} {{(new Date(poll.createdAt)).toLocaleDateString()}}</span>
                    <span>{{$t('user.address')}} {{poll.address}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, toRefs, reactive, onMounted, onBeforeMount } from 'vue'
import { injectStore } from '../store'
export default {
    name: 'User',
    setup(props) {
        const { ctx } = getCurrentInstance()
        const store = injectStore()
        const data = reactive({
            status: {
                'READY': 'purple',
                'VOTING': 'blue',
                'DONE': 'orange',
            },
            nickname: '',
            username: '',
            balance: 0,
            address: '',
            polls: [{
                address: '0x00000000000000000000000000000000',
                title: '这是一个投票',
                description: '区块链是一个信息技术领域的术语。从本质上讲，它是一个共享数据库，存储于其中的数据或信息，具有不可伪造、全程留痕、可以追溯、公开透明、集体维护等特征。',
                status: 'VOTING',
                createdAt: new Date(),
                total: 127,
                done: 93,
            }, {
                address: '0x00000000000000000000000000000000',
                title: '这是一个投票',
                description: '区块链是一个信息技术领域的术语。从本质上讲，它是一个共享数据库，存储于其中的数据或信息，具有不可伪造、全程留痕、可以追溯、公开透明、集体维护等特征。',
                status: 'DONE',
                createdAt: new Date(),
                total: 127,
                done: 93,
            }, {
                address: '0x00000000000000000000000000000000',
                title: '这是一个投票',
                description: '区块链是一个信息技术领域的术语。从本质上讲，它是一个共享数据库，存储于其中的数据或信息，具有不可伪造、全程留痕、可以追溯、公开透明、集体维护等特征。',
                status: 'READY',
                createdAt: new Date(),
                total: 127,
                done: 93,
            }],
        })
        const logout = () => {
            ctx.axios.post(ctx.$api.logout).then(res => {
                store.logout()
                ctx.$router.push({path: '/'})
            })
        }
        const editProfile = () => {
            ctx.$router.push({path: '/user/profile'})
        }
        const gotoPoll = (cid, status) => {
            if (status === 'READY') {
                ctx.$router.push({path:'/create/'+cid})
            } else {
                ctx.$router.push({path:'/poll/'+cid})
            }
        }
        const stopPoll = (address) => {}
        const editPoll = (cid) => {
            ctx.$router.push({path:'/create/'+cid})
        }
        const publishPoll = (cid) => {}
        const removePoll = (cid) => {}
        onBeforeMount(() => {
            if(!store.state.logined) {
                ctx.$router.go(-1)
            }
        })
        onMounted(() => {
            // data.nickname = ctx.$i18n.tc('user.defaultNickname')
            // data.username = store.state.username
            // data.address = ctx.$i18n.tc('user.defaultAddress')
            ctx.axios.get(ctx.$api.getInfo).then(res => {
                // console.log('response:', res)
                data.nickname = res.data.nickname
                data.username = res.data.username
                data.balance = res.data.balance
                data.address = res.data.address ? res.data.address : '-----------------------------'
                data.polls = res.data.contracts
            })
        })
        return {
            ...toRefs(data),
            logout,
            editProfile,
            gotoPoll,
            stopPoll,
            editPoll,
            removePoll,
            publishPoll,
        }
    }
}
</script>

<style scoped>
@media screen and (min-width: 1000px) {
    .user {
        display: grid;
        margin: 3em auto;
        grid-template-columns: 1fr 700px 1fr;
        align-items: start;
        gap: 2em;
    }
    .info {
        justify-self: end;
        max-width: 275px;
        padding: 1em;
        background-color: white;
        border-radius: 0.2em;
        box-shadow: 0 0 5px var(--back-color);
    }
    .info span {
        display: block;
    }
    .info span .ant-btn {
        width: 100%;
        margin: 1em 0 0 0;
    }
    .polls {
        padding: 1em;
        background-color: white;
        border-radius: 0.2em;
        box-shadow: 0 0 5px var(--back-color);
    }
}
@media screen and (max-width: 999px) and (min-width: 400px) {
    .user {
        max-width: 700px;
        margin: 3em auto;
        padding: 1em;
        background-color: white;
        border-radius: 0.2em;
        box-shadow: 0 0 5px var(--back-color);
    }
    .info {
        margin: 0 0 5em 0;
    }
    .info span {
        float: right;
    }
    .info span .ant-btn.edit {
        display: block;
        margin-top: -3em;
    }
    .info span .ant-btn {
        width: 120px
    }
    .polls {
        margin: 3em 0;
    }
}
@media screen and (max-width: 399px) {
    .user {
        max-width: 700px;
        margin: 0 auto;
        padding: 1em;
        background-color: white;
        border-radius: 0;
        box-shadow: 0 0 0 var(--back-color);
    }
    .info {
        margin: 0 0 2em 0;
    }
    .info span {
        margin: 4.5em 0 0 0;
        display: block;
        text-align: center;
    }
    .info span .ant-btn {
        display: inline;
        width: 120px;
    }
    .info span .ant-btn.edit {
        margin: 0 1em 0 0;
    }
    .info span .ant-btn.logout {
        margin: 0 0 0 1em;
    }
    .polls {
        margin: 3em 0;
    }
}
.info h1 {
    margin: 0 0 0.2em 0;
    font-weight: 600;
    color: var(--words-color);
}
.info h1:hover {
    color: var(--theme-color);
}
.info span.edit {
    float: right;
    padding: 1em 0 0 0;
}
.info p {
    margin: 0;
}
.info p span {
    float: left;
    margin: 0 1.5em 0 0;
    color: var(--assist-color);
}
.info .ant-btn {
    margin: 0.5em 0 0 0;
}
.polls .label {
    font-size: 1.1em;
    color: var(--words-color);
}
.polls .card {
    margin: 0 0 2em 0;
    padding: 0.5em;
    border: 1px solid var(--tiny-back-color);
    background-color: var(--tiny-back-color);
    border-radius: 0.2em;
}
.polls .card:hover {
    box-shadow: 0 2px 5px var(--theme-color);
}
.polls .card .ant-tag {
    float: right;
}
.polls .card .title {
    font-size: 1.3em;
    font-weight: 500;
    margin: 0 0 0.5em;
}
.polls .card .title a {
    color: var(--words-color);
}
.polls .card .title a:hover {
    color: var(--theme-color);
}
.polls .card .desc {
    margin: 0 0 0.5em;
    color: var(--words-color);
    font-weight: 350;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.polls .card span.right {
    float: right;
    margin: 0 1em 0 0;
    display: none;
}
.polls .card:hover span.right {
    display: inline-block;
}
.polls .card .mate {
    padding: 0 0 0.5em;
}
.polls .card .mate span {
    float: left;
    font-size: 0.8em;
    margin: 0 1.5em 0 0;
    color: var(--assist-color);
}
</style>