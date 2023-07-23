import {useEffect, useState} from "react";

export function useAsyncData<ResponseDataT>(dataFunction: () => Promise<Response>) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<null | Error>(null);
    const [data, setData] = useState<ResponseDataT | null>(null);

    const fetchData = async (newDataFunction?: ()=>Promise<Response>) => {
        setIsLoading(true);
        setError(null);
        setData(null);
        
        const currentDataFunction = newDataFunction ? newDataFunction : dataFunction;
        
        const response = await currentDataFunction();

        if (response.ok) {
            setIsLoading(false);
            const data = await response.json();
            setData(data.value);
        } else {
            setError(new Error(response.statusText));
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return {
        fetchData,
        isLoading,
        error,
        data
    }
}
