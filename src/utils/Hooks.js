import {useState, useEffect} from "react";

export const useLocalStorage = (storageKey, initialState) => {
    const [value, setValue] = useState(JSON.parse(localStorage.getItem(storageKey)) ?? initialState);
    useEffect(() => localStorage.setItem(storageKey, JSON.stringify(value)), [value, storageKey]);
    return [value, setValue];
};