import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import styles from './style.module.css'
import { FounderTestimonial } from '../../entities/founders'

const FounderCard: React.FC<FounderTestimonial> = ({
    pictureSrc,
    name,
    text,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '40px',
            }}
        >
            <img src={pictureSrc} className={styles.image}></img>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="white">
                    {text}
                </Typography>
            </CardContent>
        </Box>
    )
}
export default FounderCard
