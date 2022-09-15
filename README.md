# sistem-pelanggaran

> Website yang digunakan untuk melihat pelanggaran yang dilanggar oleh siswa

## Requirements

- Node.js v16+
- Mysql Server (contoh: xampp)

## Install

1. Menginstall dependencies yang diperlukan dengan cara

```shell
$ npm install
```

2. Mengatur file ".env" yang perlu diisi. Contohnya ada di .env.example

```
MYSQL_HOST= //  localhost
MYSQL_DB_NAME= // sistem_pelanggaran
MYSQL_USERNAME=
MYSQL_PASS=
MYSQL_PORT=3306
MYSQL_FORCE_REPLACE=false
MYSQL_ALTER=true
SESSION_SECRET=SECRET
EXPRESS_PORT=3001
```

3. Setelah semuanya sudah, maka run programnya dengan cara

```shell
$ npm start
```

## Kontribusi

Bebas, kalian bisa berkontribusi kapan saja.
