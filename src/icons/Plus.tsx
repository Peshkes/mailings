import React from 'react';

type Props = {
    color: string
    onClickFunction: () => void
}

const Plus = ({color, onClickFunction}: Props) => {
    return (
        <div onClick={onClickFunction}>
            <svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="20"
                 height="20"
                 viewBox="0 0 512 512"
                 fill={color}>
                <path
                    d="M256,0C114.84,0,0,114.842,0,256s114.84,256,256,256s256-114.842,256-256S397.16,0,256,0z M256,462.452 c-113.837,0-206.452-92.614-206.452-206.452S142.163,49.548,256,49.548S462.452,142.163,462.452,256S369.837,462.452,256,462.452z " />
                <polygon
                    points="280.774,231.226 280.774,140.387 231.226,140.387 231.226,231.226 140.387,231.226 140.387,280.774 231.226,280.774 231.226,371.613 280.774,371.613 280.774,280.774 371.613,280.774 371.613,231.226 "/>
            </svg>
        </div>
    );
};

export default Plus;