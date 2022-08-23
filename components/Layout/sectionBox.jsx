
import styled from '@emotion/styled';


const SectionWrapper = styled('div')(({ theme }) => ({

    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(4),
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