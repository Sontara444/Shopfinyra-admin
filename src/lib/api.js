export const apiRequest = async (endpoint, options = {}) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };
  
    const res = await fetch(url, config);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'API error');
    return data;
  };
  