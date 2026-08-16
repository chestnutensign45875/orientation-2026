import './Footer.css'

function Footer() {
  return (
    <footer className="site-credit-footer">
      <p className="site-credit-footer__text">
        This website was made by{' '}
        <a
          href="https://instagram.com/ayuush0702"
          target="_blank"
          rel="noopener noreferrer"
          className="site-credit-footer__link"
          aria-label="Ayush Sharma on Instagram"
        >
          Ayush Sharma
        </a>
      </p>
    </footer>
  )
}

export default Footer
