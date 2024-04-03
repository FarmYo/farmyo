import React, { useState, useEffect, useRef, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function ChatLogs(chat, partnerInfo) {
    
    const myId = jwtDecode(localStorage.getItem('access')).userId; 

    return (
        <div className={`flex ${Number(chat?.chat.userId) !== Number(myId) ? "justify-start" : "justify-end"} m-2 `}>
            {chat.chat.userId === myId ?
            (
                <p className="bg-green-100 text-sm rounded-lg px-3 py-2">{`${chat.chat.content}`}</p>
            ) : (
            <>
                <div className="flex items-center max-w-full">
                    <img src={chat.partnerInfo.userProfile} alt="" className="w-10 h-10" />
                    <div className="max-w-full ml-2">
                        <p className="bg-gray-200 text-sm rounded-lg px-3 py-2 max-w-full break-words">{`${chat.chat.content}`}</p>
                    </div>
                </div>
            </>
                
            )}
        </div>
    ); 
}