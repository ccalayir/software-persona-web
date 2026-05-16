// src/Interfaces/Receiver.ts
export interface Receiver {
  id: string;
  patientName: string; // Hasta Adı Soyadı
  bloodType: string;   // İhtiyaç Duyulan Kan Grubu
  hospital: string;    // Yattığı Hastane
  city: string;        // Hastanenin Bulunduğu Şehir
  phone: string;       // İletişim Numarası (Hasta yakını)
  urgency: string;     // Aciliyet Durumu (Örn: Çok Acil, Normal)
}