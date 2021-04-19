import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {awardsCategoryNames, awardsShowNames} from '../../utils/shorthand';

export default function RankCategories({URL}) {

  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    // Load all categories
    axios.get(`/api/rank/category`)
      .then(res => {
        console.log('LIST:', res.data.list);
        setCategoryList(res.data.list);
        setLoading(false);
      })
      .catch(err => {
        console.log('err',err);
      })
  }, []);

  return <>
  <div id="home-menu">
    {loading 
      ? <div>LOADING...</div>
      : <>
        <div className="home-menu-item">
          {categoryList.map(item => <Category 
            item={item} 
            URL={URL}
            key={item.rank_category_id} 
          /> )}
          {/* <a href={`${URL}/rank/2022/picture`} >Predict 2022 Oscars</a> */}
        </div>
      </>
    }
    </div>
    
  </>
};

function Category({item, URL}) {

  const link = `${URL}/rank/${item.year}-${item.awardsShow}-${item.category}`
  const text = `${item.year} ${awardsShowNames[item.awardsShow]}s - ${awardsCategoryNames[item.category]}`

  return <div>
    <a href={link}>{text}</a>
  </div>
};
