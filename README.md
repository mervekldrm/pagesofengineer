# personal_website

## Kalıcı veri saklama

Bu proje blog ve proje içeriklerini Supabase üzerinde saklar. Deploy sonrası verinin kaybolmaması için aşağıdaki environment değişkenlerini ekleyin:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_USERNAME=merve
ADMIN_PASSWORD=change-me
JWT_SECRET=replace-with-a-long-random-secret
```

Supabase SQL şeması [supabase/schema.sql](supabase/schema.sql) dosyasında.

İlk kurulumda bu dosyayı Supabase SQL Editor'de çalıştırın.

## Yerel geliştirme

```bash
npm install
npm run dev
```