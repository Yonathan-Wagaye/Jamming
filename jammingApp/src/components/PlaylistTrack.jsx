import React from "react";
import styles from '../style/Track.module.css';

const PlaylistTrack = ({track, onRemove}) => {

    return (
        <div className={styles.trackItem}>
            <img src={track.album.images[0].url} alt={track.name} className={styles.trackImage} />
            <div className={styles.trackDetails}>
                <p>{track.name} by {track.artists.map(artist => artist.name).join(', ')}</p>
            </div>
            <div className={styles.addButton}>
                <button onClick={() => onRemove(track)}>-</button>
            </div>
        </div>
    )
};

export default PlaylistTrack;
