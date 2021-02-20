import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

// Index
import index from '@/view/index';

// Guest
import guestShowBerita from '@/view/guest/berita/Show';
import guestShowVideo from '@/view/guest/video/Show';
import guestShowArtikel from '@/view/guest/artikel/Show';
import guestBerita from '@/view/guest/berita/Index';
import guestArtikel from '@/view/guest/artikel/Index';
import guestVideo from '@/view/guest/video/Index';

// Auth
import signup from '@/view/auth/Signup';
import login from '@/view/auth/Login';
import forgot_password from '@/view/auth/ForgotPassword';

// User
import home from '@/view/user/Home';

// Berita
import createBerita from '@/view/user/berita/Create';
import editBerita from '@/view/user/berita/Edit';
import showBerita from '@/view/user/berita/Show';

// Artikel
import createArtikel from '@/view/user/artikel/Create';
import showArtikel from '@/view/user/artikel/Show';
import editArtikel from '@/view/user/artikel/Edit';

// Video
import createVideo from '@/view/user/video/Create';
import editVideo from '@/view/user/video/Edit';
import showVideo from '@/view/user/video/Show';


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: index,
        meta: {
            auth: false,
        }
    }, {
        path: '/berita',
        name: 'guest-berita',
        component: guestBerita,
        meta: {
            auth: false,
        }
    }, {
        path: '/artikel',
        name: 'guest-artikel',
        component: guestArtikel,
        meta: {
            auth:false,
        }
    },{
        path: '/video',
        name: 'guest-video',
        component: guestVideo,
        meta: {
            auth: false,
        }
    }, {
        path: '/baca/berita/:id',
        name: 'guest-baca-berita',
        component: guestShowBerita,
        meta: {
            auth: false,
        }
    }, {
        path: '/nonton/view/:id',
        name: 'guest-nonton-video',
        component: guestShowVideo,
        meta: {
            auth: false,
        }
    }, {
        path: '/baca/artikel/:id',
        name: 'guest-baca-artikel',
        component: guestShowArtikel,
        meta: {
            auth: false,
        }
    },

    // Auth
    {
        path: '/signup',
        name: 'signup',
        component: signup,
    },{
        path: '/login',
        name: 'login',
        component: login,
    },{
        path: '/forgot-password',
        name: 'forgot-password',
        component: forgot_password,
    },
    
    // User
    {
        path: '/home',
        name: 'home',
        component: home,
        meta: {
            auth: true,
        }
    }, 
    
    // Berita
    {
        path: '/create/berita',
        name: 'create-berita',
        component: createBerita,
        meta: {
            auth: true,
        }
    }, {
        path: '/edit/berita/:id',
        name: 'edit-berita',
        component: editBerita,
        meta: {
            auth: true,
        }
    }, {
        path: '/berita/baca/:id',
        name: 'show-berita',
        component: showBerita,
        meta: {
            auth: true, 
        }
    },
    
    // Artikel
    {
        path: '/create/artikel',
        name: 'create-artikel',
        component: createArtikel,
        meta: {
            auth: true,
        }
    }, {
        path: '/edit/artikel/:id',
        name: 'edit-artikel',
        component: editArtikel,
        meta: {
            auth: true,
        }
    }, {
        path: '/artikel/baca/:id',
        name: 'show-artikel',
        component: showArtikel,
        meta: {
            auth: true,
        }
    },
    
    // Video
    {
        path: '/create/video',
        name: 'create-video',
        component: createVideo,
        meta: {
            auth: true,
        }
    }, {
        path: '/edit/video/:id',
        name: 'edit-video',
        component: editVideo,
        meta: {
            auth: true,
        }
    }, {
        path: '/tonton/video/:id',
        name: 'show-video',
        component: showVideo,
        meta: {
            auth: true,
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            if(to.matched.some(record => record.meta.auth)) { 
                next()
            }else{
                next({
                    path: '/home'
                })
            }
        } else {
            if(to.matched.some(record => record.meta.auth)) { 
                next({
                    path: '/login'
                })
            }
            next();
        }
    });
})

export default router