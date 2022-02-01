// App router
import store from '../store/index.js'
import About from '../components/About.js'
import Login from '../components/Login.js'
import Profil from '../components/Profil.js'
import Welcome from '../components/Welcome.js'
import NotFound from '../components/NotFound.js'
import Dashboard from '../components/Dashboard.js'

const routes = [
	{ path: '/', component: Welcome, name: 'home' },
	{ path: '/about', component: About, name: 'about' },
	{ path: '/login', component: Login, name: 'login' },
	{ path: '/users/:id', component: Profil, name: 'profil' },
	// Authenticated only
	{ path: '/panel', component: Dashboard, name: 'panel', meta: { requiresAuth: true }},
	// Fallback
	{
		path: '/:catchAll(.*)',
		component: Vue.defineAsyncComponent(() =>
			import('../components/NotFound.js')
		),
		name: 'NotFound'
	}
]

const router = VueRouter.createRouter({
	// history: VueRouter.createWebHashHistory(),
	history: VueRouter.createWebHistory(),
	routes,
	linkActiveClass: "active",
})

router.beforeEach((to, from) => {
	// to.meta.requiresAuth && !store.AuthModuleName.state.isAuthenticated
	if (to.meta.requiresAuth && !store.state.isAuthenticated) {
		// this route requires auth, check if logged in if not, redirect to login page.
		return {
			// Redirect to
			path: '/login',
			// add to query string, save the location we were at to come back later
			query: { redirected_from: to.fullPath },
		}
	}
})

export default router