import React from 'react';

interface Props {
    link: {
        id: string;
        description: string;
        url: string;
    };
}

export const Link = (props: Props): JSX.Element => {
    const { link } = props;

    return (
        <div>
            <div>
                {link.description} ({link.url})
            </div>
        </div>
    );
};
