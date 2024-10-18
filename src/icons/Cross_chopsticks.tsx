import React from 'react';

type Props = {
    color: string

}
const Cross_chopsticks = ({color}: Props) => {
    return (
        <div>
            <svg version="1.1"
                 id="Capa_1"
                 xmlns="http://www.w3.org/1999/xlink"
                 height="15"
                 width="15"
                 viewBox="0 0 512 512"
                 fill={color}>
		         <path d="M319.639,256l179.18-179.181C507.319,68.32,512,57.02,512,45c0-12.021-4.682-23.321-13.181-31.819
			C490.32,4.681,479.019,0,467,0c-12.019,0-23.32,4.681-31.819,13.181L256,192.361L76.82,13.181C68.32,4.682,57.02,0,45,0
			S21.679,4.681,13.18,13.181c-17.545,17.545-17.545,46.094,0,63.639L192.361,256L13.18,435.181C4.681,443.68,0,454.98,0,467
			c0,12.021,4.681,23.321,13.18,31.819C21.679,507.318,32.98,512,45,512s23.321-4.681,31.82-13.181L256,319.639l179.18,179.18
			C443.678,507.318,454.979,512,467,512s23.321-4.682,31.819-13.18C507.318,490.321,512,479.021,512,467
			c0-12.02-4.681-23.32-13.181-31.819L319.639,256z M34.393,55.606C31.56,52.773,30,49.007,30,45s1.56-7.773,4.393-10.606
			S40.993,30,45,30c4.006,0,7.773,1.561,10.606,4.394l179.181,179.181l-21.213,21.213L34.393,55.606z M55.607,477.606
			C52.773,480.439,49.007,482,45,482c-4.006,0-7.773-1.561-10.607-4.395C31.56,474.773,30,471.007,30,467
			c0-4.006,1.56-7.773,4.393-10.606l422-422C459.226,31.561,462.993,30,467,30c4.007,0,7.773,1.561,10.606,4.395
			C480.439,37.227,482,40.993,482,45c0,4.006-1.561,7.773-4.394,10.606L55.607,477.606z M477.605,477.606
			C474.773,480.439,471.007,482,467,482c-4.007,0-7.773-1.561-10.606-4.394l-179.181-179.18l21.213-21.213l179.181,179.181
			c2.832,2.833,4.393,6.6,4.393,10.606C482,471.007,480.439,474.773,477.605,477.606z"/>
            </svg>
        </div>
    );
};

export default Cross_chopsticks;