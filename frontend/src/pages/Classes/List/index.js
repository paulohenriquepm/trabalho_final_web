import { React, useEffect, useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Flex, Heading, Link } from '@chakra-ui/layout';
import { 
    Button,   
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react"

import Header from '../../../components/Header';

import api from '../../../services/api';

const Classes = () => {
    const [loading, setLoading] = useState(true);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [classes, setClasses] = useState([]);
    const [deleteClassId, setDeleteClassId] = useState(null);

    const loadClasses = useCallback(async () => {
        try {
            const response = await api.get('/classes');

            if (response.data) {
                setClasses(response.data);
            }
        } catch {
            console.log('erro');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadClasses();
    }, [loadClasses]);

    const toggleDeleteModal = useCallback(() => {
        setOpenDeleteModal(!openDeleteModal);
    }, [openDeleteModal])

    const handleSetDeleteClassId = useCallback((id) => {
        setDeleteClassId(id);
        toggleDeleteModal();
    }, [toggleDeleteModal]);

    const handleDelete = useCallback(async () => {
        await api.delete(`/classes/${deleteClassId}`);

        toggleDeleteModal();
        loadClasses();
    }, [deleteClassId, loadClasses, toggleDeleteModal])

    return (
        <Box
            height="100vh"
        >
            <Header />
            <Flex
                padding="64px"
                height="100vh"
                flexDirection="column"
            >
                <Flex 
                    width="100%"
                    height="64px"
                    marginBottom="64px"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <div>
                        <Heading>Turmas</Heading>
                    </div>
                    <Link 
                        backgroundColor="blue.500"
                        color="white"
                        marginRight="32px"
                        padding="10px 12px"
                        borderRadius="8px"
                        fontWeight="bold"
                        _hover={{ backgroundColor: "blue.400" }}
                        as={RouterLink} 
                        to={{ pathname: '/classes/new', state: { id: null } }}
                    >
                        Criar turma
                    </Link>
                </Flex>
                {!loading && (
                    <>
                        {classes.map(classItem => (
                            <Flex
                                key={classItem._id}
                                alignItems="center"
                                justifyContent="space-between"
                                marginBottom="32px"
                                padding="16px"
                                border="1px"
                                borderColor="gray.300"
                                borderRadius="4px"
                            >
                                <Flex 
                                    width="50%"
                                    justifyContent="space-between" 
                                >
                                    <strong>{classItem.name}</strong>
                                    <strong>{classItem.course}</strong>
                                </Flex>
                                <Flex alignItems="center" >
                                    <Link 
                                        backgroundColor="blue.500"
                                        color="white"
                                        marginRight="32px"
                                        padding="10px 12px"
                                        borderRadius="8px"
                                        fontWeight="bold"
                                        _hover={{ backgroundColor: "blue.400" }}
                                        as={RouterLink} 
                                        to={{ pathname: '/classes/edit', state: { id: classItem._id } }}
                                    >
                                        Editar
                                    </Link>
                                    <Button  
                                        backgroundColor="red.500"
                                        color="white"
                                        _hover={{ backgroundColor: "red.400" }}
                                        onClick={() => handleSetDeleteClassId(classItem._id)}
                                    >
                                        Excluir
                                    </Button>
                                </Flex>
                            </Flex>
                        ))}
                    </>
                )}
            </Flex>
            <AlertDialog
                isOpen={openDeleteModal}
                onClose={toggleDeleteModal}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Deletar Turma
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Tem certeza que deseja deletar?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button onClick={toggleDeleteModal}>
                        Cancelar
                    </Button>
                    <Button colorScheme="red" onClick={handleDelete} ml={3}>
                        Deletar
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    )
}

export default Classes;