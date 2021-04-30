<template>
<div>
    <div class="header">
        <span class="logo">
            <a :active="$route.path=='/'" @click="$router.push({path:'/'})">
                <svg v-if="$i18n.locale === 'en'" data-name="ev" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350.91 86.87">
                    <polygon class="cls-1" points="42.53 70.95 14.93 46.1 22.52 37.67 42.53 55.7 86.08 16.49 86 0 0 0 0 86 86 86 86.08 31.75 42.53 70.95"/>
                    <path class="cls-1" d="M225.56,367.14V308.87h25v8.52H233.74v15.42h15.7v8.52h-15.7v17.29h16.81v8.52Z" transform="translate(-113 -297)"/>
                    <path class="cls-1" d="M278.2,367.14v-2.67a11.52,11.52,0,0,1-1.07,1A14.53,14.53,0,0,1,274,367a14.26,14.26,0,0,1-5.27,1,14.55,14.55,0,0,1-11.36-5.15q-4.56-5.15-4.57-13.19t4.57-13.19a15.19,15.19,0,0,1,16.52-4.26,11.94,11.94,0,0,1,3.31,1.71l1,.89v-2.68h7.59v35.06Zm-2.29-9.94a12.45,12.45,0,0,0,0-15.18,8.91,8.91,0,0,0-13,0,12.45,12.45,0,0,0,0,15.18,8.91,8.91,0,0,0,13,0Z" transform="translate(-113 -297)"/>
                    <path class="cls-1" d="M288.37,362.84l4.13-6.09q.51.5,1.32,1.14a18.55,18.55,0,0,0,3.25,1.79,10.92,10.92,0,0,0,4.57,1.13c2.65,0,4-1.18,4-3.56a3.11,3.11,0,0,0-1.59-2.67,19.67,19.67,0,0,0-3.76-1.9l-4.5-1.76a8.43,8.43,0,0,1-3.9-3.21,10,10,0,0,1-1.58-5.81,10.2,10.2,0,0,1,3.09-7.63,10.6,10.6,0,0,1,7.67-3,17.75,17.75,0,0,1,6.15,1.06,13.76,13.76,0,0,1,4.24,2.19l1.33,1.05-3.46,5.76a12.27,12.27,0,0,0-7.67-2.92,3.9,3.9,0,0,0-2.69.83,2.58,2.58,0,0,0-.92,2,3,3,0,0,0,1.57,2.57,24.47,24.47,0,0,0,3.73,1.84l4.46,1.78a8,8,0,0,1,3.83,3.42,11.77,11.77,0,0,1,1.52,6.22A10.44,10.44,0,0,1,310,365a11.34,11.34,0,0,1-8.25,3,19.89,19.89,0,0,1-4.54-.52,17.58,17.58,0,0,1-3.79-1.3c-1-.51-1.95-1-2.73-1.5a17.33,17.33,0,0,1-1.77-1.22Z" transform="translate(-113 -297)"/>
                    <path class="cls-1" d="M345,332.08l-18.36,50.65-8,0,5.6-15.61-12.61-35.07h8.26l8.44,23.7,8.52-23.7Z" transform="translate(-113 -297)"/>
                    <path class="cls-1" d="M385.83,308.87,364,369.58l-22-60.71h8.84l13.17,36.82,13.08-36.82Z" transform="translate(-113 -297)"/>
                    <path class="cls-1" d="M407.36,336.59a20.1,20.1,0,0,1,0,26.05,15.92,15.92,0,0,1-23.74,0,20.07,20.07,0,0,1,0-26.05,15.9,15.9,0,0,1,23.74,0ZM389,342.11a12.21,12.21,0,0,0,0,15,8.74,8.74,0,0,0,13,0,12.21,12.21,0,0,0,0-15,8.72,8.72,0,0,0-13,0Z" transform="translate(-113 -297)"/>
                    <path class="cls-1" d="M413.25,340v-8h3.69V321h7.59v11.12h7.52v8h-7.52v27.1h-7.59V340Z" transform="translate(-113 -297)"/>
                    <path class="cls-1" d="M464.28,349.28l-24.7,5.2a9.37,9.37,0,0,0,3.47,4,9,9,0,0,0,5,1.48,8.21,8.21,0,0,0,4.42-1.18,7,7,0,0,0,2.58-2.39l.74-1.14,6.64,3.74q-.15.32-.48.93a17.3,17.3,0,0,1-1.59,2.15,16.5,16.5,0,0,1-2.76,2.72,15.62,15.62,0,0,1-4.13,2.15,15.84,15.84,0,0,1-5.57,1,15.62,15.62,0,0,1-12.23-5.27,20.27,20.27,0,0,1,.07-26.09,16,16,0,0,1,23.66-.14A18.9,18.9,0,0,1,464.28,349.28Zm-16.67-10.06a8.47,8.47,0,0,0-6.12,2.44,10,10,0,0,0-2.88,6.49l17-3.58A8.19,8.19,0,0,0,447.61,339.22Z" transform="translate(-113 -297)"/>
                </svg>
                <svg v-else-if="$i18n.locale === 'zh'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 254.7 86">
                    <polygon class="cls-1" points="42.53 70.95 14.93 46.1 22.52 37.67 42.53 55.7 86.08 16.49 86 0 0 0 0 86 86 86 86.08 31.75 42.53 70.95"/>
                    <path class="cls-1" d="M244.65,343.54a51.35,51.35,0,0,0,3-4.3h33.66V308.59H231.41v30.65h7.3A59.54,59.54,0,0,1,221,354.54l-1.42.8,1.35.9a27.23,27.23,0,0,1,4.15,3.72l.56.65.72-.45a69.15,69.15,0,0,0,12-9.6h8.18a57.81,57.81,0,0,1-19.28,17.7l-1.33.75,1.21.92a42.24,42.24,0,0,1,4.15,3.86l.57.61.7-.45a71,71,0,0,0,22.54-23.39h8.05c-3.64,8.39-9,15.55-15.3,20.25l-1.24.92,1.35.75a31.1,31.1,0,0,1,4.31,3.31l.64.6.68-.56c7.27-6.05,13.44-15,17.44-25.27h7.37c-.69,7.19-1.81,16.27-3.7,18l-.07.08c-.37.4-.71.49-2,.49a81.61,81.61,0,0,1-8.29-.37l-2-.21,1.06,1.73a10.61,10.61,0,0,1,1.35,4.4l.05.89.89.06a77.45,77.45,0,0,0,9.32.07,7.44,7.44,0,0,0,5.71-2.4c2.58-2.67,4.06-9.74,5.44-26a26.27,26.27,0,0,0,.24-2.68l.05-1Zm29.06-16.45v5.42H238.88v-5.42Zm0-11.85v5.42H238.88v-5.42Z" transform="translate(-113 -297)"/>
                    <path class="cls-1" d="M318.54,332.38l1.67.86a14.31,14.31,0,0,1,4.36,3.26l.57.7.75-.5c9.59-6.32,10.7-14.58,10.7-20.25V314.3h11.05v11c0,5.66,1.18,8.72,7.38,8.72h6.3a15.6,15.6,0,0,0,4.34-.42l.84-.26-.15-.87a44.29,44.29,0,0,1-.43-4.68l-.07-1.19-1.16.27a18.47,18.47,0,0,1-3.52.35h-6c-.08-.1-.19-.47-.19-1.84V307.05H329.34v9.25c0,4.72-1,10.71-9.15,15.17Z" transform="translate(-113 -297)"/>
                    <path class="cls-1" d="M365.82,368.4a60.75,60.75,0,0,1-18.38-6.88,47.83,47.83,0,0,0,13.87-21l.29-.85-4.72-2.16-1.27.27h-34.3l-6.9,2V327.46h9.3v-7.25h-9.3v-15h-7.48v15h-10.2v7.25h10.2v14.37c-4.34,1.24-7.73,2.15-10.33,2.78l-1,.25,2.25,7.36,9.11-2.67v18a3.18,3.18,0,0,1,0,.38,1.18,1.18,0,0,1-.4,0h-.72c-1.42,0-4.05,0-7-.08l-1.61-.07.66,1.48a23.53,23.53,0,0,1,1.65,4.92l.13.84h.86c5.41,0,8.53-.17,10.51-1.12,2.38-1,3.39-2.92,3.39-6.4V347.23l7.34-2.2h1.84A53.74,53.74,0,0,0,335,361.33a64.51,64.51,0,0,1-18.82,7.15l-1.66.36,1.12,1.28a16.74,16.74,0,0,1,2.58,4.75l.29.89.91-.24a71.78,71.78,0,0,0,21.7-9.2,60.32,60.32,0,0,0,20.78,9.13l.79.2.35-.74a19.16,19.16,0,0,1,3.31-4.8l1.4-1.31Zm-24.64-11.35a42.9,42.9,0,0,1-9.79-12h19.85A40.08,40.08,0,0,1,341.18,357.05Z" transform="translate(-113 -297)"/>
                </svg>
            </a>
        </span>
        <span class="nav">
            <a-button size="small" @click="switchLang" ghost>{{$t('menu.switchLang')}}</a-button>
            <a v-if="!store.state.logined" :active="$route.path.startsWith('/login')" class="link pc" @click="$router.push({path:'/login'})">{{$t('menu.login')}}</a>
            <a v-else class="link user pc" :active="$route.path.startsWith('/user')" @click="$router.push({path:'/user'})"><i class="iconfont icon-user"></i>{{store.state.username}}</a>
            <a class="link pc" :active="$route.path.startsWith('/about')" @click="$router.push({path:'/about'})">{{$t('menu.about')}}</a>
            <a class="link pc" :active="$route.path.startsWith('/create')" @click="$router.push({path:'/create'})">{{$t('menu.create')}}</a>
            <a class="link pc" :active="$route.path.startsWith('/tally')" @click="$router.push({path:'/tally'})">{{$t('menu.tally')}}</a>
            <a class="link pc" :active="$route.path.startsWith('/verify')" @click="$router.push({path:'/verify'})">{{$t('menu.verify')}}</a>
            <a class="link pc" :active="$route.path.startsWith('/vote')" @click="$router.push({path:'/vote'})">{{$t('menu.vote')}}</a>
            <span class="mobile">
                <i class="iconfont icon-menu"></i>
                <div class="actions">
                    <a v-if="!store.state.logined" :active="$route.path.startsWith('/login')" class="item" @click="$router.push({path:'/login'})">{{$t('menu.login')}}</a>
                    <a v-else class="item user" :active="$route.path.startsWith('/user')" @click="$router.push({path:'/user'})">{{store.state.username}}</a>
                    <a class="item" :active="$route.path.startsWith('/about')" @click="$router.push({path:'/about'})">{{$t('menu.about')}}</a>
                    <a class="item" :active="$route.path.startsWith('/create')" @click="$router.push({path:'/create'})">{{$t('menu.create')}}</a>
                    <a class="item" :active="$route.path.startsWith('/tally')" @click="$router.push({path:'/tally'})">{{$t('menu.tally')}}</a>
                    <a class="item" :active="$route.path.startsWith('/verify')" @click="$router.push({path:'/verify'})">{{$t('menu.verify')}}</a>
                    <a class="item" :active="$route.path.startsWith('/vote')" @click="$router.push({path:'/vote'})">{{$t('menu.vote')}}</a>
                </div>
            </span>
        </span>
    </div>
    <div v-if="showUnsupportNotice" class="notice">
        <span><a-button @click="showUnsupportNotice=false" type="link">{{$t('menu.closeNoticeButton')}}</a-button></span>
        <p>{{$t('menu.unsupportNotice')}}</p>
    </div>
