import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Flex, Link } from '@chakra-ui/layout';

const Header = () => {
    return (
        <Flex 
            widht="100%" 
            padding="32px"
            alignItems="center"
            justifyContent="center"
            backgroundColor="gray.300"
        >
            <Link 
                fontSize="32px"
                marginRight="32px"
                as={RouterLink} 
                to="/" 
            >
                Turmas
            </Link>
            <Link 
                fontSize="32px"
                as={RouterLink} 
                to="/students" 
            >
                Alunos
            </Link>
        </Flex>
    )
}

export default Header;