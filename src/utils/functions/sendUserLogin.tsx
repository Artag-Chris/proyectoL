 export async function sendUserDataToBackend(userData: any) {
    try {
      const response = await fetch('http://localhost:45623/api/usuarios/sociallogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      return await response.json()
    } catch (error) {
      console.error('Error sending user data to backend:', error)
      throw error
    }
  }