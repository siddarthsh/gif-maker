import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';

interface CustomLinkProps {
    href: string;
    className?: string;
    children: React.ReactNode;
}

const Anchor = styled('a')`
    text-decoration: none !important;
`;

const CustomLink = ({ className, href, children }: CustomLinkProps) => (
    <Link href={href} passHref>
        <Anchor className={className || ''}>{children}</Anchor>
    </Link>
);

export default CustomLink;
