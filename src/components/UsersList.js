import React, { useState, useEffect } from 'react';
import { Trash, Edit, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (pageNum) => {
    setLoading(true);
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${pageNum}&per_page=9`);
      const data = await response.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
      setMessage('');
    } catch (err) {
      setMessage('Error fetching users');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`https://reqres.in/api/users/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Delete failed');
        setUsers(users.filter((user) => user.id !== id));
        setMessage('User deleted successfully');
      } catch (err) {
        setMessage('Error deleting user');
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  };

  const handleChange = (e, field) => {
    setEditedData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async (id) => {
    if (!editedData.first_name || !editedData.last_name || !editedData.email) {
      setMessage('All fields are required');
      return;
    }

    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedData),
      });
      if (!response.ok) throw new Error('Update failed');
      const updatedUser = await response.json();
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
      setEditingUserId(null);
      setMessage('User updated successfully');
    } catch (err) {
      setMessage('Error updating user');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto', position: 'relative' }}>
      <button 
        onClick={handleLogout} 
        style={{ position: 'absolute', top: '10px', right: '10px', padding: '10px 15px', background: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Logout
      </button>

      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Users List</h2>

      {loading && <p style={{ textAlign: 'center', color: 'gray' }}>Loading...</p>}
      {message && <p style={{ textAlign: 'center', color: 'red' }}>{message}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {users.map((user) => (
          <div key={user.id} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px',
            border: '1px solid #ddd',
            borderRadius: '15px',
            background: '#f9f9f9',
            textAlign: 'center',
            position: 'relative'
          }}>
            <img src={user.avatar} alt={user.first_name} width="120" style={{ borderRadius: '50%', marginBottom: '15px' }} />

            {editingUserId === user.id ? (
              <>
                <input
                  type="text"
                  value={editedData.first_name}
                  onChange={(e) => handleChange(e, 'first_name')}
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', marginBottom: '5px', textAlign: 'center' }}
                />
                <input
                  type="text"
                  value={editedData.last_name}
                  onChange={(e) => handleChange(e, 'last_name')}
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', marginBottom: '5px', textAlign: 'center' }}
                />
                <input
                  type="email"
                  value={editedData.email}
                  onChange={(e) => handleChange(e, 'email')}
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', marginBottom: '10px', textAlign: 'center' }}
                />
              </>
            ) : (
              <>
                <p><strong>{user.first_name} {user.last_name}</strong></p>
                <p>{user.email}</p>
              </>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              {editingUserId === user.id ? (
                <button 
                  onClick={() => handleSave(user.id)} 
                  style={{ background: 'green', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
                >
                  <Save size={18} />
                </button>
              ) : (
                <button 
                  onClick={() => handleEdit(user)} 
                  style={{ background: 'blue', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
                >
                  <Edit size={18} />
                </button>
              )}
              <button 
                onClick={() => handleDelete(user.id)} 
                style={{ background: 'red', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button 
          onClick={() => setPage(page - 1)} 
          disabled={page === 1} 
          style={{ marginRight: '10px', padding: '8px 15px', background: page === 1 ? 'gray' : 'indigo', color: 'white', borderRadius: '5px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button 
          onClick={() => setPage(page + 1)} 
          disabled={page === totalPages} 
          style={{ marginLeft: '10px', padding: '8px 15px', background: page === totalPages ? 'gray' : 'indigo', color: 'white', borderRadius: '5px', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UsersList;