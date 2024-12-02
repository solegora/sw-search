import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { FILMS, FILMS_FEATURE_KEY } from '../../services/slices/films/films.slice';
import SearchInput from '../Search/Search';
import DialogModal from '../Modal/modal';
import { imageMap } from '../Helper/ImageHelper';

export default function CardExpandable() {
    const dispatch = useDispatch();
    const filmsState = useSelector((state) => state[FILMS_FEATURE_KEY]);
    const [filteredFilms, setFilteredFilms] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);

    useEffect(() => {
        dispatch(FILMS());
    }, [dispatch]);

    useEffect(() => {
        if (filmsState.data) {
            setFilteredFilms(filmsState.data);
        }
    }, [filmsState]);

    const handleSearch = (query) => {
        const lowerQuery = query.toLowerCase();
        const filtered = filmsState.data.filter((film) =>
            film.title.toLowerCase().includes(lowerQuery)
        );
        setFilteredFilms(filtered);
    };

    const handleSelect = (selectedTitle) => {
        const selectedFilm = filmsState.data.find((film) => film.title === selectedTitle);
        if (selectedFilm) {
            setFilteredFilms([selectedFilm]); // Show only the selected film
        }
    };

    const handleOpenModal = (film) => {
        setSelectedFilm(film);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedFilm(null);
        setModalOpen(false);
    };


    return (
        <>
            {/* Search Bar */}
            <SearchInput onSearch={handleSearch} onSelect={handleSelect} />

            {/* Films Grid */}
            <Grid container spacing={3} sx={{ padding: 3 }}>
                {filteredFilms.map((films) => {
                    const normalizedTitle = films.title.toLowerCase().replace(/\s+/g, "");
                    const imagePath = imageMap[normalizedTitle] || "olly";
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={films.episode_id}>
                            <Card sx={{ maxWidth: 345, position: 'relative', top: 100 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            {films.episode_id}
                                        </Avatar>
                                    }
                                    title={films.title}
                                    subheader={films.created}
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={imagePath}
                                    alt={films.title}
                                />
                                <CardContent>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Released {films.release_date}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <Button
                                        onClick={() => handleOpenModal(films)}
                                        aria-label="show more"
                                        variant="outlined"
                                    >
                                        See More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );

                })}

            </Grid>


            {/* Modal */}
            {selectedFilm && (
                <DialogModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    film={selectedFilm}
                />
            )}
        </>
    );
}
