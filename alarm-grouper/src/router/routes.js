const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/HomePage.vue'), name: 'Home' },
      { path: 'profile', component: () => import('src/pages/ProfilePage.vue'), name: 'Profile' },
      { path: 'about', component: () => import('src/pages/AboutPage.vue'), name: 'About' },

      { path: 'categories', component: () => import('src/pages/Category/CategoryListPage.vue'), name: 'Categories' },
      { path: 'categories/:id', component: () => import('src/pages/Category/CategoryDetailsPage.vue'), name: 'CategoryDetails' },

      { path: 'alarms', component: () => import('src/pages/Alarm/AlarmsListPage.vue'), name: 'Alarms' },
      { path: 'alarms/active', component: () => import('src/pages/Alarm/ActiveAlarmsPage.vue'), name: 'ActiveAlarms' },
      { path: 'alarms/:id', component: () => import('src/pages/Alarm/AlarmDetailsPage.vue'), name: 'AlarmDetails' },

      { path: 'sounds', component: () => import('src/pages/Sound/SoundsPage.vue'), name: 'Sounds' }



    ]
  },

  // For the login of users
  {
    path: '/public',
    component: () => import('pages/PublicLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/public/Login.vue'), name: 'LoginPage' }
    ]
  },

  // Catch all route
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes;
