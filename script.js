// ===================================================================
// BÖLÜM 1: ZAMAN ÇİZELGESİ (TIMELINE) GÖRÜNÜRLÜK KODU
// Bu fonksiyon HTML'deki onclick ile çağrıldığı için global kalmalıdır.
// ===================================================================
function showTimeline(type) {
    // Tüm zaman çizelgesi elemanlarından aktif sınıfını kaldır
    document.querySelectorAll('.timeline').forEach(t => t.classList.remove('active'));
    // İstenen zaman çizelgesi elemanına aktif sınıfını ekle
    document.querySelector(`#${type}`).classList.add('active');

    // Tüm sekme (tab) butonlarından aktif sınıfını kaldır
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    // İstenen sekme butonuna aktif sınıfını ekle
    document.querySelector(`#${type}Btn`).classList.add('active');
}

// ===================================================================
// BÖLÜM 2: SAYFA YÜKLENİNCE ÇALIŞACAK KODLAR (DİL DEĞİŞTİRME VE İLK TIMELINE AYARI)
// Tüm DOM öğelerinin yüklendiğinden emin olmak için kullanılır.
// ===================================================================
document.addEventListener("DOMContentLoaded", function() {
    // 1. Sayfa yüklendiğinde "Academic" zaman çizelgesini aktif et
    showTimeline('academic');

    // ---------------------------------------------------------------
    // 2. ÇOKLU DİL DEĞİŞTİRME KODU BAŞLANGIÇ
    // ---------------------------------------------------------------
    const toggleButton = document.getElementById('lang-toggle');
    const langItems = document.querySelectorAll('.lang-item');
    const placeholderInputs = document.querySelectorAll('[data-en-placeholder]');

    // Dil butonu veya çevrilebilir öğe yoksa dil kodunu çalıştırma
    if (!toggleButton || langItems.length === 0) {
        // Hata mesajını üretimde (production) gizleyebilirsiniz.
        // console.warn("Dil değiştirme mekanizması başlatılamadı: Gerekli HTML öğeleri eksik.");
        return;
    }

    /**
     * Sayfanın dilini ayarlar ve içeriği günceller.
     * @param {string} newLang - Yeni dil kodu ('en' veya 'tr').
     */
    const setLanguage = (newLang) => {
        const oppositeLang = newLang === 'en' ? 'tr' : 'en';

        // a) Metin içeriklerini güncelle
        langItems.forEach(item => {
            const text = item.getAttribute(`data-${newLang}`);
            if (text) {
                // Not: Eğer metin içinde <strong> gibi HTML etiketleri varsa,
                // textContent yerine innerHTML kullanmanız gerekebilir. 
                // Örnekte <strong> olduğu için innerHTML kullanıyorum:
                item.innerHTML = text; 
            }
        });

        // b) Placeholder'ları güncelle
        placeholderInputs.forEach(input => {
            const placeholderText = input.getAttribute(`data-${newLang}-placeholder`);
            if (placeholderText) {
                input.setAttribute('placeholder', placeholderText);
            }
        });

        // c) Butonun durumunu ve metnini güncelle
        toggleButton.setAttribute('data-current-lang', newLang);
        toggleButton.textContent = newLang === 'en' ? 'Turkısh' : 'English';
    };

    // Butona tıklandığında dili değiştir
    toggleButton.addEventListener('click', () => {
        const currentLang = toggleButton.getAttribute('data-current-lang');
        const newLang = currentLang === 'en' ? 'tr' : 'en';
        setLanguage(newLang);
    });

    // Sayfa yüklendiğinde dil ayarını yap (varsayılanı başlat)
    const initialLang = toggleButton.getAttribute('data-current-lang') || 'en';
    setLanguage(initialLang);
    // ---------------------------------------------------------------
    // ÇOKLU DİL DEĞİŞTİRME KODU BİTİŞ
    // ---------------------------------------------------------------
});