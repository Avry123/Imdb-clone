"use client"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import supabase from '../../../config/supabaseConfig';
import Link from "next/link";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


export default function movie_details({ params }) {

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const id = params.id;
    const [data, setData] = useState([]);
    const [err, setErr] = useState(null);

    const userName = useSelector((state) => state.user.username);
    const photo1 = useSelector((state) => state.user.profilePhoto);


    const fetchData = async () => {
        let { data: movies, error } = await supabase
            .from('movies')
            .select("*")
            .eq('id', id);

        setData(movies);
        setErr(error);
        console.log();
    }

    useEffect(() => {
        // Fetch data for movies
        fetchData();


    }, []);

    let newPrice;

    useEffect(() => {
        if (data) {
            const x = Math.floor(data[0]?.movie_price);
            setPrice(x); // Set the price once data is available
        }
    }, [data]);


    const [count, setCount] = useState(1);
    const [price, setPrice] = useState();
    const [newPrice1, setNewPrice1] = useState();

    const calculateNewPrice = () => {
        return price * count;
        setNewPrice1(price * count)
    };

    const handleAdd = () => {
        setCount(count + 1);
    };

    const handleMinus = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    newPrice = price * count;

    //id, movie_id, quantity, og_price, total_price, user_email

    const insertData = async () => {
        const { data, error } = await supabase
                                            .from('Cart')
                                            .insert([
                                                {
                                                    movie_id: id,
                                                    quantity: count,
                                                    og_price: price,
                                                    total_price: newPrice,
                                                    user_email: userName,
                                                  },
                                                     ])
                                                        .select()
        if (error) {
            console.log(error);
        }
        
        handleClick()

    }


    return (
        <>
            {/* <h1>The id is {directorData}</h1> */}
            {/* ... (your existing JSX) */}
            {data.map((item, id) => (
                <>
                    <div className="center" key={id}>
                        <div className="big_card">
                            <div className="big_card_left">
                                <div className="big_card_img_div">
                                    <img className="big_card_img" src={item?.movie_image} />
                                </div>
                            </div>
                            <div className="big_card_right">
                                <div className="big_card_description">
                                    <h2 className="card_title">{item?.movie_name}</h2>
                                    <p className="card_description">{item?.movie_description}</p>
                                </div>
                                {userName ? (<div className="for_quantity">
                                    <div className="parts">
                                        <div className="add" onClick={handleAdd}>
                                            +
                                        </div>
                                        <div className="show">
                                            <input className="show_txt" value={calculateNewPrice()} type="number" readOnly />
                                        </div>
                                        <div className="minus" onClick={handleMinus}>
                                            -
                                        </div>
                                    </div>
                                    <div className="AddToCardDiv">
                                        <button className="card_button" onClick={insertData}>Add To Cart</button>
                                    </div>
                                </div>) : null}
                            </div>
                        </div>
                    </div>
                </>
            ))}
       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
           Added to cart successfull!
        </Alert>
      </Snackbar>
        </>
    )
};

