import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RankGame({loggedIn, user_id, slug}) {

  const [loading, setLoading] = useState(true);
  const [rankList, setRankList] = useState([]);

  const [name, setName] = useState('');
  const [entryModal, setEntryModal] = useState(false);

  const year = slug.slice(0,4)
  const cat = slug.slice(5)

  useEffect(() => {
    // Load the proper data for year/category
    axios.get(`/api/rank/?year=${year}&cat=${cat}`)
      .then(data => {
        console.log('DATA.data:', data.data)
        setRankList(data.data.rankList);
        setLoading(false);
      })
      .catch(err => console.log('err',err))
  });

  function validateForm() {
    return name.length > 0;
  };

  function addNewEntry() {
    // makes post request to same route as in useEffect
  };

  // Advanced: Have a search bar inside the modal that sees if the entry already exists using debouncing

  // Have a loading component -- look up a pattern for a <Loading />
  return <>
    <div id="rank-game">
      Welcome to Rank Game

      {loading && <div>should be LOADING component</div>}

      {!loading && <>
        {rankList.map((item, i) => <RankGameItem item={item} key={i} /> )}

        {entryModal && <Modal setModal={setEntryModal} size={"200px"}>
          <form onSubmit={addNewEntry} className="login-form">
            <div className="login-form-label">Name</div>
            <input
              className="login-form-input"
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button disabled={!validateForm()} className="submit-button" >Submit</button>
          </form>
        </Modal>}

        <button onSubmit={setEntryModal(true)}>Add New Entry</button>

      </>}
    </div>
  </>
};

function RankGameItem({props}) {
  // 
};