"use client"
import Link from 'next/link';
import React, { Component } from 'react';



export default function Card({ movie_name, movie_description, movie_image, movie_id }) {
  return (
    <>
      <div className="card">
        <div className="card_img">
          <img className="card_profile" src={movie_image} />
        </div>
        <div className="card_other">
           <h2 className="card_title">{movie_name}</h2> 
          <p className="card_description">{movie_description}</p> 
          <div className="card_visit">
            <Link className="card_button" href={`/movie_details/${movie_id}`}>See More</Link>
          </div>
        </div>
      </div>
    </>
  );
}