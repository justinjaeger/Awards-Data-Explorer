import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'components/Modal';
import {awardsCategoryNames, awardsShowNames} from 'utils/shorthand';

export default function RankGame({
  loggedIn, user_id, admin,
  year, category, awardsShow, rank_category_id
}) {

  const [loading, setLoading] = useState(true);
  const [rankList, setRankList] = useState([]);

  // For a new entry
  const [name, setName] = useState('');
  const [entryModal, setEntryModal] = useState(false);

  useEffect(() => {
    // Load the data for category
    axios.get(`/api/rank/list?rank_category_id=${rank_category_id}`)
      .then(res => {
        console.log('status', res)
        console.log('LIST:', res.data.list);
        setRankList(res.data.list);
        setLoading(false);
      })
      .catch(err => {
        console.log('err',err);
      })
  }, []);

  function validateForm() {
    return name.length > 0;
  };

  async function addNewEntry(e) {
    await axios.post(`/api/rank/list?rank_category_id=${rank_category_id}`, {name})
      .then(res => {
        const rank_movie_id = res.data.rank_movie_id;
        // Sort and update state
        const newRankList = rankList.map(obj => ({...obj}));
        newRankList.push({
          name,
          rank_category_id,
          rank_movie_id,
          score: 0,
        });
        newRankList.sort((a, b) => (a.score < b.score) ? 1 : -1);
        setRankList(newRankList);
        setEntryModal(false);
        setName('');
      })
      .catch(err => {
        console.log('err',err.status)
      })
      // e.preventDefault(); /* prevents it from refreshing */
  };

  // Advanced: Have a search bar inside the modal that sees if the entry already exists using debouncing
  // Have a loading component -- look up a pattern for a <Loading />
  return <>
    <div id="rank-game">
      <div>{year} {awardsShowNames[awardsShow]}s - {awardsCategoryNames[category]}</div>

      {loading
      ? <div>LOADING...</div>
      : <>
        {rankList.map(item => <RankGameItem 
          item={item} 
          loggedIn={loggedIn}
          user_id={user_id}
          key={item.rank_movie_id} 
        /> )}

        {entryModal && 
        <Modal setModal={setEntryModal} size={"200px"}>
          <input
            className="login-form-input"
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button 
            disabled={!validateForm()} 
            className="submit-button" 
            onClick={addNewEntry}
          >Submit</button>
        </Modal>}

        <button onClick={() => setEntryModal(true)}>Add New Entry</button>

        </>
      }
      
    </div>
  </>
};


/****************************************************************/
/****************************************************************/
/****************************************************************/


function RankGameItem({item, loggedIn, user_id}) {
  // This is where you add the + and - on each list item
  // Needs to have + and - buttons be conditional on whether you're logged in

  if (item.name==='batman')console.log('INITIAL SCORE', item.name, item.score)

  const [userScore, setUserScore] = useState('...')
  const [overallScore, setOverallScore] = useState(item.score)
  const [color, setColor] = useState(""); // marks deleted items as red (only admin can see this)

  const {rank_movie_id} = item;

  useEffect(() => {
    // get the score that the user gave this
    axios.get(`/api/rank/${user_id}?rank_movie_id=${rank_movie_id}`)
      .then(res => {
        setUserScore(res.data.score)
      })
      .catch(err => console.log('err',err))
  }, [])

  function vote(operator) {
    console.log('vote cast', userScore, overallScore, operator)
    if (userScore >= 3 && operator==='+') return;
    if (userScore <= -3 && operator==='-') return;
    // Set notification that user can only cast between -3 and 3 points
    // Make vote appear in browser
    operator==='+'
      ? [setUserScore(userScore+1), setOverallScore(overallScore+1)]
      : [setUserScore(userScore-1), setOverallScore(overallScore-1)]
    // Save vote in database
    axios.post(`/api/rank/${user_id}?rank_movie_id=${rank_movie_id}`, {operator})
      .then(res => {})
      .catch(err => console.log('err',err))
    // Would be cool if this got debounced so a few seconds after you're done 
    // toying with the numbers, it calls a function that bubbles up to above component
    // that performs a sort operation on the current array
  };

  function deleteItem() {
    axios.delete(`/api/rank/admin/movie?rank_movie_id=${rank_movie_id}`)
      .then(res => {
        setColor("red")
      })
      .catch(err => console.log('err',err))
  };

  // Make deleteItem an admin-only action
  return <div>
    <div style={{color: color}}>{item.name} : User: {userScore}, Overall: {overallScore}</div>
    <button onClick={() => vote('+')}>++++++</button>
    <button onClick={() => vote('-')}>------</button>
    <button onClick={() => deleteItem()}>DELETE</button>
  </div>
};