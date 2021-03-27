import { React, useCallback, useEffect, useState } from 'react';
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

const Students = () => {
    const [loading, setLoading] = useState(true);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [students, setStudents] = useState([]);
    const [deleteStudentId, setDeleteStudentId] = useState(null);

    const loadStudents = useCallback(async () => {
        try {
            const response = await api.get('/students');

            if (response.data) {
                setStudents(response.data);
            }
        } catch {
            console.log('erro');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadStudents();
    }, [loadStudents]);

    const toggleDeleteModal = useCallback(() => {
        setOpenDeleteModal(!openDeleteModal);
    }, [openDeleteModal])

    const handleSetDeleteStudentId = useCallback((id) => {
        setDeleteStudentId(id);
        toggleDeleteModal();
    }, [toggleDeleteModal]);

    const handleDelete = useCallback(async () => {
        await api.delete(`/students/${deleteStudentId}`);

        toggleDeleteModal();
        loadStudents();
    }, [deleteStudentId, loadStudents, toggleDeleteModal])

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
                        <Heading>Alunos</Heading>
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
                        to={{ pathname: '/students/new', state: { id: null } }}
                    >
                        Criar aluno
                    </Link>
                </Flex>
                {!loading && (
                    <>
                        {students.map(student => (
                            <Flex
                                key={student._id}
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
                                    <strong>{student.name}</strong>
                                    <strong>{student.class.name}</strong>
                                </Flex>
                                <Flex alignItems="center">
                                    <Link 
                                        backgroundColor="blue.500"
                                        color="white"
                                        marginRight="32px"
                                        padding="10px 12px"
                                        borderRadius="8px"
                                        fontWeight="bold"
                                        _hover={{ backgroundColor: "blue.400" }}
                                        as={RouterLink} 
                                        to={{ pathname: '/students/edit', state: { id: student._id } }}
                                    >
                                        Editar
                                    </Link>
                                    <Button  
                                        backgroundColor="red.500"
                                        color="white"
                                        marginLeft="32px"
                                        _hover={{ backgroundColor: "red.400" }}
                                        onClick={() => handleSetDeleteStudentId(student._id)}
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
                        Deletar Aluno
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

export default Students;