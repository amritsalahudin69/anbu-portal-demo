import { useEffect, useMemo, useState } from 'react'

const initialForm = {
  nama: '',
  namaKode: '',
  usia: '',
  domisili: '',
  spesialisasi: '',
  motivasi: '',
  loyalitas: 'Mutlak',
  kontak: '',
}

const infoCards = [
  {
    id: 'syarat',
    label: 'Syarat Pendaftaran',
    kicker: 'Gerbang Awal',
    title: 'Kriteria calon anggota bayangan',
    summary:
      'Interpretasi FE dari panel kiri poster: loyal, sehat, disiplin, memiliki dasar kemampuan tempur, dan sanggup bekerja tanpa sorotan.',
    details: [
      'Warga desa resmi dan setia kepada negara.',
      'Usia minimal 16 tahun.',
      'Sehat jasmani, rohani, dan tidak memiliki catatan kriminal.',
      'Menguasai dasar ninjutsu, taijutsu, atau genjutsu.',
      'Bersedia mengabdi dalam kerahasiaan total.',
      'Siap mengorbankan segalanya demi misi.',
    ],
  },
  {
    id: 'berkas',
    label: 'Berkas Pendaftaran',
    kicker: 'Verifikasi Awal',
    title: 'Dokumen dummy yang ditampilkan ke calon pendaftar',
    summary:
      'Seluruh isi hanya simulasi UI. Tidak ada upload sungguhan, tidak ada penyimpanan server, dan tidak ada integrasi database.',
    details: [
      'Surat lamaran tangan sendiri (tanpa meterai).',
      'Fotokopi identitas diri (tanpa embel-embel).',
      'Rekomendasi dari jonin minimal 1 orang.',
      'Riwayat misi dan catatan akademi.',
      'Surat pernyataan kesetiaan dan kerahasiaan.',
    ],
  },
  {
    id: 'seleksi',
    label: 'Tahap Seleksi',
    kicker: 'Filter Ketat',
    title: 'Enam lapis seleksi ala poster utama',
    summary:
      'Disusun sedekat mungkin dengan ritme visual poster: administratif, fisik, mental, mistis, loyalitas, dan orientasi.',
    details: [
      'Seleksi administrasi: verifikasi data dan latar belakang.',
      'Ujian fisik & chakra: ketahanan tubuh, kontrol chakra, dan refleks.',
      'Ujian mental: keteguhan hati, kontrol emosi, dan loyalitas.',
      'Ujian mistis: kepekaan energi ritual dan genjutsu.',
      'Ujian loyalitas: pengabdian tanpa syarat hingga akhir.',
      'Orientasi ANBU: pembekalan rahasia dan pengucapan janji.',
    ],
  },
  {
    id: 'peringatan',
    label: 'Peringatan',
    kicker: 'Konsekuensi',
    title: 'Semua jalan kembali ditutup',
    summary:
      'Nada panel kanan bawah poster diterjemahkan menjadi area warning yang keras, singkat, dan sangat kontras.',
    details: [
      'Kegagalan pada salah satu tahap dapat menggugurkan proses.',
      'Portal ini hanya demo visual untuk presentasi FE.',
      'Semua tombol hanya memunculkan modal, tanpa link keluar.',
      'Data yang Anda isi hanya hidup di browser selama sesi berjalan.',
    ],
  },
]

const posterHighlights = [
  'Dominan gelap, abu arang, merah darah, dan krem kusam.',
  'Tipografi utama besar, kasar, dan seperti sapuan kuas.',
  'Panel informasi terasa seperti papan pengumuman rahasia.',
  'Nuansa ritual, asap, lilin, torii, dan topeng rubah dijaga sebagai mood utama.',
]

