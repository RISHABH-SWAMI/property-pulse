const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

const fetchProperties = async () => {
    try {
        // Handle the case where the domain is not available yet
        if (!apiDomain) {
            return []
        }
        const res = await fetch(`${apiDomain}/properties`);
        if (!res.ok) {
            throw new Error('Failed to get properties')
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

const fetchProperty = async (id) => {
    try {
        // Handle the case where the domain is not available yet
        if (!apiDomain) {
            return null;
        }
        const res = await fetch(`${apiDomain}/properties/${id}`);
        if (!res.ok) {
            throw new Error('Failed to get property details')
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export { fetchProperties, fetchProperty }