import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography, Box } from '@mui/material';
import { Grid } from '@mui/joy';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/joy/Skeleton';
import AspectRatio from '@mui/joy/AspectRatio';


export default function TabsBasic({ films }) {
    const [activeTab, setActiveTab] = useState(0);
    const [data, setData] = useState({
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: []
    });

    const tabKeys = ["characters", "planets", "starships", "vehicles", "species"];

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    useEffect(() => {
        // Fetch data for the active tab when it changes
        const fetchData = async (key) => {
            try {
                const urls = films[key]; // Get the list of URLs for the active tab
                const responses = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
                setData((prevData) => ({
                    ...prevData,
                    [key]: responses // Store the fetched data for this tab
                }));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (films[tabKeys[activeTab]]) {
            fetchData(tabKeys[activeTab]);
        }
    }, [activeTab, films]);

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            {/* Tabs */}
            <Tabs value={activeTab} onChange={handleChange} aria-label="Film Data Tabs">
                {tabKeys.map((key, index) => (
                    <Tab key={index} label={key.charAt(0).toUpperCase() + key.slice(1)} />
                ))}
            </Tabs>

            {/* Tab Panels */}
            {tabKeys.map((key, index) => (
                <Box
                    key={index}
                    role="tabpanel"
                    hidden={activeTab !== index}
                    id={`tabpanel-${index}`}
                    aria-labelledby={`tab-${index}`}
                    sx={{ p: 3 }}
                >
                    {activeTab === index && (
                        <Grid container spacing={3} sx={{ padding: 3 }}>
                            {data[key]?.length > 0 ? (
                                data[key].map((item, idx) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                                        <Card sx={{ maxWidth: 345, position: 'relative' }}>

                                            <CardHeader
                                                title={item.name}
                                                subheader={item.population}
                                            />
                                            <CardContent>
                                                <Typography variant="body2">
                                                    {item.terrain || item.skin_color}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Box sx={{ m: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Skeleton variant="circular" width={48} height={48} />
                                    <div>
                                        <Skeleton variant="rectangular" width={200} height="1em" sx={{ mb: 1 }} />
                                        <Skeleton variant="rectangular" width={140} height="1em" />
                                    </div>
                                </Box>
                            )}
                        </Grid>
                    )}
                </Box>
            ))}
        </Box>
    );
}
