import './Header.css';
import React from "react";
import {
	IconButton,
	HStack,
	useColorMode,
	InputGroup,
	Input,
	InputLeftElement,
	VStack,
	Button
} from "@chakra-ui/react";
import { FaSun, FaMoon, FaSearch } from "react-icons/fa";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const videObjSchema = Yup.object().shape({
	id: Yup.number().required('Required'),
	title: Yup.string().min(3, 'Too short!').max(100, 'Too long!').required('Required'),
	url: Yup.string().max(100).url().required('Please enter valid URL'),
	rating: Yup.number().required('Required')
})

const Header = ({ setVideosArr, videosArr }) => {
	const { colorMode, toggleColorMode } = useColorMode();

	const idNumber = () => Number(Math.floor(Math.random() * 100000));
	const ratingNumber = () => Number(Math.floor(Math.random() * 10000));

	return (
		<VStack>
			<HStack p='1rem' w='100%' display='flex' justifyContent='space-between'>
				<InputGroup w='60vw'>
					<InputLeftElement pointerEvents='none' children={<FaSearch />} />
					<Input />
				</InputGroup>
				<IconButton icon={colorMode === 'light' ? <FaSun /> : <FaMoon />} alignSelf='flex-end' onClick={toggleColorMode} isRound='true' />
			</HStack>
			<Formik initialValues={{
				id: idNumber(),
				title: '',
				url: '',
				rating: ratingNumber()
			}} validationSchema={videObjSchema} onSubmit={values => setVideosArr([...videosArr, values])}>
				{({ errors, touched }) => (
					<Form className='form-validation' w={{ lg: '50vw', md: '60vw', sm: '70vw' }}>
						<Field name="title" className='form-field' />
						{errors.title && touched.title ? (
							<div>{errors.title}</div>
						) : null}
						<Field name="url" className='form-field' />
						{errors.url && touched.url ? <div>{errors.url}</div> : null}
						<Button type="submit">Submit</Button>
					</Form>
				)}
			</Formik>
		</VStack>
	)
}

export default Header;