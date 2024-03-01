import { LinearProgress, LinearProgressProps, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
  const { value } = props;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};
