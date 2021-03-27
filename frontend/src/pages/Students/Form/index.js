import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Formik } from 'formik';

import { Flex, Box, Heading } from '@chakra-ui/layout';

import {
    FormControl,
    FormLabel,
    Button,
    Input,
    Select,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
  } from "@chakra-ui/react"

import Header from '../../../components/Header';

import api from '../../../services/api';
import history from '../../../services/history';

const Form = () => {
    const { state } = useLocation();

    const id = state?.id || null;

    const [studentLoading, setStudentLoading] = useState(true);
    const [classesLoading, setClassesLoading] = useState(true);
    const [openBackModal, setOpenBackModal] = useState(false);

    const [student, setStudent] = useState({});
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        async function loadStudent() {
            if (id) {
                const response = await api.get(`/students/${id}`);

                if (response.data) {
                    setStudent(response.data);
                }
            }

            setStudentLoading(false);
        }

        loadStudent();
    }, [id]);

    useEffect(() => {
        async function loadClasses() {
            const response = await api.get(`/classes`);

            if (response.data) {
                setClasses(response.data);
            }

            setClassesLoading(false);
        }

        loadClasses();
    }, []);

    const toggleBackModal = useCallback(() => {
        setOpenBackModal(!openBackModal);
    }, [openBackModal])

    const handleBack = useCallback(() => {
        history.push('/students');
    }, [])

    return (
        <Box height="100vh">
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
                    justifyContent="space-between"
                >
                    <div>
                        <Heading>{id ? 'Atualizando' : 'Inserindo'} Aluno</Heading>
                    </div>
                    <Flex
                        alignItems="center"
                    >
                        <Button 
                            backgroundColor="red.500"
                            color="white"
                            marginRight="32px"
                            _hover={{ backgroundColor: "red.400" }}
                            onClick={toggleBackModal}
                        >
                            Voltar
                        </Button>
                        <Button 
                            backgroundColor="green.500"
                            color="white"
                            _hover={{ backgroundColor: "green.400" }}
                            type="submit"
                            form="form"
                        >
                            Salvar
                        </Button>
                    </Flex>
                </Flex>
                {
                    !studentLoading && 
                    !classesLoading && (
                    <Formik
                        initialValues={student}
                        enableReinitialize={true}
                        onSubmit={async values => {
                            if (id) {
                                await api.put(`/students/${id}`, {
                                    name: values.name,
                                    class: values.class
                                });
                            } else {
                                await api.post('/students', {
                                    name: values.name,
                                    class: values.class
                                });
                            }

                            history.push('/students');
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                            <form id="form" onSubmit={handleSubmit}>
                                <FormControl id="name" isRequired marginBottom="32px">
                                    <FormLabel>Nome</FormLabel>
                                    <Input 
                                        name="name"
                                        value={values.name}
                                        placeholder="Nome" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.name && touched.name && errors.name}
                                </FormControl>
                                <FormControl id="class" isRequired>
                                    <FormLabel>Turma</FormLabel>
                                    <Select 
                                        name="class"
                                        value={values.class}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Selecione uma turma"
                                    >
                                        {classes.map(classOption => (
                                            <option 
                                                key={classOption._id}
                                                value={classOption._id}
                                            >
                                                {classOption.name}
                                            </option>
                                        ))}
                                    </Select>
                                    {errors.name && touched.name && errors.name}
                                </FormControl>
                            </form>
                        )}
                    </Formik>
                )}
            </Flex>
            <AlertDialog
                isOpen={openBackModal}
                onClose={toggleBackModal}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Voltar
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Tem certeza que deseja voltar?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button onClick={toggleBackModal}>
                        Cancelar
                    </Button>
                    <Button colorScheme="red" onClick={handleBack} ml={3}>
                        Voltar
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    )
}

export default Form;