import React from 'react';

type Props = {
    color: string
}

const Plus = ({color}: Props) => {
    return (
        <div>
            <svg
                id="Capa_1"
                width="20"
                height="20"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                fill={color}>
                <g id="XMLID_306_">
                    <path id="XMLID_534_" d="m49.593 206.108 177.597 79.419 79.419 177.597 205.391-462.408zm73.746.091 291.371-129.42-179.464 179.463zm183.177 183.178-50.043-111.907 179.464-179.463z"/>
                    <path id="XMLID_570_" d="m74.429 415.587 85.558-85.558 21.224 21.224-85.558 85.558z"/>
                    <path id="XMLID_571_" d="m32.026 340.74 52.69-52.69 21.224 21.224-52.69 52.69z"/>
                    <path id="XMLID_572_" d="m-.058 490.014 35.935-35.935 21.225 21.225-35.935 35.935z"/>
                    <path id="XMLID_573_" d="m149.244 457.984 52.69-52.69 21.224 21.224-52.69 52.69z"/>
                </g>
            </svg>
        </div>
    );
};

export default Plus;