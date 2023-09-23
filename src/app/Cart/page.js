"use client"
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import supabase from '../../config/supabaseConfig';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Cart = () => {
  const userName = useSelector((state) => state.user.username);
  const [data1, setData1] = useState([]);
  const [movie_data, setMovieData] = useState([]);
  const [open, setOpen] = useState(false);
  // const [payMovie,setPayMovie] = useState();
  // const [inserted, setInserted] = useState(false)

  const fetchData = async () => {
    try {
      const { data: Cart, error } = await supabase
        .from('Cart')
        .select('*')
        .eq('user_email', userName);

      if (error) {
        console.error('Error fetching Cart data:', error);
      } else {
        const movieIds = Cart.map((item) => item.movie_id);
        setData1(Cart);
        fetchMovieData(movieIds);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  const fetchMovieData = async (movieIds) => {
    try {
      const { data: Cart, error } = await supabase
        .from('movies')
        .select('*')
        .in('id', movieIds);

      if (error) {
        console.error('Error fetching movie data:', error);
      } else {
        setMovieData(Cart);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  const makePayment = async (movie_id, email) => {
    console.log("triggered")
    try {
      const { data: Cart, error } = await supabase
        .from('Cart')
        .select('*')
        .eq('movie_id', movie_id)
        .eq('user_email', email);
      
      if (!error) {
        // setPayMovie(Cart);
        insertDataIntoTransaction(Cart);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  const insertDataIntoTransaction = async (prop) => {
    if (prop) {
      const movieItem = prop[0];
      try {
        const { data, error } = await supabase
          .from('transaction')
          .insert([
            {
              movie_id: movieItem.movie_id,
              og_price: movieItem.og_price,
              total_price: movieItem.total_price,
              user_email: movieItem.user_email,
              quantity: movieItem.quantity,
            },
          ])
          .select();
          if (!error) {
            deleteAfterPayment(movieItem.movie_id,movieItem.user_email);
          }
      } catch (error) {
        console.error('An unexpected error occurred during insertion:', error);
      }
    }
  };

  const deleteAfterPayment = async (m_id,email) => {
    try {    
        const { error } = await supabase
                                        .from('Cart')
                                        .delete()
                                        .eq('movie_id', m_id)
                                        .eq('user_email',email)
        if (!error) {
                    // setInserted(true);
                    handleClick();
                     fetchData();
  
                   
                    }
    } catch (error) {
      console.log("Unexpected error occured during deletion", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [userName]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  let Card = ({movie_title1, movie_description1, movie_img1, og_price1, total1, user_email1,movie_id1}) => {
    // console.log("the movie details inside the card", movie_title1,movie_description1,movie_img1,og_price1,total1,user_email1)
    return (
      <div class="card1">
        <input type="hidden" name="h1" />
        <img className='card1_img' src={movie_img1} alt={movie_title1} />
        <p class="para"> The movie price is {og_price1}</p>
        <p class="para"><bold>The total price is {total1}</bold></p>
        <Button onClick={() => makePayment(movie_id1, userName)}>Pay</Button>
      </div>
    )
  }

  

  return (
    <>
      <div className="Cart1">
        {data1.length > 0 && movie_data.length > 0 ? (
          data1.map((item, index) => (
            <Card 
              key={item.movie_id}
              movie_title1={movie_data[index].movie_name}  
              movie_description1={movie_data[index].movie_description} 
              movie_img1={movie_data[index].movie_image} 
              og_price1={movie_data[index].movie_price} 
              total1={item.total_price} 
              movie_id1={item.movie_id}
              user_email1={userName} 
            />
          ))

        ) : (
          <p>No data available</p>
        )}
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Payment Made Successfully
        </Alert>
      </Snackbar>
    </>
  );

        }
export default Cart;
