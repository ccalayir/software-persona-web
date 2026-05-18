// src/Interfaces/Donor.ts
export interface Donor {
  id: string;          // Düzenleme/Silme işlemleri için eşsiz ID
  fullName: string;    // Ad Soyad
  bloodType: string;   // Kan Grubu
  phone: string;       // İletişim Numarası
  city: string;        // Bulunduğu Şehir
}