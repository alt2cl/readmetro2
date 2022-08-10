
import styled from '@emotion/styled';


const SectionWrapper = styled('div')(({ theme }) => ({

    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
}));

const SectionBox = ({children}) => {
    return ( 
        <>
            <SectionWrapper>
                {children}
            </SectionWrapper>
        </>
     );
}
 
export default SectionBox;