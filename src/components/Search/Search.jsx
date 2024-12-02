import { useSelector } from 'react-redux';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { ButtonGroup, Button } from '@mui/material';
import { FILMS_FEATURE_KEY } from '../../services/slices/films/films.slice';

export default function SearchInput({ onSearch, onSelect }) {
    const filmsState = useSelector((state) => state[FILMS_FEATURE_KEY]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
        onSearch(query); // Call parent handler to filter results
    };

    const handleSelect = (selectedTitle) => {
        onSelect(selectedTitle); // Notify the parent about the selected title

        // Add the clicked title to the history, ensuring no duplicates
        if (!searchHistory.includes(selectedTitle)) {
            setSearchHistory((prev) => {
                const updatedHistory = [selectedTitle, ...prev];
                return updatedHistory.slice(0, 5); // Limit to 5 items
            });
        }
    };

    return (
        <Stack spacing={2} sx={{ width: 300 }} style={{ background: "#fff", position: 'relative', top: 50 }}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                value={searchQuery}
                onInputChange={(_, value) => handleSearch(value)} // Update search query on input
                options={filmsState.data?.map((option) => option.title) || []}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search"
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                type: 'search',
                            },
                        }}
                    />
                )}
                onChange={(_, value) => handleSelect(value)} // Trigger on option click
            />
            {/* Display Search History */}
            <ButtonGroup
            >
                {searchHistory.map((historyItem, index) => (
                    <Button onClick={() => handleSearch(historyItem)} key={index}>{historyItem}</Button>
                ))}
            </ButtonGroup>
        </Stack>
    );
}
