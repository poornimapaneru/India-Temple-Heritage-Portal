import { useEffect, useState } from 'react'

function AdminDashboard({ admin, onLogout }) {
  const [temples, setTemples] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const [form, setForm] = useState({
    name: '',
    state: '',
    city: '',
    deity: '',
    image: '',
    description: '',
    history: '',
    rituals: '',
    darshan: '',
    festivals: '',
    guidelines: '',
    dressCode: '',
    accommodation: '',
    transport: '',
  })

  const fetchTemples = async () => {
    try {
      setError('')
      const token = localStorage.getItem('adminToken')

      const response = await fetch(
        'http://localhost:5000/api/temples/admin/all',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to load temples')
      }

      setTemples(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTemples()
  }, [])

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const resetForm = () => {
    setForm({
      name: '',
      state: '',
      city: '',
      deity: '',
      image: '',
      description: '',
      history: '',
      rituals: '',
      darshan: '',
      festivals: '',
      guidelines: '',
      dressCode: '',
      accommodation: '',
      transport: '',
    })
    setEditingId(null)
    setIsEditing(false)
  }

  const handleEditClick = (temple) => {
    setForm({
      name: temple.name || '',
      state: temple.state || '',
      city: temple.city || '',
      deity: temple.deity || '',
      image: temple.image || '',
      description: temple.description || '',
      history: temple.history || '',
      rituals: temple.rituals || '',
      darshan: temple.darshan || '',
      festivals: temple.festivals || '',
      guidelines: temple.guidelines || '',
      dressCode: temple.dressCode || '',
      accommodation: temple.accommodation || '',
      transport: temple.transport || '',
    })

    setEditingId(temple._id)
    setIsEditing(true)
    setMessage('')
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteTemple = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this temple?'
    )

    if (!confirmed) return

    setError('')
    setMessage('')

    try {
      const token = localStorage.getItem('adminToken')

      const response = await fetch(
        `http://localhost:5000/api/temples/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete temple')
      }

      setMessage('Temple deleted successfully!')
      if (editingId === id) resetForm()
      await fetchTemples()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleApproval = async (temple, approvalStatus) => {
    setError('')
    setMessage('')

    try {
      const token = localStorage.getItem('adminToken')

      const response = await fetch(
        `http://localhost:5000/api/temples/${temple._id}/approval`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ approvalStatus }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to update approval status')
      }

      setMessage(`${temple.name}: ${approvalStatus} successfully.`)
      await fetchTemples()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleAddTemple = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')

    try {
      const token = localStorage.getItem('adminToken')
      const url = editingId
        ? `http://localhost:5000/api/temples/${editingId}`
        : 'http://localhost:5000/api/temples'

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to save temple')
      }

      setMessage(
        editingId
          ? 'Temple updated successfully!'
          : 'Temple added successfully! It is pending approval.'
      )

      resetForm()
      await fetchTemples()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, {admin?.name || 'Admin'}!</p>

      <button onClick={onLogout}>Logout</button>

      <h2>{isEditing ? 'Edit Temple' : 'Add New Temple'}</h2>

      <form onSubmit={handleAddTemple}>
        <input name="name" placeholder="Temple name *" value={form.name} onChange={handleChange} required />
        <input name="state" placeholder="State *" value={form.state} onChange={handleChange} required />
        <input name="city" placeholder="City *" value={form.city} onChange={handleChange} required />
        <input name="deity" placeholder="Deity *" value={form.deity} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <textarea name="history" placeholder="History" value={form.history} onChange={handleChange} />
        <textarea name="rituals" placeholder="Rituals" value={form.rituals} onChange={handleChange} />
        <input name="darshan" placeholder="Darshan timings" value={form.darshan} onChange={handleChange} />
        <input name="festivals" placeholder="Festivals" value={form.festivals} onChange={handleChange} />
        <textarea name="guidelines" placeholder="Visitor guidelines" value={form.guidelines} onChange={handleChange} />
        <input name="dressCode" placeholder="Dress code" value={form.dressCode} onChange={handleChange} />
        <input name="accommodation" placeholder="Accommodation information" value={form.accommodation} onChange={handleChange} />
        <input name="transport" placeholder="Transport information" value={form.transport} onChange={handleChange} />

        <button type="submit">
          {isEditing ? 'Update Temple' : 'Add Temple'}
        </button>

        {isEditing && (
          <button type="button" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>

      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Temple Management & Approval</h2>

      {loading && <p>Loading temples...</p>}

      {!loading && (
        <>
          <p>Total temples: {temples.length}</p>
          <p>
            Pending approval: {temples.filter((t) => t.approvalStatus === 'pending').length}
          </p>

          {temples.map((temple) => (
            <div key={temple._id} className="admin-temple-item">
              <h3>{temple.name}</h3>
              <p>{temple.city}, {temple.state}</p>
              <p>
                Status: <strong>{temple.approvalStatus || 'approved'}</strong>
              </p>

              {temple.approvalStatus === 'pending' && (
                <>
                  <button onClick={() => handleApproval(temple, 'approved')}>
                    Approve
                  </button>
                  <button onClick={() => handleApproval(temple, 'rejected')}>
                    Reject
                  </button>
                </>
              )}

              {temple.approvalStatus === 'rejected' && (
                <button onClick={() => handleApproval(temple, 'approved')}>
                  Approve
                </button>
              )}

              <button onClick={() => handleEditClick(temple)}>Edit</button>
              <button onClick={() => handleDeleteTemple(temple._id)}>
                Delete
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default AdminDashboard