# Huong dan setup domain tren Cloudflare cho du an nay

## 1. Du an nay dang chay theo kieu nao

Du an trong thu muc `app` dang la mot SSR app chay tren **Cloudflare Workers**:

- `wrangler.jsonc` dung `main: "dist/server/server.js"` va `assets.directory: "./dist/client"`.
- `src/router.tsx` dat `basepath` bang `SITE_BASE_PATH`.
- `src/lib/site.ts` dang khoa:
  - `SITE_ORIGIN = "https://www.sadu.com.vn"`
  - `SITE_ALTERNATE_ORIGINS = ["https://sadufarms.vn"]`
  - `SITE_BASE_PATH = "/sadu-store-official"`

Dieu nay co nghia la app hien tai dang duoc viet de mo tai:

- `https://www.sadu.com.vn/sadu-store-official`

khong phai tai root `/`.

## 2. Phuong an phu hop nhat cho du an nay

### Khuyen nghi

Dung **Custom Domain** cua Cloudflare Workers cho **mot subdomain rieng**, vi du:

- `store.sadu.com.vn`
- `shop.sadu.com.vn`

Day la cach hop voi du an nay nhat neu day la mot landing page/store doc lap.

Ly do:

- Cloudflare Workers khuyen dung **Custom Domains** khi Worker la origin cua ung dung.
- Custom Domain cua Worker se **chiem toan bo hostname** do.
- Neu gan truc tiep vao `www.sadu.com.vn`, Worker co the chiem toan bo `www`, khong con phu hop neu `www` dang dung cho web khac.

## 3. Khi nao khong nen dung Custom Domain tren `www.sadu.com.vn`

Khong nen gan Custom Domain vao `www.sadu.com.vn` neu:

- `www.sadu.com.vn` dang tro toi website chinh hien tai.
- Ban chi muon app nay nam o subpath `/sadu-store-official`.

Trong truong hop do, co 2 lua chon:

1. Giu nguyen app o subpath `/sadu-store-official`, dung **Worker Route**.
2. Tach app ra hostname rieng nhu `store.sadu.com.vn`, roi sua code de chay tai root `/`.

## 4. Lua chon nen dung

### Lua chon A - Nen dung nhat

Dung `store.sadu.com.vn` hoac `shop.sadu.com.vn` lam domain rieng cho app, va cho app chay ngay tai root:

- `https://store.sadu.com.vn/`

Lua chon nay sach, de SEO, de do luong, de quang cao, va khong va cham voi website chinh.

### Lua chon B - Giu nguyen code hien tai

Neu ban chua muon sua code, giu app tai:

- `https://www.sadu.com.vn/sadu-store-official`

Khi do phai dung **Worker Route**, khong phai Custom Domain cho ca `www`.

## 5. Cach setup theo Lua chon A (khuyen nghi)

### Muc tieu

Gan Worker vao:

- `store.sadu.com.vn`

va doi app thanh chay tai root `/`.

### Buoc 1 - Deploy Worker len Cloudflare

Ban can deploy app len Cloudflare Workers truoc, de Worker xuat hien trong `Workers & Pages`.

Luu y:

- Trong repo nay, comment trong `wrangler.jsonc` noi ro file nay chu yeu dung cho local build/dev.
- Nghia la domain production nen duoc gan trong **Cloudflare dashboard** hoac trong **deploy pipeline that su**, khong nen chi sua local `wrangler.jsonc` roi ky vong production tu doi.

### Buoc 2 - Gan Custom Domain trong Cloudflare

Trong Cloudflare Dashboard:

1. Vao `Workers & Pages`.
2. Chon Worker cua app nay.
3. Vao `Settings`.
4. Vao `Domains & Routes`.
5. Chon `Add`.
6. Chon `Custom Domain`.
7. Nhap `store.sadu.com.vn`.
8. Xac nhan them domain.

Cloudflare se tu:

- tao DNS record,
- cap certificate,
- tro hostname do thang vao Worker.

### Buoc 3 - Sua code de bo subpath

Neu dung `store.sadu.com.vn` lam hostname rieng, app nen chay o root `/`, khong nen giu `/sadu-store-official`.

Can sua toi thieu trong `src/lib/site.ts`:

- doi `SITE_ORIGIN` thanh `https://store.sadu.com.vn`
- bo hoac cap nhat `SITE_ALTERNATE_ORIGINS`
- doi `SITE_BASE_PATH` tu `"/sadu-store-official"` thanh `"/"` hoac refactor helper de khong con base path

