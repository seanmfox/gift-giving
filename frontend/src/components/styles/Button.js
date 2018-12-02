import styled, { css } from 'styled-components';

const Button = styled.button`
	border-radius: 5px;
	border: none;
	padding: 0.5rem;
	${props =>
		props.signup &&
		css`
			color: red;
			background: darkgreen;
		`}
`;

export default Button;