</div> 
</template>

<script>
import { getCurrentInstance, reactive, toRefs } from 'vue'
import { injectStore } from '../store'
export default {
    setup(props) {
        const { ctx } = getCurrentInstance()
        const data = reactive({
            showUnsupportNotice: true,
        })
        const store = injectStore()
        const switchLang = () => {
            if (ctx.$i18n.locale == 'en') {
                localStorage.setItem('language', 'zh')
                ctx.$i18n.locale = 'zh'
            } else if (ctx.$i18n.locale == 'zh') {
                localStorage.setItem('language', 'en')
                ctx.$i18n.locale = 'en'
            }
        }
        return {
            ...toRefs(data),
            store,
            switchLang
        }
    }
}
</script>

<style scoped> 
.header {
    --hover-color: var(--theme-color);
    position: relative;
    z-index: 100;
    padding: 1em;
    background-color: white;
    box-shadow: 0 1px 5px var(--back-color);
    /* background-color: var(--back-color); */
    /* border-bottom: 1px solid rgb(219, 219, 219); */
}
.header span.logo {
    margin: 0;
    padding: 0.8em 1em;
    font-size: 1.5em;
    font-weight: bold;
}
.header span.logo a {
    color: var(--words-color);
    text-decoration: none;
}
.header span.logo a svg {
    height: 1.2em;
    margin-bottom: -0.1em;
    fill: var(--words-color);
}
.header span.logo a svg:hover {
    fill: var(--hover-color);
}
.header span.logo a[active="true"] svg {
    fill: var(--hover-color);
}
.nav a.link {
    line-height: 1.8em;
    margin: 0 1em;
    float: right;
    font-size: 1.2em;
    font-weight: 600;
    color: var(--words-color);
    text-decoration:none;
}
.nav a.link::after {
    display: block;
    content: "";
    height: 0;
    width: 0;
    left: 100%;
    background-color: var(--hover-color);
    -webkit-transition: transform .5s ease;
    -moz-transition: transform .5s ease;
    -ms-transition: transform .5s ease;
    transition: transform .5s ease;
    transform: scaleX(0);
}
.nav a.link:hover {
    color: var(--hover-color);
}
.nav a.link:hover::after {
    height: 2px;
    width: 100%;
    left: 10%;
    transform: scaleX(1);
}
.nav a.link[active="true"] {
    color: var(--hover-color);
}
.nav a.link.user {
    font-weight: 400;
}
.nav button {
    float: right;
    margin: 0.2em 1em;
    color: var(--words-color);
    border-color: var(--words-color);
}
.nav button:hover {
    color: var(--hover-color);
    border-color: var(--hover-color);
}
.notice {
    background-color: rgb(255, 222, 160);
    text-align: center;
}
.notice p {
    margin: 0;
    padding: 0.5em 1em;
    color: var(--words-color);
}
.notice span {
    float: right;
}

