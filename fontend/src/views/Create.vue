<template>
    <div class="create">
        <a-button v-if="isUpdate" class="back" @click="back">{{$t('create.backButton')}}</a-button>
        <div class="item">
            <h2 class="title">
                {{isUpdate?$t('create.updateTitle'):$t('create.createTitle')}}
                <span>
                    <a-button class="publish" type="primary" @click="create(true)">{{$t('create.publish')}}</a-button>
                    <a-button class="save" type="primary" @click="create(false)">{{isUpdate?$t('create.update'):$t('create.save')}}</a-button>
                </span>
            </h2>
            <p class="label">{{$t('create.pollTitle')}}</p>
            <a-input :value="title" :placeholder="$t('create.pollTitleHolder')" @change="e=>title=e.target.value"/>
            <p class="label">{{$t('create.pollDesc')}}</p>
            <a-textarea :rows="2" :value="description" :placeholder="$t('create.pollDescHolder')" @change="e=>description=e.target.value"/>
            <p class="label">{{$t('create.pollExpiry')}}</p>
            <a-range-picker :value="dateRange" format="YYYY-MM-DD  HH:mm:ss" @change="dates=>{dateRange[0]=dates[0];dateRange[1]=dates[1];}" showTime />
            <p class="label">{{$t('create.pollOpen')}}</p>
            <a-switch @change="checked=>open=checked" />
        </div>
        <div class="item">
            <p class="label">
                {{$t('create.candidate')}}
                <span class="right"><a-button size="small" @click="showAddCandidate=true">{{$t('create.add')}}</a-button></span>
                <span class="right"><a-button size="small" @click="showImportCandidate=true">{{$t('create.import')}}</a-button></span>
            </p>
            <hr/>
            <div class="candidate" v-for="candi in candidates" :key="candi.name">
                <span><a @click="removeCandidate(candi.name)">{{$t('create.remove')}}</a></span>
                <p class="name">{{candi.name}}</p>
                <p class="desc">{{candi.description}}</p>
            </div>
        </div>
        <div v-if="!open" class="item">
            <p class="label">
                {{$t('create.voter')}}
                <span class="right"><a-button size="small" @click="showAddVoter=true">{{$t('create.add')}}</a-button></span>
                <span class="right"><a-button size="small" @click="showImportVoter=true">{{$t('create.import')}}</a-button></span>
            </p>
            <hr/>
            <div class="voter" v-for="voter in voters" :key="voter.contact">
                <span class="contact">{{voter.contact}}</span>
                <a-tag :color="types[voter.type]">{{$t('create.'+voter.type)}}</a-tag>
                <span class="remove"><a @click="removeVoter(voter.contact)">{{$t('create.remove')}}</a></span>
            </div>
        </div>
        <!-- 导入候选人 -->
        <a-modal 
            :visible="showImportCandidate" 
            :title="$t('create.importCandidateTitle')" 
            :okText="$t('create.importButton')"
            :cancelText="$t('create.cancelButton')"
            @cancel="showImportCandidate=false"
            @ok="importCandidates">
            <p>{{$t('create.importExplain')}}<a href="../../public/candidates-template.xlsx">candidates-template.xlsx</a></p>
            <a-upload accept=".xlsx" @change="appendCandidateFile">
                <a-button>{{$t('create.selectButton')}}</a-button>
            </a-upload>
        </a-modal>
        <!-- 添加候选人 -->
        <a-modal 
            :visible="showAddCandidate" 
            :title="$t('create.addCandidateTitle')" 
            :okText="$t('create.addButton')"
            :cancelText="$t('create.cancelButton')"
            @cancel="showAddCandidate=false"
            @ok="addCandidates">
            <a-row class="item">
                <a-col class="right" :span="6"><span style="color:red">*</span>{{$t('create.candidateName')}}</a-col>
                <a-col :span="18">
                    <a-input :value="oneCandidate.name" :placeholder="$t('create.candidateNameHolder')" @change="changeOneCandidateName" block/>
                    <p class="check" :active="!oneCandidate.uniqueChecked">{{$t('create.candidateNameCheck')}}</p>
                </a-col>
            </a-row>
            <a-row class="item">
                <a-col class="right" :span="6">{{$t('create.candidateDescription')}}</a-col>
                <a-col :span="18"><a-textarea :value="oneCandidate.description" :placeholder="$t('create.candidateDescriptionHolder')" @change="e=>oneCandidate.description=e.target.value" block/></a-col>
            </a-row>
        </a-modal>
        <!-- 导入投票人 -->
        <a-modal 
            :visible="showImportVoter" 
            :title="$t('create.importVoterTitle')" 
            :okText="$t('create.importButton')"
            :cancelText="$t('create.cancelButton')"
            @cancel="showImportVoter=false"
            @ok="importVoters">
            <p>{{$t('create.importExplain')}}<a href="../../public/voters-template.xlsx">voters-template.xlsx</a></p>
            <a-upload accept=".xlsx" @change="appendVoterFile">
                <a-button>{{$t('create.selectButton')}}</a-button>
            </a-upload>
        </a-modal>
        <!-- 添加投票人 -->
        <a-modal 
            :visible="showAddVoter" 
            :title="$t('create.addVoterTitle')" 
            :okText="$t('create.addButton')"
            :cancelText="$t('create.cancelButton')"
            @cancel="showAddVoter=false"
            @ok="addVoters">
            <a-row class="item">
                <a-col class="right" :span="6"><span style="color:red">*</span>{{$t('create.voterType')}}</a-col>
                <a-col :span="18">
                    <a-radio-group :value="oneVoter.type" @change="e=>{oneVoter.type=e.target.value;oneVoter.unsupportChecked=oneVoter.type==='EMAIL';}">
                        <a-radio-button value="MOBILE">{{$t('create.useMobile')}}</a-radio-button>
                        <a-radio-button value="EMAIL">{{$t('create.useEmail')}}</a-radio-button>
                    </a-radio-group>
                </a-col>
            </a-row>
            <a-row class="item">
                <a-col class="right" :span="6"><span style="color:red">*</span>{{$t('create.voterContact')}}</a-col>
                <a-col :span="18">
                    <a-input v-if="oneVoter.type==='EMAIL'" :value="oneVoter.email" :placeholder="$t('create.emailHolder')" @change="changeOneVoterEmail" block/>
                    <a-row v-if="oneVoter.type==='MOBILE'">
                        <a-col :span="8">
                            <a-select :default-value="oneVoter.code" @change="val=>oneVoter.code=val">
                            <a-select-option v-for="ctr in fullCountriesCode" :value="ctr.code" :key="ctr.code">
                                {{'+'+ctr.code+' '+ctr.name+' '+ctr.chinese_name}}
                            </a-select-option>
                            </a-select>
                        </a-col>
                        <a-col :span="16">
                            <a-input :placeholder="$t('create.mobileHolder')" @change="changeOneVoterMobile"/>
                        </a-col>
                    </a-row>
                    <p class="check" :active="!oneVoter.typeChecked">{{$t('create.voterContactTypeCheck')}}</p>
                    <p class="check" :active="!oneVoter.uniqueChecked">{{$t('create.voterContactUniqueCheck')}}</p>
                    <p class="check" :active="!oneVoter.unsupportChecked">{{$t('create.unsupportMobile')}}</p>
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
import { getCurrentInstance, reactive, toRefs, onMounted, } from 'vue'
import { fullCountriesCode } from '../assets/full_countries_code.json';
import { injectStore } from '../store'
import { useRoute } from 'vue-router'
import moment from 'moment'
import XLSX from 'xlsx'
// const xlsx = require('js-xlsx/dist/xlsx.core.min.js')
export default {
    name: 'Create',
    setup(props) {
        const { ctx, proxy } = getCurrentInstance() 
        const store = injectStore()
        const route = useRoute()
        const data = reactive({
            isUpdate: false,
            cid: '',
            title: '',
            description: '',
            dateRange: [],
            open: false,
            types: {'EMAIL':'blue', 'MOBILE':'orange'},
            showImportCandidate: false,
            showAddCandidate: false,
            showImportVoter: false,
            showAddVoter: false,
            candidates: {
                'this is a candidate': {
                    name: 'this is a candidate',
                    description: 'We introduced SVG icons in version 1.2.0, replacing font icons. This has the following benefits: Complete offline usage of icons, without dependency on a CDN-hosted font icon file.',
                },
                '这是一个候选人': {
                    name: '这是一个候选人',
                    description: '在党内选举中，所谓候选人是指选举时被确定为选举对象的人。候选人必须是有被选举权的人。必须根据多数选举人的意见确定候选人。',
                }
            },
            voters: {
                'user@mail.com': {
                    contact: 'user@mail.com',
                    type: 'EMAIL',
                }, 
                '86+13258317902': {
                    contact: '86+13258317902',
                    type: 'MOBILE',
                }
            },
            oneCandidate: {
                name: '',
                description: '',
                uniqueChecked: true,
            },
            oneVoter: {
                code: '86',
                mobile: '',
                email: '',
                type: 'EMAIL',
                typeChecked: true,
                uniqueChecked: true,
                unsupportChecked: true,
            },
            filedCandidates: {},
            filedVoters: {},
            importError: false,
            candidateUniqueChecked: true,
            voterUniqueChecked: true,
            voterTypeChecked: true,
            voterUnsupportChecked: true,
        })
        // 选中候选人文件
        const appendCandidateFile = info => {}
        // 导入候选人
        const importCandidates = () => { }
        // 添加候选人
        const addCandidates = () => {
            if (data.oneCandidate.name && data.oneCandidate.uniqueChecked) {
                data.candidates[data.oneCandidate.name] = {
                    name: data.oneCandidate.name,
                    description: data.oneCandidate.description
                }
                data.oneCandidate.name = ''
                data.oneCandidate.description = ''
                data.showAddCandidate = false
            }
        }
        // 候选人变更
        const changeOneCandidateName = (e) => {
            data.oneCandidate.name = e.target.value
            data.oneCandidate.uniqueChecked = !(data.oneCandidate.name in data.candidates)
        }
        // 选中投票人文件
        const appendVoterFile = info => {
            const file = info.file
            const reader = new FileReader()
            reader.onload = e => {
                try {
                    const result = e.target.result
                    console.log(result)
                    const workbook = XLSX.read(result, {type:'binary'})
                    console.log(workbook)
                } catch (error) {
                    console.log(error)
                    data.importError = true
                }
            }
            reader.readAsBinaryString(file)
        }
        // 导入投票人
        const importVoters = () => {
            console.log(data.voterFiles)
        }
        // 添加投票人
        const addVoters = () => {
            if (data.oneVoter.unsupportChecked && data.oneVoter.uniqueChecked && data.oneVoter.typeChecked) {
                const contact = data.oneVoter.type==='EMAIL' ? data.oneVoter.email : data.oneVoter.code+'+'+data.oneVoter.mobile
                data.voters[contact] = {
                    contact,
                    type: data.oneVoter.type,
                }
                data.oneVoter.type = 'EMAIL'
                data.oneVoter.code = '86'
                data.oneVoter.email = ''
                data.oneVoter.mobile = ''
                data.showAddVoter = false
            }
        }
        // 投票人手机号码变更
        const changeOneVoterMobile = (e) => {
            data.oneVoter.mobile = e.target.value
            data.oneVoter.typeChecked = /^1[^0][0-9]{9}$/.test(data.oneVoter.mobile)
            data.oneVoter.uniqueChecked = !(data.oneVoter.code+'+'+data.oneVoter.mobile in data.voters)
        } 
        // 投票人邮件变更
        const changeOneVoterEmail = (e) => {
            data.oneVoter.email = e.target.value
            data.oneVoter.typeChecked = /^[0-9a-zA-Z\-_\.]+@[0-9a-zA-Z\-_]+(\.[0-9a-zA-Z\-_]+)+$/.test(data.oneVoter.email)
            data.oneVoter.uniqueChecked = !(data.oneVoter.email in data.voters)
        }
        // 删除候选人
        const removeCandidate = (key) => {
            delete data.candidates[key]
        }
        // 删除投票人
        const removeVoter = (key) => {
            delete data.voters[key]
        }
        // 创建或是发布
        const create = publish => {
            console.log(data.dateRange)
            // return
            const candis = []
            for (const candi in data.candidates) candis.push(data.candidates[candi])
            let params = {
                title: data.title,
                description: data.description,
                start: data.dateRange[0],
                end: data.dateRange[1],
                candidates: candis,
                open: data.open,
                publish
            }
            if (!publish) {
                params.voters = []
                for (const voter in data.voters) params.voters.push(data.voters[voter])
            }
            // 若是更新
            if (data.isUpdate) {
                ctx.axios.post(ctx.$api.updatePoll, {cid:data.cid, ...params}).then(res => {
                    ctx.$notification.success({
                        message: ctx.$i18n.tc('create.succUpdatePollTitle'),
                        description: ctx.$i18n.tc('create.succUpdatePollDesc')
                    })
                    ctx.$router.push({path:'/user'})
                })
            }
            // 若是创建
            else {
                ctx.axios.post(ctx.$api.createPoll, params).then(res => {
                    ctx.$notification.success({
                        message: ctx.$i18n.tc('create.succCreatePollTitle'),
                        description: ctx.$i18n.tc('create.succCreatePollDesc')
                    })
                    ctx.$router.push({path:'/user'})
                })
            }
        }
        // 返回
        const back = () => {
            ctx.$router.go(-1)
        }
        onMounted(() => {
            console.log('route:', route)
            console.log('cid:', route.params.cid)
            // return
            if (route.params.cid) {
                console.log('get cid')
                data.isUpdate = true
                data.cid = route.params.cid
                ctx.axios.post(ctx.$api.getPoll, {'cid': data.cid}).then(res => {
                    data.title = res.data.title,
                    data.description = res.data.description
                    data.dateRange[0] = moment(res.data.start)
                    data.dateRange[1] = moment(res.data.end)
                    data.open = res.data.open
                    for (const candi of res.data.candidates) {
                        data.candidates[candi.name] = candi
                    }
                    for (const voter of res.data.tempVoters) {
                        data.voters[voter.contact] = voter
                    }
                }).catch(err => {
                    // ctx.$router.go(-1)
                })
            }
        })
        return {
            ...toRefs(data),
            moment,
            create,
            fullCountriesCode,
            removeCandidate,
            removeVoter,
            appendVoterFile,
            importCandidates,
            addCandidates,
            appendCandidateFile,
            importVoters,
            addVoters,
            changeOneCandidateName,
            changeOneVoterMobile,
            changeOneVoterEmail,
            back,
        }
    }
}
</script>

