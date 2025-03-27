import React, {useState} from 'react';
import {ChatEngine, getOrCreateChat} from 'react-chat-engine'

const DirectMessaging = () => {
    // The useState hook initially sets the username to an empty string
    const[username, setUsername] = useState('')
    //Custom function that will implement the getOrCreateChat function that to select username to chat with
    //only when the correct credentials(user  secret, project id, username) are passed will the application be rendered
    function implementingDirectChat(credentials){
        getOrCreateChat(
            credentials,
            // function will only work if the app is a Direct Messaging one, hence setting 'is_direct_chat' to true and consequentially setting a list of usernames to search from.
            {is_direct_chat: true, usernames:[username]},
            () => setUsername('')
        )
    }

    const displayChatInterface = (credentials) => {
        return (
            <div style={{flex: 4}}>
                <input
                    type="text"
                    placeholder='Find username'
                    value={username} //prop from the useState hook
                    // A controlled function that sets the username to what the user types in the input field
                    onChange = {(e) => setUsername(e.target.value)}
                />

                {/* clicking button will call the implementingDirectChat function that displays a list of usernames to create or find an existing chat.  */}
                <button onClick={() => implementingDirectChat(credentials)}>
                    Create Chat
                </button>

            </div>
        )
    }

    return(
        <div style={{flex :4}}>
        <ChatEngine
            height='100vh'
            width='100%'
            style={{flex : 4}}
            userName='dhanush'
            // Accessing the stored environment variables in .env file
            userSecret='4a8e4137-b6b3-4fca-8a87-71d433dfa3f5'
            projectID='e3b33e0a-af4d-44d1-8a8f-facdc7d159ff'
            displayNewChatInterface={(credentials) => displayChatInterface(credentials)}
            />
            </div>

    )
}

export default DirectMessaging