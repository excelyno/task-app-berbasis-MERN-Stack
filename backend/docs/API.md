tugas kita memuat dokumentasi API

authentication 
- post /api/auth/register
fungsi : mendaftarkan user baru
body : username, email, password

- post /api/auth/login
fungsi : masuk dan mendapatkan token (JWT)
body : email, password

- get /api/auth/me
fungsi : mendapatkan data user yang sedang login (butuh header authorization)

Boards (papan kerja)
- get /api/boards
fungsi : mengambil semua board milik user tersebut
response structure : array of objects (id, title, background color)

- post /api/boards
fungsi : membuat board baru 
body : tittle.

- get /api/boards/:id
fungsi : mengambil detail 1 board lengkap beserta lists dan cards di dalamnya(ini endpoint paling kompleks nanti karena butuh populate)

lists (kolom e.g., "To Do", "Doing", "Done")
- POST /api/lists
fungsi membuat list baru di dalam board tertentu
body : title, boardId

- PUT /api/lists/:id
fungsi : mengubah judul list
body : title

- Delete /api/lists/:id
fungsi : menghapus list (dan otomatis menghapus cards didalamnya)

cards (Tugas)
- POST /api/cards
fungsi : membuat kartu tugas baru di dalam list
body : title, listId, boardId

- PUT /api/cards/:id
fungsi : update kartu (ganti judul, deskripsi, atau memindahkan kartu ke list lain)
body : title (opsional), deskription(Opsional), listId (jika dipindah)


satu board memiliki banyak list 
satu list memiliki banyak card
satu user memiliki banyak board
