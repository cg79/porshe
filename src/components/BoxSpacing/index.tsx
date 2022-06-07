import { Box } from '@mui/material'

type BoxSpacingProps = {
    height?: number
}

const BoxSpacing: React.FC<BoxSpacingProps> = ({ height = 50 }) => {
    return (
        <Box
            sx={{
                height: height,
            }}
        />
    )
}

export default BoxSpacing
