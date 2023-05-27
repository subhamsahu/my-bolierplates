import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Loader() {
    return (
        <Stack spacing={1} marginTop={2}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" width={100} height={100} />
            <Skeleton variant="rectangular" width={"100%"} height={300} />
            <Stack direction={"row"} spacing={1}>
                <Skeleton variant="rounded" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
            </Stack>

        </Stack>
    );
}