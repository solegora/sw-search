import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TabsBasic from '../Tabs/Tabs';

export default function DialogModal({ open, onClose, film }) {
    if (!film) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{film.title}</DialogTitle>
            <DialogContent>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    Episode ID: {film.episode_id}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Release Date: {film.release_date}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Synopsis: {film.opening_crawl}
                </Typography>

                <TabsBasic films={film} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained" color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
