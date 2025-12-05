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
                            {message.msg}
                            {message.isProcessing && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MessageCard