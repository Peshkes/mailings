import React from 'react';

type Props = {
    color: string

}
const Cross = ({color}:Props) => {
    return (
        <div>
            <svg
                id="Capa_1"
                enable-background="new 0 0 510.007 510.007"
                height="15"
                width="15"
                viewBox="0 0 510.007 510.007"
                xmlns="http://www.w3.org/2000/svg"
                stroke={color}
                fill={color}>
                <path
                    d="m510.006 76.851-76.849-76.851-178.153 178.152-178.152-178.152-76.852 76.851 178.152 178.153-178.152 178.152 76.851 76.851 178.152-178.152 178.153 178.152 76.85-76.851-178.152-178.153zm-42.425 356.305-34.424 34.424-178.153-178.152-178.152 178.152-34.424-34.424 178.152-178.153-178.153-178.152 34.424-34.424 178.152 178.152 178.154-178.152 34.424 34.424-178.153 178.152z"/>
            </svg>
        </div>
    );
};

export default Cross;