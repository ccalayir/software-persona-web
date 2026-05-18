<template>
  <div class="card shadow-sm mx-auto" style="max-width: 600px;">
    <div class="card-body">
      <h2 class="card-title text-primary mb-4 text-center">Bağışçı Bilgilerini Güncelle</h2>
      
      <form @submit.prevent="updateDonor">
        
        <div class="mb-3">
          <label class="form-label">Ad Soyad</label>
          <input type="text" class="form-control" v-model="form.fullName" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Kan Grubu</label>
          <select class="form-select" v-model="form.bloodType" required>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="0+">0+</option>
            <option value="0-">0-</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Telefon Numarası</label>
          <input type="tel" class="form-control" v-model="form.phone" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Bulunduğu Şehir</label>
          <input type="text" class="form-control" v-model="form.city" required>
        </div>

        <div class="d-grid gap-2 mt-4">
          <button type="submit" class="btn btn-primary btn-lg">Bilgileri Kaydet</button>
          <router-link to="/" class="btn btn-outline-secondary">İptal</router-link>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Donor } from '../Interfaces/Donor';

// useRoute: URL'deki bilgileri (bizim için id) almak için kullanılır
const route = useRoute();
const router = useRouter();

// URL'den gelen id parametresini alıyoruz
const donorId = route.params.id as string;

// Form datası
const form = ref({
  fullName: '',
  bloodType: '',
  phone: '',
  city: ''
});

// Sayfa açıldığında bu kişinin mevcut bilgilerini Local Storage'dan bulup forma dolduracağız
onMounted(() => {
  const storedData = localStorage.getItem('donors');
  if (storedData) {
    const donors: Donor[] = JSON.parse(storedData);
    // Dizideki bu id'ye sahip kişiyi bul
    const donorToEdit = donors.find(d => d.id === donorId);
    
    if (donorToEdit) {
      // Bilgileri forma aktar
      form.value.fullName = donorToEdit.fullName;
      form.value.bloodType = donorToEdit.bloodType;
      form.value.phone = donorToEdit.phone;
      form.value.city = donorToEdit.city;
    } else {
      // Eğer kişi bulunamazsa ana sayfaya at
      alert('Bağışçı bulunamadı!');
      router.push('/');
    }
  }
});

// Güncelleme işlemi
const updateDonor = () => {
  const storedData = localStorage.getItem('donors');
  if (storedData) {
    let donors: Donor[] = JSON.parse(storedData);
    
    // Bağışçının dizideki sırasını (index) bul
    const index = donors.findIndex(d => d.id === donorId);
    
    if (index !== -1) {
      // O sıradaki kişinin bilgilerini formdaki yeni bilgilerle değiştir
      donors[index] = {
        id: donorId, // ID değişmez
        fullName: form.value.fullName,
        bloodType: form.value.bloodType,
        phone: form.value.phone,
        city: form.value.city
      };
      
      // Güncel listeyi Local Storage'a kaydet
      localStorage.setItem('donors', JSON.stringify(donors));
      
      alert('Bağışçı bilgileri güncellendi!');
      router.push('/');
    }
  }
};
</script>