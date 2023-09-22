
import { useEffect } from 'react'
import {fetchDataFromApi} from './utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import Home from './pages/home/Home';
import Explore from './pages/explore/Explore';
import SearchResult from './pages/searchResult/SearchResult';
import Details from './pages/details/Details';
import PageNotFound from './pages/404/PageNotFound';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';


function App() {
  
  useEffect(() => {
    fetchApiConfig()
    genresCall()
  }, []);

  const dispatch = useDispatch();
  const {url} = useSelector((state)=> state.home);

  const fetchApiConfig = () => {
    fetchDataFromApi(`/configuration`)
    .then(res => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }
      // console.log(res);
      dispatch(getApiConfiguration(url))
    })
  }
  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediaType/:id' element={<Details />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='/search/:query' element={<SearchResult />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
