<template>
  <!-- Formu ortalamak ve boyutunu kısıtlamak için biraz Bootstrap sınıfı ekledik -->
  <div class="card shadow-sm mx-auto" style="max-width: 600px;">
    <div class="card-body">
      <h2 class="card-title text-danger mb-4 text-center">Yeni Kan Bağışçısı Ekle</h2>
      
      <!-- @submit.prevent ile formun sayfayı yenilemesini engelliyoruz -->
      <form @submit.prevent="saveDonor">
        
        <!-- Ad Soyad -->
        <div class="mb-3">
          <label class="form-label">Ad Soyad</label>
          <!-- v-model ile input'u JavaScript'teki değişkenimize bağlıyoruz -->
          <input type="text" class="form-control" v-model="form.fullName" required placeholder="Örn: Ahmet Yılmaz">
        </div>

        <!-- Kan Grubu -->
        <div class="mb-3">
          <label class="form-label">Kan Grubu</label>
          <select class="form-select" v-model="form.bloodType" required>
            <option value="" disabled>Seçiniz...</option>
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

        <!-- Telefon -->
        <div class="mb-3">
          <label class="form-label">Telefon Numarası</label>
          <input type="tel" class="form-control" v-model="form.phone" required placeholder="Örn: 0555 555 5555">
        </div>

        <!-- Şehir -->
        <div class="mb-3">
          <label class="form-label">Bulunduğu Şehir</label>
          <input type="text" class="form-control" v-model="form.city" required placeholder="Örn: İstanbul">
        </div>

        <!-- Kaydet Butonu -->
        <div class="d-grid gap-2 mt-4">
          <button type="submit" class="btn btn-danger btn-lg">Bağışçı Ekle</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// Oluşturduğumuz Interface'i çağırıyoruz
import type { Donor } from '../Interfaces/Donor';

// Sayfalar arası yönlendirme yapabilmek için router'ı tanımlıyoruz
const router = useRouter();

// Formdaki verileri tutacağımız reaktif nesne (v-model ile inputlara bağlı)
const form = ref({
  fullName: '',
  bloodType: '',
  phone: '',
  city: ''
});

// Kaydet butonuna basıldığında çalışacak fonksiyon
const saveDonor = () => {
  // 1. Mevcut bağışçıları Local Storage'dan al (Eğer boşsa boş dizi [] olarak başlat)
  const existingDonorsJSON = localStorage.getItem('donors');
  const donors: Donor[] = existingDonorsJSON ? JSON.parse(existingDonorsJSON) : [];

  // 2. Yeni bağışçı nesnesini oluştur
  const newDonor: Donor = {
    // crypto.randomUUID() ile silme ve güncelleme için eşsiz bir ID oluşturuyoruz
    id: crypto.randomUUID(), 
    fullName: form.value.fullName,
    bloodType: form.value.bloodType,
    phone: form.value.phone,
    city: form.value.city
  };

  // 3. Yeni bağışçıyı mevcut listeye (diziye) ekle
  donors.push(newDonor);

  // 4. Güncel listeyi tekrar metne çevirip Local Storage'a kaydet
  localStorage.setItem('donors', JSON.stringify(donors));

  // 5. İşlem bitince kullanıcıya bilgi ver ve ana sayfaya yönlendir
  alert('Bağışçı başarıyla eklendi!');
  router.push('/');
};
</script>