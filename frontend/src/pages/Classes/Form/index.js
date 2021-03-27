import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Formik } from 'formik';

import { Flex, Box, Heading } from '@chakra-ui/layout';

import {
    FormControl,
    FormLabel,
    Button,
    Input,
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

    const [loading, setLoading] = useState(true);
    const [openBackModal, setOpenBackModal] = useState(false);

    const [classObject, setClassObject] = useState({});

    useEffect(() => {
        async function loadClass() {
            if (id) {
                const response = await api.get(`/classes/${id}`);

                if (response.data) {
                    setClassObject(response.data);
                }
            }
            
            setLoading(false);
        }

        loadClass();
    }, [id]);

    const toggleBackModal = useCallback(() => {
        setOpenBackModal(!openBackModal);
    }, [openBackModal])

    const handleBack = useCallback(() => {
        history.push('/');
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
                        <Heading>{id ? 'Atualizando' : 'Inserindo'} Turma</Heading>
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
                    !loading && (
                    <Formik
                        initialValues={classObject}
                        enableReinitialize={true}
                        onSubmit={async values => {
                            if (id) {
                                await api.put(`/classes/${id}`, {
                                    name: values.name,
                                    course: values.course
                                }); 
                            } else {
                                await api.post('/classes', {
                                    name: values.name,
                                    course: values.course
                                });
                            }

                            history.push('/');
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
                                <FormControl id="course" isRequired marginBottom="32px">
                                    <FormLabel>Curso</FormLabel>
                                    <Input 
                                        name="course"
                                        value={values.course}
                                        placeholder="Curso" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.course && touched.course && errors.course}
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