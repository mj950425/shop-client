import {SectionProps} from "../../types/api/customer/SectionProps";
import {Box, Button, CircularProgress, Typography} from "@mui/material";

export const Section: React.FC<SectionProps> = ({ title, loading, buttonText, onClick, children }) => (
    <Box mt={4} mb={4}>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        <Button
            variant="contained"
            color="primary"
            onClick={onClick}
            disabled={loading}
            style={{ marginBottom: 20 }}
        >
            {loading ? <CircularProgress size={24} /> : buttonText}
        </Button>
        {children}
    </Box>
);