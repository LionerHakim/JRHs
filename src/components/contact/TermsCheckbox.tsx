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
        <div id={popoverId} className="terms-checkbox-popover" role="dialog" aria-label="Syarat dan ketentuan">
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
