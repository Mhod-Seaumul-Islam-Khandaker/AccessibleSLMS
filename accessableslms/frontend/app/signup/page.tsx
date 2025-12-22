'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase-client'

export default function Home() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('user_account')
        .select('*')
      
      setData(data || [])
    }
    
    fetchData()
  }, [])

  return (
    <div>
      <h1>User Data from Supabase</h1>
      <p>Total users: {data.length}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}