@media screen and (min-width: 775px) {
    .mobile {
        display: none;
    }
}
@media screen and (max-width: 774px) {
    .pc {
        display: none;
    }
    .mobile {
        position: relative;
        float: right;
        margin: 0 1em;
        line-height: 2.4em;
    }
    .mobile>i {
        font-size: 1.5em;
    }
    .mobile .actions {
        position: absolute;
        display: none;
        z-index: 100;
        width: 90px;
        background-color: white;
        border-radius: 0.2em;
        box-shadow: 0 0 5px var(--back-color);
    }
    .mobile .actions .item {
        display: block;
        padding: 0.3em 1em;
        color: var(--words-color);
        font-weight: 700;
    }
    .mobile .actions .item:hover {
        color: white;
        background-color: var(--theme-color);
    }
    .mobile .actions .item[active="true"] {
        color: white;
        background-color: var(--theme-color);
    }
    .mobile .actions .item.user {
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .mobile:hover .actions {
        display: block;
    }
    .header span.logo {
        padding: 0.8em 0;
    }
    .nav button {
        margin: 0.2em 0;
    }
    .notice {
        text-align: left;
    }
}

@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1616948845630'); /* IE9 */
  src: url('iconfont.eot?t=1616948845630#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAL0AAsAAAAABpwAAAKlAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBJIE4ATYCJAMICwYABCAFhG0HMhvgBRHVkzlkXydviu2ozg6HO0WNgWlbO2yUfaWKrbpQeDHq9EeU/UwQ0X6/2Xf3zYGkGokqUlUShELIhCQaxaI00ZA/1NzueQIjVgublFCMyfufG2Z9xAtpmETvKpP7E78dVhq58WiBBnhkrtcDBhj/zG7vbkhOlbugCS3I2y8UBiZy1gLF6GD4APjj3ukfBbRxvvPKZY5Jk7oA40AKaG+MIiuS2BvGLnAJjyGAnUjSkcLiykYKjbVKAJkcG+mjcmE0muWsCOaagxo5IIvV2IuQYD/8vvyiKVYwMCmshtpdNMhEsQtY/XHyESIJBHTcBCggHdAgjbXpahhhJIWdN4kFNDr2wWMrstc/DzFjVTsBCIfie5K40lvlNgDQMBpSgZZR14Ny+isLz3dlb+1/y3iTG9WVL8wKKwSG0kYGsxbEJxBa9HJS5tF2juovEBBxOlHKXM42c/ghzQkUxJPqc3uOE6FcV688hSABNCAsFfJZdXQIVBRieiELJVQIf2YAENRDCBB4/+isnvm3rAF42dcLlwRN1DxgPZ9H4L9JevZoXWZZDK1KavMGqaj7abJjB4Jgv5+3sfrQm3QK1pyEgYGFCFBYiUc1MR1MOMgAM1ZywE4aJccdBJiHEW0DUtkCIHg5AgM3p6DwcoNq4iuYCOMfzHhFgZ3mFLjQQaKM2QvmLVQYdVDfYGmBLxwbl6LaBRp3V6GsLGRskGIrBg25XszN0UeaY0v8MJrMAgQFHszAc+i6AYQU2KixbDKHw1pN1L1J1gIvUeISKow6qG+wtMAX/mAulT6/QOPuKtTSVePfIMXW+NCQ6z3Qudrv1XUvr8QPo8ksQFDgwQzMQ9cNIKyfZ6PGsjkiGQ5rdj/RVy2vr/W+7hDQWIYQe7aiBhRLV/x6L5EAAAAA') format('woff2'),
  url('iconfont.woff?t=1616948845630') format('woff'),
  url('iconfont.ttf?t=1616948845630') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('iconfont.svg?t=1616948845630#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 1em;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 0.3em 0;
}

.icon-user:before {
  content: "\e606";
}
@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1618664627649'); /* IE9 */
  src: url('iconfont.eot?t=1618664627649#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAK8AAsAAAAABtwAAAJvAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBaIFdATYCJAMICwYABCAFhG0HLhsBBhHVi0GyvxRvjCL3s8yGNTkYzRazR/dyFAvvGyqDz6GYb2NVBaqkfr8R/D9/v2/t+87PpMnCwSrLsKKh1kyQ8SjAARodCm7gDzK5trd2ixJJKGFrcc6cwIgINZKzB1Soxn864CwnD7goDPEjUjVwyH0H4IA5s1YvAM7Wa48RN02poiQcAIn2BerzXE7vrgIKZH6gHOdYeNQLsBcG1AtsD4wiG7gBuGHsghd4GgLClNCEerbnG4hhTxKg5TQOwUIIw1g2iPA3rDR0xYigO3YHuIzur18sCQ6fh103tLR5wX1x8tgq6AQEYUCg9T7AA5oAA401pgYAMbZHOJVUwLGqBV/+gQUd9c9DfuzKKABFUPRMYk/yqL90ABjgBwYIxif5wR+1ifjjzC9P7rbvIzi9vb6ZyVRzhNBAt27CPJ2Rz7SJdB9cl5GYRsPqgq5VleWmAzvivdmf+xs6D3LdshgA76/IYAzzAMFbcAt+pXhgixlS2+xMEzcqHNbVLSrDhpeC7UvzOVWXu++cCJK7e0+A4gweQapIYzXBR4Rm+AnSjjCN9K+PkGEFkIWABvYBRJJnOOK8wCPJK2msD/jI8w8/SYEwE8rsGKFGUDpfMYVCL4z+mD7rSrlWmcfVF4rfRch5acR5EHdpFE3NKGd3VBEvMaf7xJaIQsV1iVtwHhVFjQ3XGT1FS0QaW9dV05W0Z13CHFZModALoz+mz7pSQWeZV25/ofhdhNxBqws/iLu0fzQ1YwC5U1WDaI9ySfeJLRGFiusSt8BBhZOqsWkeltFTtGRCorF11E4NVWnba8q/2wPAHGx9v+c0ewxLqt4AAA==') format('woff2'),
  url('iconfont.woff?t=1618664627649') format('woff'),
  url('iconfont.ttf?t=1618664627649') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('iconfont.svg?t=1618664627649#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-menu:before {
  content: "\e868";
}
</style>