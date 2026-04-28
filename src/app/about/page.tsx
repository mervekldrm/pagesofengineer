import styles from './page.module.css'
export const metadata = { title: 'Hakkımda — Pages of Engineer' }

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className="container-narrow">
        <div className={styles.header}>
          <div className={styles.avatar}>👩‍💻</div>
          <div>
            <h1>Merhaba, ben Merve 👋</h1>
            <p className={styles.tagline}>Kodla yaz, kalemle çiz, kelimelerle anlat.</p>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.card}>
            <h2>Kim miyim?</h2>
            <p>
              Merhaba, ben Merve.
              <br />
              Aklımdakileri, öğrendiklerimi ve bazen sadece merak ettiklerimi paylaştığım kişisel alanıma hoş geldin.
              <br />
              <br />
              Burası benim için bir portfolyodan çok daha fazlası. Bir mühendis olma yolculuğumda attığım adımları,
              düşündüklerimi ve keşfettiklerimi açık, sade ve samimi bir şekilde bir araya getirdiğim dijital günlüğüm.
              <br />
              <br />
              Bu sayfada seni üç şey karşılayacak:
              <br />
              <strong>Düşünce Notları</strong>: Bazen teknik bir ayrıntı, bazen de günlük hayattan küçük bir an.
              <br />
              <strong>Öğrenme Süreci</strong>: Üzerinde çalıştığım projeler, okuduklarım ve aklıma takılan sorular.
              <br />
              <strong>Mühendisliğin Ötesi</strong>: Çizimler, şiirler, doğa yürüyüşleri, müzik ve bana iyi gelen diğer küçük şeyler.
              <br />
              <br />
              Kısacası burada; teknik dünyadan da hayatın içinden de topladığım ne varsa, olduğu gibi paylaşacağım.
              Bu yolculuğa ortak olduğun için teşekkürler.
            </p>

          </div>


          <div className={`${styles.card} ${styles.contact}`}>
            <p>📬 Bir fikir, proje ya da sadece merhaba için</p>
            <a href="/contact" className="btn btn-primary">İletişime geç →</a>
          </div>
        </div>
      </div>
    </div>
  )
}
