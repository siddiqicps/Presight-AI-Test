import React from 'react';
import HobbiesList from './hobbies';

function UserCard({user}){
    console.log(user)
    return (
        <section className="mb-2 border bg-neutral-100 p-4 rounded-lg max-w-full bg-neutral-100">
            <div className="mx-auto">
                <div className="card md:flex max-w-lg">
                    <div className="w-20 h-20 mx-auto mb-6 md:mr-6 flex-shrink-0">
                        <img className="object-cover rounded-full" src={user.avatar}/>
                    </div>
                    <div className="flex-grow text-center md:text-left">
                        <h3 className="text-xl heading">{user.firstName} {user.lastName}</h3>
                        <p className="mt-2 mb-3">
                            <span className="px-3 py-1.5 text-sm">{user.nationality}</span>
                            <span className="px-3 py-1.5 text-sm">{user.age}</span>
                        </p>
                        <HobbiesList hobbies={user.hobbies}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserCard