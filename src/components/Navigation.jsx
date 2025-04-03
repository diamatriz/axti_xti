import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/navigation.css'

export default function Navigation() {
  const location = useLocation()
  const [hoveredButton, setHoveredButton] = useState(null)

  const links = [
    { to: '/about', text: 'О НАС' },
    { to: '/releases', text: 'РЕЛИЗЫ' },
    { to: '/video', text: 'ВИДЕО' },
    { to: '/concerts', text: 'КОНЦЕРТЫ' },
    { to: '/news', text: 'НОВОСТИ' },
    { to: '/merch', text: 'МЕРЧ' },
    { to: '/contacts', text: 'КОНТАКТЫ' }
  ]

  return (
    <nav className="main-nav">
      {links.map((link, index) => {
        const isActive = location.pathname === link.to
        const isHovered = hoveredButton === index
        
        return (
          <NavLink 
            key={link.to}
            to={link.to}
            className={`nav-button ${index % 2 === 0 ? 'red' : 'blue'}`}
            onMouseEnter={() => setHoveredButton(index)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <motion.span
              className="nav-text"
              animate={{
                x: isHovered ? '0%' : '0%',
                y: isHovered ? '0%' : '50%',
                textAlign: isHovered ? 'right' : 'left',
              }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              {link.text}
            </motion.span>
          </NavLink>
        )
      })}
    </nav>
  )
}