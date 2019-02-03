export async function handleSteemconnectError(handler: any) {
    try {
        return await handler();
    } catch (error) {

        console.log(error);

        if (error.error_description) {

            const description = error.error_description.split('\n')[0].split(': ')[1];

            if (description.length > 0) {
                throw new Error(description);
            } else {
                throw new Error("Unexpected Steemconnect error");
            }

        } else {
            throw new Error(error.message);
        }
    }
}

