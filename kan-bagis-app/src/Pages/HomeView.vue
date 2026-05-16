<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <!-- Başlık ve Ekle Butonu yan yana -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="card-title text-danger m-0">Kan Bağışçısı Listesi</h2>
        <router-link to="/ekle" class="btn btn-danger">Yeni Ekle</router-link>
      </div>

      <!-- Eğer listede hiç eleman yoksa (v-if) -->
      <div v-if="donors.length === 0" class="alert alert-secondary text-center">
        Henüz kayıtlı bir kan bağışçısı bulunmamaktadır.
      </div>

      <!-- Eğer bağışçı varsa tabloyu göster (v-else) -->
      <div class="table-responsive" v-else>
        <table class="table table-hover align-middle">
          <thead class="table-danger">
            <tr>
              <th>Ad Soyad</th>
              <th>Kan Grubu</th>
              <th>Telefon</th>
              <th>Şehir</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <!-- v-for ile döngü kurup bağışçıları tabloya basıyoruz -->
            <tr v-for="donor in donors" :key="donor.id">
              <td>{{ donor.fullName }}</td>
              <td>
                <span class="badge bg-danger fs-6">{{ donor.bloodType }}</span>
              </td>
              <td>{{ donor.phone }}</td>
              <td>{{ donor.city }}</td>
              <td>
                <!-- Güncelle ve Sil Butonları -->
                <button class="btn btn-sm btn-primary me-2" @click="editDonor(donor.id)">Düzenle</button>
                <button class="btn btn-sm btn-outline-danger" @click="deleteDonor(donor.id)">Sil</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { Donor } from '../Interfaces/Donor';

const router = useRouter();

// Bağışçıları tutacağımız dizi
const donors = ref<Donor[]>([]);

// Sayfa yüklendiğinde çalışacak fonksiyon (Read - Listeleme)
const loadDonors = () => {
  const storedData = localStorage.getItem('donors');
  if (storedData) {
    donors.value = JSON.parse(storedData); // Metni JSON dizisine çeviriyoruz
  }
};

// onMounted: Vue'da sayfa/bileşen ekrana geldiği anda içindeki kodları çalıştırır
onMounted(() => {
  loadDonors();
});

// Silme İşlemi (Delete)
const deleteDonor = (id: string) => {
  // Kullanıcıya emin olup olmadığını soruyoruz
  if (confirm('Bu bağışçıyı silmek istediğinize emin misiniz?')) {
    // Silinmek istenen ID hariç diğerlerini filtreleyip yeni listeyi oluşturuyoruz
    donors.value = donors.value.filter(donor => donor.id !== id);
    
    // Güncel listeyi tekrar Local Storage'a kaydediyoruz
    localStorage.setItem('donors', JSON.stringify(donors.value));
  }
};

// Güncelleme İşlemi (Şimdilik sadece uyarı veriyor, bir sonraki adımda yapacağız)
const editDonor = (id: string) => {
  router.push(`/duzenle/${id}`);
};
</script>