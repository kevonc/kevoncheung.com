const socialLinks = [
  {
    href: 'https://www.instagram.com/kevon/',
    label: 'Instagram',
    icon: '/images/social/instagram.svg',
  },
  {
    href: 'https://www.linkedin.com/in/kevoncheung/',
    label: 'LinkedIn',
    icon: '/images/social/linkedin.svg',
  },
]

export default function SocialLinks({ className = '', iconClassName = 'social-icon' }) {
  return (
    <div className={`social-links${className ? ` ${className}` : ''}`}>
      {socialLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={iconClassName}
          aria-label={link.label}
        >
          <img src={link.icon} alt="" width="24" height="24" />
        </a>
      ))}
    </div>
  )
}
