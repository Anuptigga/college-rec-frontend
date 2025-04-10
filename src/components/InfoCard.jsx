import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    max-width: 300px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 8px;
    color: #333;
`;

const Description = styled.p`
    font-size: 1rem;
    color: #666;
`;

const InfoCard = () => {
    return (
        <Card>
            <Title>Card Title</Title>
            <Description>
                This is a description for the InfoCard component. It provides some static information.
            </Description>
        </Card>
    );
};

export default InfoCard;