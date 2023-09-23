"use client";
import Image from 'next/image'
import styles from './page.module.css'
import Card from '../../components/card'
import supabase from '../config/supabaseConfig'
import { useEffect, useState } from 'react';


export default function Home() {

  const [data, setData] = useState([]);

  const [directorData, setDirectorData] = useState([]);

  const [err, setErr] = useState(null);



  useEffect(() => {
    const fetchDay = async () => {
      let { data: movies, error } = await supabase.from('movies').select('*');
     
      setData(movies);
     
      setErr(error);
    }

    fetchDay();
  }, [])

  if (!data) {
    return (
      <h1>{err}</h1>
    )
  }


  return (

    <>
      <main className="remains">
        <>
          {data.map((item, id) => (
            <Card key={id} movie_name={item.movie_name} movie_image={item.movie_image} movie_description={item.movie_description} movie_id={item.id} />
          ))}
       
        </>
      </main>
    </>

  )




}
