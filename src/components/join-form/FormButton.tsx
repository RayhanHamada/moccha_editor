import styled from 'styled-components';

const FormButton = styled.button`
  background: #454545;
`;

FormButton.defaultProps = {
  className:
    'join-button w-64 mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full',
};

export default FormButton;
