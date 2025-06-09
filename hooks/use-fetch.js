const { useState } = require("react");
const { toast } = require("sonner");

const useFetch = (cb) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fn = async (...args) => { 
        setLoading(true);
        setError(null);

        try {
            const response = await cb(...args);
            setData(response);
            setError(null);
            toast.success("Operation successful"); 
        } catch (error) {
            setError(error);
            toast.error(error.message || "An error occurred");
            
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, fn, setData }
}

export default useFetch;