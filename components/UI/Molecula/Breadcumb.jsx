import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


const Breadcumb = (props) => {

    const {router} = props

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
          Home
        </Link>,
        <Link
          underline="hover"
          key="2"
          color="inherit"
          href="/material-ui/getting-started/installation/"
          onClick={handleClick}
        >
          Country
        </Link>,
        <Typography key="3" color="text.primary">
          Edition
        </Typography>,
      ];

      return (
        <Stack spacing={2}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
                Home
            </Link>
            { router.query.country ?
                <Link
                underline="hover"
                key="2"
                color="inherit"
                href={router.query.edicion ? `/${router.query.lang}/${router.query.country}` : null }
              >
                {router.query.country}
              </Link>
            : null
            }
            { router.query.edicion && router.query.edicion[0] ?
                <Link
                underline="hover"
                key="2"
                color="inherit"
                href={router.query.edicion[1] ? `/${router.query.lang}/${router.query.country}/${router.query.edicion[0]}` : null }
              >
                {router.query.edicion[0]}
              </Link>
            : null
            }

          </Breadcrumbs>
        </Stack>
      );
    

}

export default Breadcumb