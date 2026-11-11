interface PhoneFrameProps {
  /** Screenshot shown in light mode (and in dark mode when darkSrc is missing). */
  src: string;
  darkSrc?: string;
  alt: string;
  className?: string;
  eager?: boolean;
}

/** Phone frame of the site: dark shell, notch, whole screenshot from the top. */
export function PhoneFrame({
  src,
  darkSrc,
  alt,
  className = "",
  eager = false,
}: PhoneFrameProps) {
  const loading = eager ? "eager" : "lazy";

  return (
    <div className={`lp-phone ${className}`.trim()}>
      <img
        className={darkSrc ? "lp-light-only" : undefined}
        src={src}
        alt={alt}
        width={540}
        height={1170}
        loading={loading}
      />
      {darkSrc && (
        <img
          className="lp-dark-only"
          src={darkSrc}
          alt={alt}
          width={540}
          height={1170}
          loading={loading}
        />
      )}
    </div>
  );
}
