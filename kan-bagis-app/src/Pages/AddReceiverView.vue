<template>
  <div class="card shadow-sm mx-auto" style="max-width: 600px;">
    <div class="card-body">
      <h2 class="card-title text-danger mb-4 text-center">Acil Kan İhtiyacı Oluştur</h2>
      
      <form @submit.prevent="saveReceiver">
        <div class="mb-3">
          <label class="form-label">Hasta Adı Soyadı</label>
          <input type="text" class="form-control" v-model="form.patientName" required placeholder="Örn: Ayşe Yılmaz">
        </div>

        <div class="mb-3">
          <label class="form-label">İhtiyaç Duyulan Kan Grubu</label>
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

        <div class="mb-3">
          <label class="form-label">Yattığı Hastane</label>
          <input type="text" class="form-control" v-model="form.hospital" required placeholder="Örn: Şişli Etfal Hastanesi">
        </div>

        <div class="mb-3">
          <label class="form-label">Bulunduğu Şehir</label>
          <input type="text" class="form-control" v-model="form.city" required placeholder="Örn: İstanbul">
        </div>

        <div class="mb-3">
          <label class="form-label">İletişim Numarası</label>
          <input type="tel" class="form-control" v-model="form.phone" required placeholder="Örn: 0555 555 5555">
        </div>

        <div class="mb-3">
          <label class="form-label">Aciliyet Durumu</label>
          <select class="form-select" v-model="form.urgency" required>
            <option value="Çok Acil">Çok Acil</option>
            <option value="Acil">Acil</option>
            <option value="Normal">Normal</option>
          </select>
        </div>

        <div class="d-grid gap-2 mt-4">
          <button type="submit" class="btn btn-danger btn-lg">İhtiyaç Kaydı Oluştur</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Receiver } from '../Interfaces/Receiver';

const router = useRouter();

const form = ref({
  patientName: '',
  bloodType: '',
  hospital: '',
  city: '',
  phone: '',
  urgency: 'Acil' // Varsayılan değer
});

const saveReceiver = () => {
  // Local Storage'dan mevcut bekleyenleri al
  const existingData = localStorage.getItem('receivers');
  const receivers: Receiver[] = existingData ? JSON.parse(existingData) : [];

  const newReceiver: Receiver = {
    id: crypto.randomUUID(),
    patientName: form.value.patientName,
    bloodType: form.value.bloodType,
    hospital: form.value.hospital,
    city: form.value.city,
    phone: form.value.phone,
    urgency: form.value.urgency
  };

  receivers.push(newReceiver);
  localStorage.setItem('receivers', JSON.stringify(receivers));

  alert('Kan ihtiyacı başarıyla sisteme eklendi!');
  router.push('/ihtiyac-listesi'); // Kayıttan sonra listeye yönlendir
};
</script>