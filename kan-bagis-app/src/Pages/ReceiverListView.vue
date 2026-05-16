<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="card-title text-danger m-0">Kan İhtiyaç Listesi</h2>
        <router-link to="/ihtiyac-ekle" class="btn btn-danger">Yeni İhtiyaç Ekle</router-link>
      </div>

      <div v-if="receivers.length === 0" class="alert alert-secondary text-center">
        Şu an sisteme kayıtlı kan bekleyen hasta bulunmamaktadır.
      </div>

      <div class="table-responsive" v-else>
        <table class="table table-hover align-middle">
          <thead class="table-danger">
            <tr>
              <th>Aciliyet</th>
              <th>Hasta Adı</th>
              <th>Kan Grubu</th>
              <th>Hastane & Şehir</th>
              <th>İletişim</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="receiver in receivers" :key="receiver.id">
              <td>
                <!-- Aciliyet durumuna göre rozet rengi -->
                <span class="badge" 
                      :class="receiver.urgency === 'Çok Acil' ? 'bg-danger' : (receiver.urgency === 'Acil' ? 'bg-warning text-dark' : 'bg-info text-dark')">
                  {{ receiver.urgency }}
                </span>
              </td>
              <td class="fw-bold">{{ receiver.patientName }}</td>
              <td><span class="badge bg-danger fs-6">{{ receiver.bloodType }}</span></td>
              <td>{{ receiver.hospital }} <br> <small class="text-muted">{{ receiver.city }}</small></td>
              <td>{{ receiver.phone }}</td>
              <td>
                <!-- SİHİRLİ BUTON: Eşleşme Bul -->
                <button class="btn btn-sm btn-success me-2" @click="findMatches(receiver)">
                  Uygun Bağışçı Bul
                </button>
                <button class="btn btn-sm btn-outline-danger" @click="deleteReceiver(receiver.id)">Sil</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- EŞLEŞEN BAĞIŞÇILAR İÇİN ÖZEL PENCERE (MODAL) -->
  <div v-if="selectedReceiver" class="modal d-block" style="background: rgba(0,0,0,0.5);">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-success text-white">
          <h5 class="modal-title">
            {{ selectedReceiver.patientName }} İçin Uygun Bağışçılar ({{ selectedReceiver.bloodType }})
          </h5>
          <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <div v-if="matchedDonors.length === 0" class="alert alert-warning">
            Maalesef sistemde {{ selectedReceiver.bloodType }} kan grubuna sahip uygun bağışçı bulunamadı.
          </div>
          
          <div class="table-responsive" v-else>
            <table class="table table-sm">
              <thead>
                <tr>
                  <th>Bağışçı Adı</th>
                  <th>Şehir</th>
                  <th>Telefon</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="donor in matchedDonors" :key="donor.id" 
                    :class="{'table-success': donor.city.toLowerCase() === selectedReceiver.city.toLowerCase()}">
                  <td>{{ donor.fullName }}</td>
                  <td>{{ donor.city }}</td>
                  <td>{{ donor.phone }}</td>
                  <td>
                    <!-- Hasta ve Bağışçı aynı şehirdeyse Vurgula -->
                    <span v-if="donor.city.toLowerCase() === selectedReceiver.city.toLowerCase()" class="badge bg-success">Aynı Şehir!</span>
                    <span v-else class="badge bg-secondary">Farklı Şehir</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Kapat</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Receiver } from '../Interfaces/Receiver';
import type { Donor } from '../Interfaces/Donor';

const receivers = ref<Receiver[]>([]);
const allDonors = ref<Donor[]>([]);

// Eşleşme ekranı için reaktif değişkenler
const selectedReceiver = ref<Receiver | null>(null);
const matchedDonors = ref<Donor[]>([]);

onMounted(() => {
  // Hastaları Local Storage'dan çek
  const storedReceivers = localStorage.getItem('receivers');
  if (storedReceivers) receivers.value = JSON.parse(storedReceivers);

  // Eşleştirme için Gönüllü Bağışçıları da Local Storage'dan çek
  const storedDonors = localStorage.getItem('donors');
  if (storedDonors) allDonors.value = JSON.parse(storedDonors);
});

// Hastayı silme fonksiyonu
const deleteReceiver = (id: string) => {
  if (confirm('Bu kaydı silmek istediğinize emin misiniz?')) {
    receivers.value = receivers.value.filter(r => r.id !== id);
    localStorage.setItem('receivers', JSON.stringify(receivers.value));
  }
};

// EŞLEŞTİRME FONKSİYONU
const findMatches = (receiver: Receiver) => {
  selectedReceiver.value = receiver;
  
  // Hastanın kan grubuna uyan bağışçıları filtrele
  let matches = allDonors.value.filter(donor => donor.bloodType === receiver.bloodType);
  
  // Eşleşenleri şehre göre sırala (Aynı şehirde olanlar en üstte görünsün)
  matches.sort((a, b) => {
    const isCityA = a.city.toLowerCase() === receiver.city.toLowerCase();
    const isCityB = b.city.toLowerCase() === receiver.city.toLowerCase();
    return (isCityA === isCityB) ? 0 : isCityA ? -1 : 1;
  });

  matchedDonors.value = matches;
};

// Pencereyi kapatma fonksiyonu
const closeModal = () => {
  selectedReceiver.value = null;
  matchedDonors.value = [];
};
</script>