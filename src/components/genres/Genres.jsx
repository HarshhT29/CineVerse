import React from 'react';
import { useSelector } from 'react-redux';

const Genres = ({ data,className }) => {
    const { genres } = useSelector(state => state.home);
    return (
        <div className={`genres ${className} flex gap-[5px]`}>
            {data?.map((g) => {
                if (!genres[g]?.name) return;
                return (
                    <div key={g} className="genre bg-[var(--pink)] px-[5px] py-[3px] text-[12px]
                    text-white whitespace-nowrap">
                        {genres[g]?.name}
                    </div>
                )
            })}
        </div>
    )
}

export default Genres;