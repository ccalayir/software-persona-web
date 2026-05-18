import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../Pages/HomeView.vue') },
    { path: '/ekle', name: 'add', component: () => import('../Pages/AddDonorView.vue') },
    { path: '/duzenle/:id', name: 'edit', component: () => import('../Pages/EditDonorView.vue') },
    
    // KAN BEKLEYENLER İÇİN YENİ ROTALAR
    { 
      path: '/ihtiyac-ekle', 
      name: 'add-receiver', 
      component: () => import('../Pages/AddReceiverView.vue') 
    },
    { 
      path: '/ihtiyac-listesi', 
      name: 'receivers', 
      component: () => import('../Pages/ReceiverListView.vue') 
    }
  ]
})

export default router