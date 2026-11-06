1. link Aplikasi FE: https://aplikasi-pengelolaan-barang-remote.vercel.app/
2. link video langkah-langkah menggunakan aplikasi: https://drive.google.com/drive/folders/1JOKYWT0kKj_ok9Zzu5iQ3YUoH5zhllOJ?usp=sharing
3. Tech Stack Yang Digunakan
  - Node.js v20.11.1
  - Next.js
4. Petunjuk Instalasi local
  - gunakan atau download Node.js v20.11.1
  - clone project FE: git clone https://github.com/aminsum9/aplikasi-pengelolaan-barang.git
  - masuk ke project FE lalu jalankan: pnpm install
  - setelah selesai jalankan: npm run dev
  - masuk ke browser ke url: http://localhost:3000/
5. Akun yang bisa dicoba:
  - jika di server remote: 
    - username: admin
    - password: password123
  - jika di server local bisa hit api untuk membuat akun dummy:
    POST http://localhost:5000/user/register

    request body:
    {
        "role": "admin",
        "username": "admin",
        "name": "Admin",
        "email": "admin@gmail.com",
        "password": "password123"
    }