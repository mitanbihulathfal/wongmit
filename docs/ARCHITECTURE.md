# ARCHITECTURE

## Backend

Code.js

Semua logika Apps Script berada pada file ini.

Jangan melakukan refactor besar tanpa izin.

---

## Frontend

index.html

Sebagai shell aplikasi SPA.

Semua page dimuat melalui:

getPage()

↓

loadPage()

---

## Routing

Login

↓

Dashboard

↓

Menu

↓

Page HTML

---

## Prinsip

- Jangan mengubah arsitektur tanpa izin.

- Jangan memindahkan fungsi antar file.

- Jangan mengubah flow SPA.

- Pertahankan kompatibilitas dengan Apps Script.