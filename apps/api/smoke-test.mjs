async function runSmokeTest() {
  const healthResponse = await fetch('http://localhost:3001/api/health')
  const healthData = await healthResponse.json()

  /*const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: 'admin', password: 'admin123' }),
  })
  const loginData = await loginResponse.json()

  const summaryResponse = await fetch('http://localhost:3001/api/admin/summary', {
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  })
  const summaryData = await summaryResponse.json()
  console.log('Login:', loginData)
  console.log('Admin summary:', summaryData)
*/
  console.log('Health:', healthData)

}

runSmokeTest().catch((error) => {
  console.error('Smoke test failed:', error)
  process.exitCode = 1
})