function Modal({ open, title, subtitle, children, onClose, wide = false }) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`modal-shell ${wide ? 'modal-shell--wide' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <p className="modal-kicker">ANBU INTERNAL PANEL</p>
            <h3>{title}</h3>
            {subtitle ? <p className="modal-subtitle">{subtitle}</p> : null}
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Tutup modal">
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

function InfoModalContent({ card }) {
  return (
    <div className="info-modal-content">
      <div className="info-summary-box">
        <span className="pill">{card.kicker}</span>
        <p>{card.summary}</p>
      </div>
      <div className="bullet-panel">
        {card.details.map((item) => (
          <div key={item} className="bullet-row">
            <span>✦</span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SubmissionModalContent({ data }) {
  const rows = useMemo(
    () => [
      ['Nama', data.nama],
      ['Nama Kode', data.namaKode],
      ['Usia', data.usia],
      ['Domisili', data.domisili],
      ['Spesialisasi', data.spesialisasi],
      ['Motivasi', data.motivasi],
      ['Loyalitas', data.loyalitas],
      ['Kontak Rahasia', data.kontak],
    ],
    [data],
  )

  return (
    <div className="submission-recap">
      <div className="success-banner">
        <span className="success-dot" />
        <div>
          <strong>Pendaftaran dummy berhasil diproses</strong>
          <p>
            Kandidat <b>{data.nama || '-'}</b> telah tercatat pada sisi antarmuka demo ini. Tidak ada pengiriman ke backend.
          </p>
        </div>
      </div>

      <div className="recap-grid">
        {rows.map(([label, value]) => (
          <div key={label} className="recap-item">
            <span>{label}</span>
            <strong>{value || '-'}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [activeInfo, setActiveInfo] = useState(null)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isSubmitOpen, setIsSubmitOpen] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [submittedData, setSubmittedData] = useState(initialForm)

  const openInfo = (card) => setActiveInfo(card)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmittedData(form)
    setIsRegisterOpen(false)
    setIsSubmitOpen(true)
  }

  const topMenus = [
    { key: 'syarat', text: 'Syarat', action: () => openInfo(infoCards[0]) },
    { key: 'berkas', text: 'Berkas', action: () => openInfo(infoCards[1]) },
    { key: 'seleksi', text: 'Seleksi', action: () => openInfo(infoCards[2]) },
    { key: 'peringatan', text: 'Peringatan', action: () => openInfo(infoCards[3]) },
    { key: 'daftar', text: 'Daftar Sekarang', action: () => setIsRegisterOpen(true), primary: true },
  ]

  return (
    <div className="app-shell">
      <div className="noise" />

      <header className="topbar">
        <div className="brand-mark">
          <div className="brand-mark__symbol">暗</div>
          <div>
            <p className="eyebrow">ROOT OF SHINOBI VILLAGE</p>
            <h1>ANBU Portal</h1>
          </div>
        </div>

        <nav className="top-actions">
          {topMenus.map((menu) => (
            <button
              key={menu.key}
              type="button"
              className={menu.primary ? 'nav-btn nav-btn--primary' : 'nav-btn'}
              onClick={menu.action}
            >
              {menu.text}
            </button>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow eyebrow--red">PENERIMAAN ANGGOTA KHUSUS</p>
            <h2>ANBU</h2>
            <p className="hero-subtitle">Portal informasi pendaftaran iseng dengan treatment visual yang dipaksa sedekat mungkin ke poster referensi.</p>
            <p className="hero-note">
              Di balik bayangan, kami ada. Di luar cahaya, kami bekerja. Semua interaksi pada demo ini bersifat dummy, termasuk formulir, validasi, dan rekap hasil.
            </p>

            <div className="cta-group">
              <button type="button" className="cta-btn cta-btn--primary" onClick={() => setIsRegisterOpen(true)}>
                Apply Now
              </button>
              <button type="button" className="cta-btn" onClick={() => openInfo(infoCards[2])}>
                Lihat Tahap Seleksi
              </button>
            </div>

            <div className="poster-notes-card">
              <div className="section-title-row">
                <span className="section-title-mark" />
                <h3>Turunan detail dari konsep gambar</h3>
              </div>
              <div className="highlight-list">
                {posterHighlights.map((item) => (
                  <div key={item} className="highlight-item">
                    <span>✦</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-visual-frame">
            <div className="hero-circle" />
            <img src="/anbu-poster.png" alt="Poster rekrutmen ANBU sebagai referensi konsep visual" className="hero-poster" />
            <div className="floating-stamp">SHADOW CLEARANCE</div>
          </div>
        </section>

        <section className="info-grid">
          {infoCards.map((card) => (
            <article key={card.id} className="info-card">
              <div className="section-title-row">
                <span className="section-title-mark" />
                <div>
                  <p className="mini-kicker">{card.kicker}</p>
                  <h3>{card.label}</h3>
                </div>
              </div>
              <p className="info-title">{card.title}</p>
              <p className="info-summary">{card.summary}</p>
              <button type="button" className="panel-btn" onClick={() => openInfo(card)}>
                Buka Detail Modal
              </button>
            </article>
          ))}
        </section>

        <section className="split-layout">
          <div className="quote-panel">
            <span className="kanji-badge">暁</span>
            <blockquote>
              Kekuatan sejati bukanlah diakui semua orang, tetapi menyelesaikan apa yang tidak bisa diselesaikan orang lain.
            </blockquote>
            <p>— ANBU / versi dummy landing page</p>
            <button type="button" className="panel-btn" onClick={() => openInfo(infoCards[3])}>
              Baca Peringatan
            </button>
          </div>

          {/* <div className="warning-panel">
            <div className="section-title-row">
              <span className="section-title-mark" />
              <h3>Disclaimer Demo</h3>
            </div>
            <ul>
              <li>Tidak ada backend.</li>
              <li>Tidak ada database.</li>
              <li>Tidak ada autentikasi.</li>
              <li>Semua menu hanya membuka modal.</li>
              <li>Tujuan utama: presentasi FE dan detailing visual.</li>
            </ul>
          </div> */}
        </section>
      </main>

      <footer className="footer-bar">
        <p>ANBU Portal ini di buat oleh mas AmriTSalahudin hanya untuk keperluan senang senang,mohon jangan baper!</p>
        <button type="button" className="nav-btn" onClick={() => setIsRegisterOpen(true)}>
          Simulasi Pendaftaran
        </button>
      </footer>

      <Modal
        open={Boolean(activeInfo)}
        title={activeInfo?.label}
        subtitle={activeInfo?.title}
        onClose={() => setActiveInfo(null)}
      >
        {activeInfo ? <InfoModalContent card={activeInfo} /> : null}
      </Modal>

      <Modal
        open={isRegisterOpen}
        title="Formulir Pendaftaran Dummy"
        subtitle="Seluruh input hanya dibaca di sisi frontend, tanpa storage permanen."
        onClose={() => setIsRegisterOpen(false)}
        wide
      >
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              <span>Nama Lengkap</span>
              <input name="nama" value={form.nama} onChange={handleChange} placeholder="Masukkan nama calon" required />
            </label>

            <label>
              <span>Nama Kode</span>
              <input name="namaKode" value={form.namaKode} onChange={handleChange} placeholder="Contoh: Raven, Kage, Akai" required />
            </label>

            <label>
              <span>Usia</span>
              <input name="usia" value={form.usia} onChange={handleChange} placeholder="Contoh: 19" required />
            </label>

            <label>
              <span>Domisili</span>
              <input name="domisili" value={form.domisili} onChange={handleChange} placeholder="Desa / wilayah asal" required />
            </label>

            <label>
              <span>Spesialisasi</span>
              <select name="spesialisasi" value={form.spesialisasi} onChange={handleChange} required>
                <option value="">Pilih spesialisasi</option>
                <option value="Taijutsu">Taijutsu</option>
                <option value="Ninjutsu">Ninjutsu</option>
                <option value="Genjutsu">Genjutsu</option>
                <option value="Intelijen">Intelijen</option>
                <option value="Tracking">Tracking</option>
              </select>
            </label>

            <label>
              <span>Loyalitas</span>
              <select name="loyalitas" value={form.loyalitas} onChange={handleChange}>
                <option value="Mutlak">Mutlak</option>
                <option value="Teruji">Teruji</option>
                <option value="Masih dipantau">Masih dipantau</option>
              </select>
            </label>

            <label className="form-span-2">
              <span>Kontak Rahasia</span>
              <input name="kontak" value={form.kontak} onChange={handleChange} placeholder="Email / kode komunikasi / nomor dummy" required />
            </label>

            <label className="form-span-2">
              <span>Motivasi Bergabung</span>
              <textarea
                name="motivasi"
                value={form.motivasi}
                onChange={handleChange}
                placeholder="Tuliskan alasan bergabung dengan gaya naratif singkat"
                rows="5"
                required
              />
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="cta-btn" onClick={() => setIsRegisterOpen(false)}>
              Batal
            </button>
            <button type="submit" className="cta-btn cta-btn--primary">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        open={isSubmitOpen}
        title="Konfirmasi Pendaftaran"
        subtitle="Semua data yang barusan diisi ditampilkan ulang sebagai recap akhir."
        onClose={() => setIsSubmitOpen(false)}
        wide
      >
        <SubmissionModalContent data={submittedData} />
      </Modal>
    </div>
  )
}
