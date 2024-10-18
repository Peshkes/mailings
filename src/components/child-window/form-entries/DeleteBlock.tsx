import React, {useState} from 'react';

type Props = {
    onDelete: () => void;
};

const DeleteBlock = ({onDelete}: Props) => {
    const [wantToDelete, setWantToDelete] = useState(false);
    return(
        <div className="mt-6 flex items-center justify-center">
            <input
                id="delete_check"
                type="checkbox"
                className="h-5 w-5 text-cyan-600 focus:ring-cyan-500 border-cyan-800 rounded mr-2"
                onChange={(e) => setWantToDelete(e.target.checked)}/>
            <label htmlFor="delete_check" className="text-cyan-800 font-semibold mr-4">Хочу удалить</label>
            <button
                type="button"
                onClick={onDelete}
                disabled={!wantToDelete}
                className={`bg-red-600 text-white py-2 px-4 rounded-md border border-red-600 
                hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 
                ${!wantToDelete ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Удалить
            </button>
        </div>
    );
}

export default DeleteBlock;