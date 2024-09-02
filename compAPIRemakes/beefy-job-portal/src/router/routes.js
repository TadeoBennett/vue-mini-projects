const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Home.vue'), name: "Home" },
      { path: 'settings', component: () => import('src/pages/Settings.vue') },

      // jobs paths
      { path: 'jobs', component: () => import('src/pages/Jobs.vue'), name:"JobList" },                        //get all jobs
      { path: 'jobs/:id', component: () => import('src/pages/JobDetails.vue'), name: "JobDetails", props:true },             //get specific job
      { path: 'jobs/companies/:id', component: () => import('src/pages/CompanyByJobs.vue'), props:true },    //jobs listed under a company
      { path: 'jobs/location/:id', component: () => import('src/pages/JobsByLocation.vue'), props:true },    //jobs listed under a location

      // company paths
      { path: 'companies', component: () => import('src/pages/Companies.vue') },
      { path: 'companies/:id', component: () => import('src/pages/CompanyDetails.vue'),name:"companyDetails", props:true },
      
      
      // user paths
      { path: 'users', component: () => import('src/pages/Users.vue'), name: "UserList" },
      { path: 'users/:id', component: () => import('src/pages/UserDetails.vue'), name:"UserDetails", props:true },
      
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
