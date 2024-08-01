import React, { useState } from "react";
import styles from '../style/Playlist.module.css';
import PlaylistTrack from "./PlaylistTrack";

const Playlist = ({playlist, removeTrack, onSubmit}) => {
    const [userInput, setUserInput] = useState('');

    const handleOnChange = (event) => {
        setUserInput(event.target.value);
    }
    const trackList = (
        <ul className={styles.trackList}>
          {playlist.map((track) => (
            <li key={track.id} className={styles.trackItem}>
              <PlaylistTrack track={track} onRemove={removeTrack}/>
            </li>
          ))}
        </ul>
      );
    const handleClick = (event) => {
        event.preventDefault();
        onSubmit(userInput);
    } 
    return (
        <div className={styles.playlist}>
            <div className={styles.inputContainer}>
                <input className={styles.inputName} 
                    type="text" 
                    value={userInput} 
                    onChange={handleOnChange} 
                    placeholder="name of your playlist"/>
            </div>
            {playlist.length > 0 ? trackList: '' }
            <div className={styles.footer}> 
                <button className={styles.button} onClick={handleClick}>Save to Spotify</button>
            </div>
        </div>
    )
}

export default Playlist;