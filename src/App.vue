<template>
  <div>
    <!-- Bootstrap Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
      <div class="container">
        <router-link class="navbar-brand fw-bold" to="/">🩸 Kan Bağışı Ağı</router-link>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <!-- Bağışçılar Menüsü -->
            <li class="nav-item dropdown me-2">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Gönüllü Bağışçılar</a>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" to="/">Bağışçı Listesi</router-link></li>
                <li><router-link class="dropdown-item" to="/ekle">Yeni Bağışçı Ekle</router-link></li>
              </ul>
            </li>
            
            <!-- Bağış Bekleyenler Menüsü -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Kan Bekleyenler</a>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" to="/ihtiyac-listesi">İhtiyaç Listesi (Eşleşme)</router-link></li>
                <li><router-link class="dropdown-item" to="/ihtiyac-ekle">Kan İhtiyacı Ekle</router-link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="container mt-5">
      <router-view />
    </main>
  </div>
</template>

<style>
body {
  background-color: #f8f9fa;
}
</style>
