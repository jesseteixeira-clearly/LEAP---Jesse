export const useSubmitForm = () => {
  const submitForm = async (data: unknown, method: string, endpoint:string) => {
  
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json(); 
      return result;
    } catch (err) {
    
      throw err;
    }
  };

  return { submitForm };
};
