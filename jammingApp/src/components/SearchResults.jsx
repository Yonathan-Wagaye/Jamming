import React from "react";
import Track from "./Track";
import styles from '../style/SearchResults.module.css'

const SearchResults = ({ tracks, searched, addTrack }) => {
    let errorMessage = searched ? <p>No results found!</p> : '';
    console.log(tracks);
  
    const trackList = (
      <ul className={styles.trackList}>
        {tracks.map((track) => (
          <li key={track.id} className={styles.trackItem}>
            <Track track={track} onAdd={addTrack}/>
          </li>
        ))}
      </ul>
    );
  
    return (
      <div className={styles.results}>
        <h2>Results</h2>
        {tracks.length > 0 ? trackList : errorMessage}
      </div>
    );
  };
  
  export default SearchResults;