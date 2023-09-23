"use client"

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import supabase from '../../config/supabaseConfig';

export default function Test() {

    const [queryResult, setQueryResult] = useState([]);
    async function fetchDirectorNames() {
        try {
          // Call the PostgreSQL stored procedure using supabase.rpc
          const { data, error } = await supabase
          .from('movie_director')
          .select(`
            director_id,
            directors:director_id (
              director_name,
              director_image
            )
          `)
          .eq('movie_id', 3);
      
          if (error) {
            console.error('Error:', error);
            return;
          }
      
          // 'data' will contain the result of the stored procedure
          console.log('Director Names:', data);
      
          // You can access individual rows in 'data' and process them as needed
          for (const row of data) {
            console.log('Director Name:', row.director_name);
            // Process the director names here
          }
        } catch (error) {
          console.error('Unexpected Error:', error);
        }
      }

    useEffect(() => {
        fetchDirectorNames();
    }, []);

    return (
        <div>
            <h1>The Email is </h1>
            {/* You can add additional rendering logic here */}
            {/* {JSON.stringify(queryResult)} */}
        </div>
    );
}
