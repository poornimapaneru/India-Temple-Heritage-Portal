import { useState, useEffect } from 'react'
import './App.css'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

function App() {
  const [temples, setTemples] = useState([])

  const [savedTemples, setSavedTemples] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('savedTemples')) || []
    } catch {
      return []
    }
  })

  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [admin, setAdmin] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDeity, setSelectedDeity] = useState('')
  const [filteredTemples, setFilteredTemples] = useState([])
  const [selectedTemple, setSelectedTemple] = useState(null)

  const pilgrimageCircuits = [
    {
      name: 'Char Dham Yatra',
      description:
        'A sacred pilgrimage journey covering four important Hindu pilgrimage sites across India.',
      route: 'Badrinath • Dwarka • Puri • Rameswaram',
    },
    {
      name: 'Jyotirlinga Yatra',
      description:
        'A pilgrimage journey focused on the twelve traditionally revered Jyotirlinga shrines dedicated to Lord Shiva.',
      route: 'Major Shiva pilgrimage sites across India',
    },
    {
      name: 'Vaishno Devi Yatra',
      description:
        'A spiritual pilgrimage to the sacred shrine of Goddess Vaishno Devi in the Trikuta Hills.',
      route: 'Katra • Trikuta Hills • Vaishno Devi Shrine',
    },
  ]

  const festivalHighlights = [
    {
      name: 'Rath Yatra',
      temple: 'Jagannath Temple, Puri',
      description:
        'A major festival associated with Lord Jagannath and the grand chariot procession.',
    },
    {
      name: 'Maha Shivaratri',
      temple: 'Important Shiva Temples',
      description:
        'A major festival dedicated to Lord Shiva, observed with prayers, worship and traditional rituals.',
    },
    {
      name: 'Navratri',
      temple: 'Vaishno Devi Shrine',
      description:
        'A significant festival dedicated to the worship of the divine feminine and celebrated with devotion.',
    },
  ]

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const response = await fetch(
          'https://india-temple-heritage-portal.onrender.com/api/temples'
        )

        if (!response.ok) {
          throw new Error('Unable to load temples')
        }

        const data = await response.json()
        setTemples(data)
        setFilteredTemples(data)
      } catch (error) {
        console.error('Failed to fetch temples:', error)
      }
    }

    fetchTemples()
  }, [])

  const handleSaveTemple = (temple) => {
    const isSaved = savedTemples.some(
      (saved) => saved._id === temple._id
    )

    const updatedTemples = isSaved
      ? savedTemples.filter(
          (saved) => saved._id !== temple._id
        )
      : [...savedTemples, temple]

    setSavedTemples(updatedTemples)

    localStorage.setItem(
      'savedTemples',
      JSON.stringify(updatedTemples)
    )
  }

  const handleShareTemple = async (temple) => {
    const shareText = `Explore ${temple.name} in ${temple.city}, ${temple.state} on India Temple Heritage.`
    const shareUrl = window.location.href

    try {
      if (navigator.share) {
        await navigator.share({
          title: temple.name,
          text: shareText,
          url: shareUrl,
        })
      } else {
        window.prompt(
          'Copy this temple information to share:',
          `${shareText}\n${shareUrl}`
        )
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        window.prompt(
          'Copy this temple information to share:',
          `${shareText}\n${shareUrl}`
        )
      }
    }
  }

  const handleSearch = () => {
    const results = temples.filter((temple) => {
      const matchesName = temple.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      const matchesState =
        selectedState === '' || temple.state === selectedState

      const matchesCity =
        selectedCity === '' || temple.city === selectedCity

      const matchesDeity =
        selectedDeity === '' || temple.deity === selectedDeity

      return (
        matchesName &&
        matchesState &&
        matchesCity &&
        matchesDeity
      )
    })

    setFilteredTemples(results)
  }

  const handleViewDetails = (temple) => {
    setSelectedTemple(temple)
  }

  if (admin) {
    return (
      <AdminDashboard
        admin={admin}
        onLogout={() => {
          localStorage.removeItem('adminToken')
          setAdmin(null)
          setShowAdminLogin(false)
        }}
      />
    )
  }

  if (showAdminLogin) {
    return (
      <AdminLogin
        onLoginSuccess={(adminData) => {
          setAdmin(adminData)
          setShowAdminLogin(false)
        }}
      />
    )
  }

  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="logo">India Temple Heritage</div>

          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#temples">Temples</a>
            <a href="#pilgrimage">Pilgrimage</a>
            <a href="#festivals">Festivals</a>
            <a href="#about">About</a>

            <button onClick={() => setShowAdminLogin(true)}>
              Admin Login
            </button>
          </div>
        </nav>

        <div className="header-content">
          <h1>India Temple Heritage</h1>
          <p>
            Heritage, Pilgrimage & Spiritual Journey Across India
          </p>
        </div>
      </header>

      <main id="home">
        <section className="hero-section">
          <span className="hero-label">
            EXPLORE INDIA'S SPIRITUAL HERITAGE
          </span>

          <h2>Discover the Sacred Temples of India</h2>

          <p>
            Explore India's ancient temples, rich history, sacred
            traditions, festivals, rituals, darshan timings and
            pilgrimage information — all in one place.
          </p>

          <div className="hero-buttons">
            <a href="#temples" className="hero-main-button">
              Explore Temples
            </a>

            <a
              href="#pilgrimage"
              className="secondary-button hero-link"
            >
              Plan Your Pilgrimage
            </a>
          </div>
        </section>
      </main>

      <section className="search-section">
        <div className="section-heading">
          <span>FIND YOUR TEMPLE</span>
          <h2>Search & Discover</h2>

          <p>
            Find temples by name, state, city or deity and explore
            India's spiritual heritage.
          </p>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search temple name..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch()
              }
            }}
          />

          <select
            value={selectedState}
            onChange={(event) => setSelectedState(event.target.value)}
          >
            <option value="">All States</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Odisha">Odisha</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Jammu and Kashmir">
              Jammu and Kashmir
            </option>
          </select>

          <select
            value={selectedCity}
            onChange={(event) => setSelectedCity(event.target.value)}
          >
            <option value="">All Cities</option>
            <option value="Kedarnath">Kedarnath</option>
            <option value="Varanasi">Varanasi</option>
            <option value="Puri">Puri</option>
            <option value="Tirupati">Tirupati</option>
            <option value="Prabhas Patan">Prabhas Patan</option>
            <option value="Madurai">Madurai</option>
            <option value="Konark">Konark</option>
            <option value="Thanjavur">Thanjavur</option>
            <option value="Katra">Katra</option>
          </select>

          <select
            value={selectedDeity}
            onChange={(event) => setSelectedDeity(event.target.value)}
          >
            <option value="">All Deities</option>
            <option value="Lord Shiva">Lord Shiva</option>
            <option value="Lord Vishnu">Lord Vishnu</option>
            <option value="Lord Jagannath">Lord Jagannath</option>
            <option value="Goddess Meenakshi">
              Goddess Meenakshi
            </option>
            <option value="Surya">Surya</option>
            <option value="Goddess Vaishno Devi">
              Goddess Vaishno Devi
            </option>
          </select>

          <button onClick={handleSearch}>Search</button>
        </div>

        <p className="search-result-count">
          {filteredTemples.length}{' '}
          {filteredTemples.length === 1 ? 'temple' : 'temples'} found
        </p>
      </section>

      <section className="featured-section" id="temples">
        <div className="section-heading">
          <span>HERITAGE DESTINATIONS</span>
          <h2>Featured Temples</h2>

          <p>
            Discover some of India's most important and culturally
            significant temples.
          </p>
        </div>

        <div className="temple-grid">
          {filteredTemples.length > 0 ? (
            filteredTemples.map((temple) => (
              <article className="temple-card" key={temple._id}>
                <div className="temple-image">
                  <img src={temple.image} alt={temple.name} />
                </div>

                <div className="temple-content">
                  <h3>{temple.name}</h3>

                  <p>
                    {temple.city}, {temple.state}
                  </p>

                  <p>
                    <strong>Deity:</strong> {temple.deity}
                  </p>

                  <p>{temple.description}</p>

                  <button onClick={() => handleViewDetails(temple)}>
                    View Details
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveTemple(temple)}
                  >
                    {savedTemples.some(
                      (saved) => saved._id === temple._id
                    )
                      ? 'Unsave Temple'
                      : 'Save Temple'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleShareTemple(temple)}
                  >
                    Share Temple
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="no-results">
              <h3>No Temples Found</h3>

              <p>
                No temple matches your search. Try another temple name,
                state or deity.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="pilgrimage-section" id="pilgrimage">
        <div className="section-heading">
          <span>PILGRIMAGE JOURNEYS</span>
          <h2>Popular Pilgrimage Circuits</h2>

          <p>
            Explore some of India's important pilgrimage journeys and
            sacred destinations.
          </p>
        </div>

        <div className="pilgrimage-grid">
          {pilgrimageCircuits.map((circuit) => (
            <article className="pilgrimage-card" key={circuit.name}>
              <div className="pilgrimage-icon">ॐ</div>
              <h3>{circuit.name}</h3>
              <p>{circuit.description}</p>
              <strong>Route</strong>
              <p>{circuit.route}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="festival-section" id="festivals">
        <div className="section-heading">
          <span>FESTIVAL CALENDAR</span>
          <h2>Festival Highlights</h2>

          <p>
            Discover important festivals connected with India's famous
            temple traditions and pilgrimage destinations.
          </p>
        </div>

        <div className="festival-grid">
          {festivalHighlights.map((festival) => (
            <article className="festival-card" key={festival.name}>
              <div className="festival-icon">✦</div>
              <h3>{festival.name}</h3>
              <strong>{festival.temple}</strong>
              <p>{festival.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="facilities-section">
        <div className="section-heading">
          <span>PILGRIM SUPPORT</span>
          <h2>Accommodation & Transport</h2>

          <p>
            Helpful information for planning your stay and local travel
            during a temple or pilgrimage visit.
          </p>
        </div>

        <div className="facilities-grid">
          <article className="facility-card">
            <div className="facility-icon">⌂</div>
            <h3>Accommodation</h3>

            <p>
              Find hotels, guest houses, dharamshalas and other
              accommodation options near major temple destinations.
            </p>
          </article>

          <article className="facility-card">
            <div className="facility-icon">⇄</div>
            <h3>Transport</h3>

            <p>
              Explore common travel options such as road, rail and air
              connectivity for pilgrimage destinations.
            </p>
          </article>

          <article className="facility-card">
            <div className="facility-icon">⌖</div>
            <h3>Local Travel</h3>

            <p>
              Check local transport options to help plan movement around
              temple and pilgrimage destinations.
            </p>
          </article>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="section-heading">
          <span>ABOUT THE PORTAL</span>
          <h2>India Temple Heritage</h2>

          <p>
            A dedicated information portal for exploring India's rich
            temple heritage, pilgrimage traditions and spiritual
            destinations.
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3>Our Purpose</h3>

            <p>
              India Temple Heritage is designed to bring important
              temple and pilgrimage information together in one
              organized platform. Visitors can explore temple history,
              deity significance, rituals, festivals, darshan timings
              and visitor guidelines.
            </p>

            <p>
              The portal also helps users discover pilgrimage circuits
              and important spiritual destinations across different
              regions of India.
            </p>
          </div>

          <div className="about-features">
            <div className="about-feature">
              <span>01</span>
              <div>
                <h3>Temple Heritage</h3>
                <p>
                  Explore historical and cultural information about
                  temples.
                </p>
              </div>
            </div>

            <div className="about-feature">
              <span>02</span>
              <div>
                <h3>Pilgrimage Information</h3>
                <p>
                  Discover pilgrimage journeys, routes and sacred
                  destinations.
                </p>
              </div>
            </div>

            <div className="about-feature">
              <span>03</span>
              <div>
                <h3>Visitor Guidance</h3>
                <p>
                  Find darshan timings, festivals and important visitor
                  guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedTemple && (
        <section className="temple-details-section">
          <div className="temple-details">
            <button
              className="back-button"
              onClick={() => setSelectedTemple(null)}
            >
              ← Back to Temples
            </button>

            <div className="temple-details-header">
              <span className="hero-label">TEMPLE HERITAGE</span>

              <h2>{selectedTemple.name}</h2>

              <p>
                {selectedTemple.city}, {selectedTemple.state} •{' '}
                {selectedTemple.deity}
              </p>
            </div>

            <div className="temple-details-content">
              <div className="detail-block">
                <h3>History & Significance</h3>
                <p>{selectedTemple.history}</p>
              </div>

              <div className="detail-block">
                <h3>Rituals & Worship</h3>
                <p>{selectedTemple.rituals}</p>
              </div>

              <div className="detail-block">
                <h3>Darshan Timings</h3>
                <p>{selectedTemple.darshan}</p>
              </div>

              <div className="detail-block">
                <h3>Festivals</h3>
                <p>{selectedTemple.festivals}</p>
              </div>

              <div className="detail-block">
                <h3>Visitor Guidelines</h3>
                <p>{selectedTemple.guidelines}</p>
              </div>

              <div className="detail-block">
                <h3>Dress Code</h3>
                <p>{selectedTemple.dressCode}</p>
              </div>

              <div className="detail-block">
                <h3>Accommodation</h3>
                <p>{selectedTemple.accommodation}</p>
              </div>

              <div className="detail-block">
                <h3>Transport</h3>
                <p>{selectedTemple.transport}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="footer-content">
          <h3>India Temple Heritage</h3>

          <p>
            Exploring India's temple heritage, pilgrimage traditions and
            spiritual destinations.
          </p>

          <p className="footer-copy">
            © 2026 India Temple Heritage. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App