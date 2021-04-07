<template>
    <div class="profile">
        <h2>{{$t('profile.title')}}</h2>
        <p class="label">{{$t('profile.nickname')}}</p>
        <a-input :value="nickname" @change="e=>{nickname=e.target.value;updated.nickname=true}"/>
        <p class="label">{{$t('profile.username')}}</p>
        <a-input :value="username" @change="e=>{username=e.target.value;updated.username=true}"/>
        <p class="label">{{$t('profile.email')}}</p>
        <a-input :value="email" disabled/>
        <p class="label">{{$t('profile.mobile')}}</p>
        <a-input :value="mobile" disabled/>
        <p class="label">{{$t('profile.password')}}</p>
        <a-input-password :value="password" @change="e=>{password=e.target.value;updated.password=true}"/>
        <p class="label">{{$t('profile.address')}}</p>
        <a-input :value="address" @change="e=>{address=e.target.value;updated.address=true}"/>
        <p class="label">{{$t('profile.privatekey')}}</p>
        <a-textarea :value="privatekey" :rows="4" @change="e=>{privatekey=e.target.value;updated.privatekey=true}" allowClear/>
        <p class="label">{{$t('profile.passcode')}}</p>
        <a-input-password :value="passcode" @change="e=>{passcode=e.target.value;updated.passcode=true}"/>
        <p class="label">{{$t('profile.balance')}}</p>
        <a-input :value="balance" suffix="ETH" disabled/>
        <hr/>
        <a-button type="primary" @click="update" block>{{$t('profile.updateButton')}}</a-button>
        <a-button type="danger" @click="destroy" block>{{$t('profile.destroyButton')}}</a-button>
    </div>
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted, onBeforeMount } from 'vue'
import { injectStore } from '../store'
export default {
    name: 'Profile',
    setup(props) {
        const { ctx } = getCurrentInstance()
        const store = injectStore()
        const data = reactive({
            nickname: '易投官方账户',
            username: 'easyvote_official',
            email: 'email@email.com',
            mobile: '12365428653',
            password: '********',
            address: '0x000000000000000000000000000',
            privatekey: '--oufiugffsifgsfgsfgsfgishfssifhspifhsdifhdhauhddhefbisuhfiushfigsdfsd--',
            passcode: '123456',
            balance: 26.5,
            updated: {},
        })
        // 更新信息
        const update = () => {
            console.log(data.nickname)
            return
            let promises = []
            if (data.updated.username || data.updated.nickname || data.updated.password ) {
                let params = {}
                if (data.updated.username) params.username = data.username
                if (data.updated.nickname) params.nickname = data.nickname
                if (data.updated.password) params.password = data.password
                promises.push(ctx.axios.post(ctx.$api.updateProfile, params))
            }
            if (data.updated.address || data.updated.privatekey || data.updated.passcode) {
                let params = {}
                if (data.updated.address) params.address = data.address
                if (data.updated.privatekey) params.privatekey = data.privatekey
                if (data.updated.passcode) params.passcode = data.passcode
                promises.push(ctx.axios.post(ctx.$api.updateAddress, params))
            }
            Promise.all(promises).then(reses => {
                ctx.$notification.success({
                    massage: ctx.$i18n.tc('profile.succUpdateMsg'),
                    description: ctx.$i18n.tc('profile.succUpdateDesc')
                })
            })
        }
        // 注销账户
        const destroy = () => {
            ctx.$confirm({
                title: ctx.$i18n.tc('profile.destroyModalTitle'),
                content: ctx.$i18n.tc('profile.destroyModalDesc'),
                okText: ctx.$i18n.tc('profile.destroyModalConfirmButton'),
                okType: 'danger',
                cancelText: ctx.$i18n.tc('profile.destroyModalCancelButton'),
                onOk() {
                    ctx.axios.post(ctx.$api.destroy).then(res => {
                        store.logout()
                        ctx.$router.push({path:'/login'})
                    })
                },
            });
        }
        onBeforeMount(() => {
            if(!store.state.logined) {
                ctx.$router.push({path: '/login'})
            }
        })
        onMounted(() => {
            ctx.axios.get(ctx.$api.getProfile).then(res => {
                data.nickname = res.data.nickname
                data.username = res.data.username
                data.email = res.data.email || ''
                data.mobile = res.data.mobile || ''
                data.password = '********'
                data.address = res.data.address || ''
                data.privatekey = res.data.privatekey || ''
                data.passcode = res.data.passcode || ''
                data.balance = res.data.balance || ''
            })
        })
        return {
            ...toRefs(data),
            update,
            destroy,
        }
    }

}
</script>

<style scoped>
.profile {
    margin: 3em auto;
    max-width: 600px;
    padding: 1em 1em 5em 1em;
}
.profile h2 {
    text-align: center;
}
.label {
    margin: 0;
    padding: 1.5em 0 0.5em 0.5em;
    font-weight: 500;
}
.profile hr {
    margin: 2em 0 0 0;
}
.ant-btn {
    margin: 2em 0 0 0;
}
</style>