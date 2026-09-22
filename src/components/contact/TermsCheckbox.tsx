import type { ChangeEvent, FocusEvent, RefObject } from 'react'

type TermsCheckboxProps = {
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  invalid?: boolean
  required?: boolean
  disabled?: boolean
  termsOpen: boolean
  onTermsToggle: () => void
  id?: string
  inputRef?: RefObject<HTMLInputElement | null>
}

export function TermsCheckbox({
  checked,
  onChange,
  onBlur,
  invalid = false,
  required = false,
  disabled = false,
  termsOpen,
  onTermsToggle,
  id = 'terms-checkbox',
  inputRef,
}: TermsCheckboxProps) {
  const popoverId = id + '-details'

  return (
    <div className={"terms-checkbox" + (disabled ? ' is-disabled' : '')}>
      <label className="terms-checkbox-label" htmlFor={id}>
        <input
          id={id}
          ref={inputRef}
          className="terms-checkbox-input"
          type="checkbox"
          required={required}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={invalid}
          aria-describedby={termsOpen ? popoverId : undefined}
        />
        <span className="terms-checkbox-box" aria-hidden="true">
          <svg viewBox="0 0 20 20">
            <path d="m4.5 10.2 3.4 3.4 7.6-7.6" />
          </svg>
        </span>
        <span className="terms-checkbox-text">Saya setuju dan memahami S&K.</span>
      </label>

      <button
        className="terms-checkbox-info"
        type="button"
        aria-label="Lihat syarat dan ketentuan"
        aria-expanded={termsOpen}
        aria-controls={popoverId}
        disabled={disabled}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onTermsToggle()
        }}
      >
        i
      </button>

      {termsOpen ? (
        <div id={popoverId} className="terms-checkbox-popover" role="dialog" aria-modal="true" aria-label="Syarat dan ketentuan">
          <div className="terms-checkbox-popover-head">
            <strong>Syarat & Ketentuan</strong>
            <button className="terms-checkbox-close" type="button" aria-label="Tutup syarat dan ketentuan" onClick={onTermsToggle}>×</button>
          </div>
          <p>Dengan mencentang kotak ini, Anda menyetujui penggunaan data yang diberikan untuk keperluan menyiapkan dan membalas pesan melalui email. Jangan mengirim data sensitif, rahasia, atau informasi yang tidak diperlukan.</p>
          <p>Website hanya menyiapkan draft email pada aplikasi email perangkat Anda. Pengiriman pesan tetap dilakukan oleh Anda.</p>
        </div>
      ) : null}
    </div>
  )
}

const sectionItems = [
  ['identity', 'About'],
  ['education', 'Education'],
  ['media', 'Media'],
  ['projects', 'Projects'],
  ['testimonials', 'Quotes'],
  ['links', 'Contact'],
] as const

const sectionIds = sectionItems.map(([id]) => id)

const musicTracks = [
  { title: '123456', artist: 'Budi Doremi', file: '123456 Budi Doremi.mp3' },
  { title: 'Akad', artist: 'Payung Teduh', file: 'Akad.mp3' },
  { title: 'Bahtera Mahligai Cinta', artist: 'Ajeng Febria, Gerry Mahesa', file: 'Bahtera Mahligai Cinta.mp3' },
  { title: 'Ngertenono Ati', artist: 'NDX A.K.A.', file: 'Ngertenono Ati.mp3' },
  { title: 'PICA PICA', artist: 'Juan Reza', file: 'PICA PICA.mp3' },
  { title: 'Tak Ada Ujungnya', artist: 'Rony Parulian', file: 'Tak Ada Ujungnya.mp3' },
  { title: 'Tewas Tertimbun Masa Lalu', artist: 'NDX A.K.A.', file: 'Tewas Tertimbun Masa Lalu.mp3' },
  { title: 'Tresno Tekan Mati', artist: 'NDX A.K.A.', file: 'Tresno Tekan Mati.mp3' },
  { title: 'Who Knows', artist: 'Daniel Caesar', file: 'Who Knows.mp3' },
].map((track) => ({
  ...track,
  src: '/assets/music/' + encodeURIComponent(track.file),
}));

const contactTopics = ['Pertanyaan umum', 'Kolaborasi', 'Project', 'Bisnis', 'Investasi', 'Akademik', 'Feedback', 'Relationships', 'Tambah teman'] as const

const testimonialInitials = (name: string) =>
  name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()