Luu y quan trong:

- Code hien tai duoc viet voi gia dinh co subpath.
- Neu set truc tiep `SITE_BASE_PATH = "/"` ma khong chinh helper can than, co the sinh URL co dau `//`.
- Nen test lai cac cho dung `withBasePath()`, `assetUrl()`, canonical URL, Open Graph URL, sitemap va robots.

### Buoc 4 - Redirect domain cu neu can

Neu ban muon nguoi dung tu:

- `https://www.sadu.com.vn/sadu-store-official`

tu dong sang:

- `https://store.sadu.com.vn/`

thi tao redirect rule trong Cloudflare.

### Buoc 5 - SSL/TLS va HTTPS

Bat:

- `Always Use HTTPS`

Neu ban chi dung Worker lam origin cho hostname moi, Cloudflare se quan ly certificate edge cho hostname do.

## 6. Cach setup theo Lua chon B (giu nguyen code, it sua nhat)

### Muc tieu

Giu app tai:

- `https://www.sadu.com.vn/sadu-store-official`

### Khi nao dung cach nay

Dung cach nay neu:

- `www.sadu.com.vn` dang la website chinh,
- ban khong muon app chiem toan bo `www`,
- ban muon app chi la mot muc con trong web chinh.

### Cach setup

1. Dam bao `www.sadu.com.vn` dang la record proxied trong Cloudflare.
2. Trong `Workers & Pages`, chon Worker cua app.
3. Vao `Settings` > `Domains & Routes`.
4. Them **Route** co pattern:
   - `www.sadu.com.vn/sadu-store-official*`

Luu y:

- Route chi phu hop khi co **origin hien huu** dang dung cho hostname do.
- Cac request khong match route se di ve origin cu.
- Cach nay hop neu `www` dang co website chinh va Worker chi chen vao 1 nhanh path.

### SSL/TLS cho Lua chon B

Vi luc nay Cloudflare van dung mot origin hien huu cho `www.sadu.com.vn`, nen:

- uu tien `Full` hoac `Full (strict)`,
- bat `Always Use HTTPS`.

## 7. Canh bao quan trong khi gan Custom Domain

Cloudflare tai lieu hien tai luu y:

- Custom Domain khong dung wildcard host.
- Request phai match dung hostname da dang ky.
- Ban **khong the** tao Custom Domain tren mot hostname dang co **CNAME record hien huu**.

Vi vay:

- neu `www.sadu.com.vn` dang co CNAME toi noi khac, gan Custom Domain tren `www` se va cham.
- subdomain moi nhu `store.sadu.com.vn` thuong de setup hon.

## 8. Khuyen nghi cu the cho repo nay

Neu muc tieu la dua landing page/store nay len online gon gang va it rui ro, minh khuyen:

1. Dung `store.sadu.com.vn`.
2. Gan hostname do bang **Worker Custom Domain**.
3. Chinh app de chay o root `/`.
4. Tao redirect tu URL cu `/sadu-store-official` sang domain moi neu can.

Neu ban muon **khong sua code nhieu ngay luc nay**, tam thoi dung:

1. Route `www.sadu.com.vn/sadu-store-official*`.
2. Giu nguyen `SITE_BASE_PATH`.
3. Sau do moi refactor sang `store.sadu.com.vn`.

## 9. Tai lieu Cloudflare da doi chieu

- Workers Custom Domains: Cloudflare cho biet Custom Domain tro ca hostname vao Worker, tu tao DNS va certificate.
- Workers Routes vs Custom Domains: Cloudflare khuyen Custom Domain khi Worker la origin; Route khi Worker dung truoc mot origin co san.
- DNS zone apex: Cloudflare ho tro CNAME flattening tai root domain.
- SSL/TLS: Cloudflare khuyen `Full` hoac `Full (strict)` khi co origin.
- Always Use HTTPS: nen bat de ep HTTP sang HTTPS.

## 10. Ket luan ngan

Voi code hien tai, domain setup phu hop nhat la:

- **Tot nhat:** `store.sadu.com.vn` + Worker Custom Domain + bo `SITE_BASE_PATH`
- **Nhanh nhat, it sua code:** `www.sadu.com.vn/sadu-store-official*` + Worker Route