<style scoped>
@media screen and (min-width: 1000px) {
    .create {
        margin: 3em auto;
        max-width: 700px;
    }
    .create .item {
        margin: 0 0 2em 0;
        padding: 1.5em;
        background-color: white;
        border-radius: 0.2em;
        box-shadow: 0 0 5px var(--back-color);
    }
    .create h2.title {
        margin: 0.5em 0 0 0.5em;
        height: 2em;
        text-align: center;
    }
    .create h2.title span .ant-btn.publish {
        display: block;
        float: right;
        width: 100px;
        margin-right: -150px;
        margin-top: -2.5em;
    }
    .create h2.title span .ant-btn.save {
        display: block;
        float: right;
        width: 100px;
        margin-right: -150px;
        margin-top: 1em;
    }
    .ant-btn.back {
        float: left;
        margin-left: calc(-100px - 2em);
        width: 100px;
    }
}
@media screen and (max-width: 999px) and (min-width: 401px) {
    .create {
        margin: 3em auto;
        max-width: 700px;
        padding: 1em 1.5em 2em 1.5em;
        background-color: white;
        border-radius: 0.2em;
        box-shadow: 0 0 5px var(--back-color);
    }
    .create .item {
        margin: 0 0 2em 0;
    }
    .create h2.title {
        display: inline;
        margin: 0.5em 0 1.5em 0;
    }
    .create h2.title span .ant-btn {
        float: right;
        margin-left: 1em;
    }
    .ant-btn.back {
        margin-bottom: 1em;
    }
}
@media screen and (max-width: 400px) {
    .create {
        margin: 0 auto;
        max-width: 700px;
        padding: 1em 1.5em 2em 1.5em;
        background-color: white;
        border-radius: 0.2em;
        box-shadow: 0 0 5px var(--back-color);
    }
    .create .item {
        margin: 0 0 1.5em 0;
    }
    .create h2.title {
        display: block;
        text-align: center;
        margin: 0;
    }
    .create h2.title span {
        display: block;
        text-align: center;
        margin: 0.5em 0 0 0;
    }
    .create h2.title span .ant-btn.publish {
        margin-top: 1em;
        display: inline-block;
        width: 100px;
        margin: 0 1em 0 0;
    }
    .create h2.title span .ant-btn.save {
        margin-top: 1em;
        display: inline-block;
        width: 100px;
        margin: 0 0 0 1em;
    }
    .ant-btn.back {
        margin-bottom: 1em;
    }
}
.label {
    margin: 0;
    padding: 1.5em 0 0.5em 0.5em;
    font-weight: 500;
}
span.ant-calendar-picker {
    width: 100% !important;
}
.item span.right {
    float: right;
    margin: 0 0 0 1em;
}
.candidate {
    margin: 1em 0 2em;
    padding: 1em;
    background-color: var(--tiny-back-color);
    border-radius: 0.2em;
}
.candidate:hover {
    box-shadow: 0 2px 5px var(--theme-color);
}
.candidate:hover span {
    display: inline-block;
}
.candidate p.name {
    font-size: 1.2em;
    font-weight: 500;
    color: var(--words-color);
}
.candidate p.desc {
    margin: 0;
    color: var(--assist-color);
}
.candidate span {
    float: right;
    display: none;
}
.voter {
    padding: 0.5em 1em;
}
.voter span.contact {
    font-size: 600;
}
.voter span.ant-tag {
    margin: 0 0 0 2em;
}
.voter span.remove {
    float: right;
    display: none;
}
.voter:hover {
    background-color: var(--tiny-back-color);
    box-shadow: 0 2px 5px var(--theme-color);
    border-radius: 0.2em;
}
.voter:hover span.remove {
    display: inline-block;
}
.ant-modal .ant-row.item {
    padding: 0.5em 0;
}
.ant-modal .ant-col.right {
    text-align: right;
    padding-right: 1em;
}
.ant-modal p.check {
    display: none;
    color: red;
    margin: 0 0 0em;
    font-size: 0.8em;
}
.ant-modal p.check[active="true"] {
    display: block;
}
</style>