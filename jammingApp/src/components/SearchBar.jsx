import React, {useState} from "react";
import styles from '../style/SearchBar.module.css';

const SearchBar = ({onSearch}) => {
    const [userInput, setUserInput] = useState('');
    const handleOnChange = (event) => {
        setUserInput(event.target.value);
    } 

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(userInput, true);
    }
    return (
        
        <form onSubmit={handleSubmit}>
            <div className={styles.searchBar}>
                <input className={styles.input} 
                    type="text" 
                    value={userInput} 
                    onChange={handleOnChange} 
                    placeholder="search for a track"/>
                <button className={styles.button} type="submit">Search</button>
            </div>
        </form>      
    )
}

export default SearchBar;