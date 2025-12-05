import React from 'react';
import HobbiesList from './hobbies';

function MessageCard({message}){
    console.log(message)
    return (
        <section className="mb-2 border bg-neutral-100 p-4 rounded-lg max-w-full bg-neutral-100">
            <div className="mx-auto">
                <div className="card md:flex max-w-lg">
                    <div className="flex-grow text-center md:text-left">
                        <p className="mt-2 mb-3">
                            {message}
                            <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
                            </svg>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MessageCard